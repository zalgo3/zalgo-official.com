import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'posts');
const publicDirectory = path.join(process.cwd(), 'public/posts');

const extensions = ['png', 'jpg', 'jpeg', 'gif', 'svg'];

function copyFiles(directory) {
    const files = fs.readdirSync(directory);

    files.forEach(file => {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            return copyFiles(filePath);
        } else {
            const fileExtension = path.extname(file).substring(1);

            if (extensions.includes(fileExtension)) {
                const destination = filePath.replace(postsDirectory, publicDirectory);

                fs.mkdirSync(path.dirname(destination), { recursive: true });
                fs.copyFileSync(filePath, destination);
            }
        }
    });
}

copyFiles(postsDirectory);
