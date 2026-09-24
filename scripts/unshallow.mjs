import {execSync} from 'child_process';

// Post dates come from `git log`, so a shallow clone (as hosted CI builders
// such as Cloudflare Pages may make) would stamp every post with the same
// date. Fetch the full history first when the checkout is shallow.
const isShallow =
    execSync('git rev-parse --is-shallow-repository').toString().trim() ===
    'true';

if (isShallow) {
    execSync('git fetch --unshallow', {stdio: 'inherit'});
}
