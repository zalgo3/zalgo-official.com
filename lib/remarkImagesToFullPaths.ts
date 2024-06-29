import {Node} from 'unist';
import {is} from 'unist-util-is';
import {visit} from 'unist-util-visit';

interface ImageNode extends Node {
    type: 'image';
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
        visit(tree, 'image', (node: unknown) => {
            if (is(node, 'image')) {
                const imageNode = node as ImageNode;
                const url = imageNode.url;
                if (!url.startsWith('http')) {
                    imageNode.url = `/posts/${slug}/${url}`;
                }
                if (!imageNode.data)
                    imageNode.data = {hProperties: {class: '', style: ''}};
                if (!imageNode.data.hProperties)
                    imageNode.data.hProperties = {class: '', style: ''};
                imageNode.data.hProperties.class = 'remark-image';
                imageNode.data.hProperties.style =
                    'max-width: 100%; height: auto;';
            }
        });
    };
};

export default remarkImagesToFullPaths;
