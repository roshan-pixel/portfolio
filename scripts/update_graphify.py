"""
Automated Graphify Knowledge Graph Synchronizer.
Runs on every git commit (via pre-commit hook) and in CI/CD (via GitHub Actions).
Rebuilds AST, updates community clusters, generates interactive HTMLs, callflows, trees,
and exports high-resolution visual cluster images (graph.png & graph.svg).
"""
import json
import os
import re
import shutil
import sys
from pathlib import Path

def main():
    root = Path(__file__).resolve().parent.parent
    os.chdir(root)
    print("[graphify-sync] Updating Graphify Knowledge Graph...")

    # 1. Run graphify update
    try:
        from graphify.watch import _rebuild_code
        _rebuild_code(root, force=True)
    except Exception as e:
        print(f"[graphify-sync] Rebuild code failed: {e}")

    # 2. Rebuild Tree HTML
    try:
        from graphify.tree_html import write_tree_html
        graph_path = root / "graphify-out" / "graph.json"
        tree_out = root / "graphify-out" / "GRAPH_TREE.html"
        if graph_path.exists():
            write_tree_html(graph_path, tree_out)
            print("[graphify-sync] GRAPH_TREE.html updated")
    except Exception as e:
        print(f"[graphify-sync] Tree build failed: {e}")

    # 3. Rebuild Callflow HTML
    try:
        from graphify.callflow_html import write_callflow_html
        callflow_out = root / "graphify-out" / "stephanie-perez-portfolio-callflow.html"
        write_callflow_html(project=root, output=callflow_out)
        print("[graphify-sync] Callflow HTML updated")
    except Exception as e:
        print(f"[graphify-sync] Callflow build failed: {e}")

    # 4. Copy to root for direct hosting
    out_dir = root / "graphify-out"
    if (out_dir / "graph.html").exists():
        shutil.copy2(out_dir / "graph.html", root / "graph.html")
        (root / "graphify").mkdir(exist_ok=True)
        shutil.copy2(out_dir / "graph.html", root / "graphify" / "index.html")

    if (out_dir / "stephanie-perez-portfolio-callflow.html").exists():
        shutil.copy2(out_dir / "stephanie-perez-portfolio-callflow.html", root / "callflow.html")

    if (out_dir / "GRAPH_TREE.html").exists():
        shutil.copy2(out_dir / "GRAPH_TREE.html", root / "tree.html")

    # 5. Export high-res graph.png and graph.svg
    try:
        import networkx as nx
        import matplotlib
        matplotlib.use("Agg")
        import matplotlib.pyplot as plt
        import matplotlib.patches as mpatches
        from graphify.build import build_from_json
        from graphify.export import COMMUNITY_COLORS, _node_community_map

        graph_file = out_dir / "graph.json"
        labels_file = out_dir / ".graphify_labels.json"

        if graph_file.exists():
            extraction = json.loads(graph_file.read_text(encoding="utf-8"))
            labels_raw = json.loads(labels_file.read_text(encoding="utf-8")) if labels_file.exists() else {}

            G = build_from_json(extraction)
            communities = {}
            for n in extraction.get("nodes", []):
                c = n.get("community", -1)
                if c >= 0:
                    communities.setdefault(c, []).append(n["id"])

            community_labels = {int(k): v for k, v in labels_raw.items()}

            for n in G.nodes():
                lbl = G.nodes[n].get("label", str(n))
                clean_lbl = re.sub(r"[^\x00-\x7F]+", "", lbl).strip()
                G.nodes[n]["clean_label"] = clean_lbl if clean_lbl else str(n)

            node_community = _node_community_map(communities)

            fig, ax = plt.subplots(figsize=(26, 17), facecolor="#0d0d15")
            ax.set_facecolor("#0d0d15")
            ax.axis("off")

            pos = nx.spring_layout(G, seed=42, k=2.4 / (G.number_of_nodes() ** 0.5 + 1), iterations=85)
            degree = dict(G.degree())
            max_deg = max(degree.values(), default=1) or 1

            node_colors = [COMMUNITY_COLORS[node_community.get(n, 0) % len(COMMUNITY_COLORS)] for n in G.nodes()]
            node_sizes = [380 + 1500 * (degree.get(n, 1) / max_deg) for n in G.nodes()]

            for u, v, data in G.edges(data=True):
                conf = data.get("confidence", "EXTRACTED")
                style = "solid" if conf == "EXTRACTED" else "dashed"
                alpha = 0.45 if conf == "EXTRACTED" else 0.22
                x0, y0 = pos[u]
                x1, y1 = pos[v]
                ax.plot([x0, x1], [y0, y1], color="#6366f1", linewidth=1.1, linestyle=style, alpha=alpha, zorder=1)

            nx.draw_networkx_nodes(G, pos, ax=ax, node_color=node_colors, node_size=node_sizes, alpha=0.92, edgecolors=(1.0, 1.0, 1.0, 0.4), linewidths=1.2)
            labels_dict = {n: G.nodes[n]["clean_label"][:25] for n in G.nodes()}
            nx.draw_networkx_labels(G, pos, ax=ax, labels=labels_dict, font_size=8, font_color="#f3f4f6", font_weight="bold")

            patches = [
                mpatches.Patch(
                    color=COMMUNITY_COLORS[cid % len(COMMUNITY_COLORS)],
                    label=f"{label} ({len(communities.get(cid, []))})",
                )
                for cid, label in sorted(community_labels.items())
            ]
            ax.legend(handles=patches, loc="upper left", framealpha=0.92, facecolor="#161624", edgecolor="#3b3b55", labelcolor="#ffffff", fontsize=10, title="Graphify Clustered Communities", title_fontsize=11.5)

            plt.title("Himanshi Parihar Portfolio - Graphify Knowledge Graph & Architecture Clusters", color="#ffffff", fontsize=20, pad=24, fontweight="bold")
            plt.tight_layout()

            plt.savefig(out_dir / "graph.svg", format="svg", bbox_inches="tight", facecolor=fig.get_facecolor())
            plt.savefig(out_dir / "graph.png", format="png", dpi=200, bbox_inches="tight", facecolor=fig.get_facecolor())
            plt.close(fig)
            print("[graphify-sync] Exported graph.png and graph.svg successfully")
    except Exception as e:
        print(f"[graphify-sync] Image export failed: {e}")

    # 6. Clean up any timestamped backup folders inside graphify-out
    for item in out_dir.iterdir():
        if item.is_dir() and re.match(r"^\d{4}-\d{2}-\d{2}", item.name):
            shutil.rmtree(item, ignore_errors=True)

    print("[graphify-sync] Knowledge graph synchronization complete!")

if __name__ == "__main__":
    main()
