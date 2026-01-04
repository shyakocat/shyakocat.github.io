// src/utils/rehype-process-images.js
import { visit } from 'unist-util-visit';
import { h } from "hastscript";

/**
 * 处理图片alt格式的rehype插件
 * alt格式: "alt caption w-50%" 或其他变体
 */
export function rehypeImageCaption() {
    return (tree) => {
        visit(tree, 'element', (node, index, parent) => {
            // 只处理img标签
            if (node.tagName !== 'img') return;

            const alt = node.properties?.alt || '';

            // 检查alt是否符合我们的格式
            // 格式: "alt caption w-50%"
            const pattern = /^(.*?)(\s+c-(.*?))?(\s+w-(.*?))?$/;
            const result = pattern.exec(alt);

            if (!result) return;

            const [, text, , caption = null, , width = '100%'] = result;

            // 清理原始的img标签的alt
            node.properties.alt = text;

            // 设置宽度
            node.properties.style = node.properties.style
                ? `${node.properties.style}; width: ${width}`
                : `width: ${width}`;

            // // 添加CSS类
            // node.properties.class = node.properties.class
            //     ? `${node.properties.class} processed-image`
            //     : 'processed-image';

            let fig_content = caption ? [node, h('figcaption', {}, caption)] : [node];
            let new_node = h('div', { class: 'image-caption'}, [
                h('div', {}, [
                    h('figure', {}, fig_content)
                ])
            ])

            // 替换原始img节点
            if (parent && typeof index === 'number') {
                parent.children[index] = new_node;
            }
        });
    };
}