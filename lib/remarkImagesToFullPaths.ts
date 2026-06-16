import path from 'path';

import sharp from 'sharp';
import {Node} from 'unist';
import {is} from 'unist-util-is';
import {visit} from 'unist-util-visit';

type ImageNode = {
    type: 'image';
    url: string;
    title?: string;
    alt?: string;
    data?: {
        hProperties: Record<string, unknown>;
    };
} & Node;

const remarkImagesToFullPaths = ({slug}: {slug: string}) => {
    return async (tree: Node) => {
        const imageNodes: ImageNode[] = [];
        visit(tree, 'image', (node: unknown) => {
            if (is(node, 'image')) {
                imageNodes.push(node as ImageNode);
            }
        });

        await Promise.all(
            imageNodes.map(async imageNode => {
                const original = imageNode.url;
                const isLocal = !original.startsWith('http');
                if (isLocal) {
                    imageNode.url = `/posts/${slug}/${original}`;
                }
                imageNode.data ??= {hProperties: {}};

                // Read intrinsic dimensions of local images so the rendered
                // <Image> can reserve space (avoids layout shift) and serve an
                // optimized, responsive srcset. Remote images fall back to a
                // plain <img> in the PostImage component.
                if (isLocal) {
                    try {
                        const filePath = path.join(
                            process.cwd(),
                            'public',
                            'posts',
                            slug,
                            original
                        );
                        const {width, height} =
                            await sharp(filePath).metadata();
                        if (width && height) {
                            imageNode.data.hProperties.width = width;
                            imageNode.data.hProperties.height = height;
                        }
                    } catch {
                        // Dimensions unavailable; PostImage renders a plain img.
                    }
                }
            })
        );
    };
};

export default remarkImagesToFullPaths;
