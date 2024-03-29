import {Node} from 'unist';
import {is} from 'unist-util-is';
import {visit} from 'unist-util-visit';

interface ImageNode extends Node {
    url: string;
    title?: string;
    alt?: string;
    data?: {
        hProperties: {
            class: string;
            style: string;
        };
    };
}

const remarkImagesToFullPaths = ({slug}: {slug: string}) => {
    return (tree: Node) => {
        visit(tree, 'image', (node: any) => {
            if (is<ImageNode>(node, 'image')) {
                const url = node.url;
                if (!url.startsWith('http')) {
                    node.url = `/posts/${slug}/${url}`;
                }
                if (!node.data)
                    node.data = {hProperties: {class: '', style: ''}};
                if (!node.data.hProperties)
                    node.data.hProperties = {class: '', style: ''};
                node.data.hProperties.class = 'remark-image';
                node.data.hProperties.style = 'max-width: 100%; height: auto;';
            }
        });
    };
};

export default remarkImagesToFullPaths;
