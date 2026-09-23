import { mkdir, rm, writeFile } from 'node:fs/promises';

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex">
    <title>Tihomir Selak — Blog</title>
  </head>
  <body>
    <main>
      <h1>Tihomir Selak — Blog</h1>
      <p>The publication is being rebuilt. The Astro implementation and reviewed article archive will replace this repository seed.</p>
    </main>
  </body>
</html>
`;

await writeFile('dist/index.html', html, 'utf8');
