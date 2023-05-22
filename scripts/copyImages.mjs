import fs from 'fs';
import path from 'path';
import * as glob from 'glob';

const postsDirectory = path.join(process.cwd(), 'posts');
const publicDirectory = path.join(process.cwd(), 'public/posts');

// Get all markdown files in the posts directory
const filenames = glob.sync(`${postsDirectory}/**/*.{png,jpg,jpeg,gif,svg}`);

// Copy each image to the public directory, maintaining the directory structure
filenames.forEach((filename) => {
    const destination = filename.replace(postsDirectory, publicDirectory);

    // Ensure the destination directory exists
    fs.mkdirSync(path.dirname(destination), { recursive: true });

    // Copy the file
    fs.copyFileSync(filename, destination);
});
