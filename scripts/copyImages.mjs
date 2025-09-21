import fs from 'fs';
import path from 'path';

const extensions = ['png', 'jpg', 'jpeg', 'gif', 'svg'];

function copyImageFiles(sourceBase, publicBase) {
    function recurse(currentSource) {
        if (!fs.existsSync(currentSource)) {
            return;
        }
        const files = fs.readdirSync(currentSource);

        files.forEach(file => {
            const filePath = path.join(currentSource, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                recurse(filePath);
            } else {
                const fileExtension = path.extname(file).substring(1);
                if (extensions.includes(fileExtension)) {
                    const destination = filePath.replace(sourceBase, publicBase);
                    fs.mkdirSync(path.dirname(destination), { recursive: true });
                    fs.copyFileSync(filePath, destination);
                }
            }
        });
    }
    recurse(sourceBase);
}

const postsDirectory = path.join(process.cwd(), 'posts');
const publicPostsDirectory = path.join(process.cwd(), 'public/posts');
copyImageFiles(postsDirectory, publicPostsDirectory);

const musicDirectory = path.join(process.cwd(), 'music');
const publicMusicDirectory = path.join(process.cwd(), 'public/music');
copyImageFiles(musicDirectory, publicMusicDirectory);
