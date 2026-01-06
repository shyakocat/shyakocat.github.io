import { visit } from "unist-util-visit";

export default function rehypeFootnoteI18n() {
    return (tree) => {
        visit(tree, "element", (node) => {
            try {
                if (node.tagName === "h2" && node.properties && node.properties.id === "footnote-label") {
                    node.children = [
                        {
                            type: "text",
                            value: "脚注",
                        },
                    ];
                }
            } catch (e) {
                // noop
            }
        });
    };
}
