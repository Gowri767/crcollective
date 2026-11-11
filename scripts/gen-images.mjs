// Scans public/products/<slug>/hero.(webp|png|jpg) and writes src/data/images.json
import fs from 'node:fs'; import path from 'node:path';
const root = path.join(process.cwd(), 'public', 'products'); const out = {};
if (fs.existsSync(root)) for (const slug of fs.readdirSync(root)) for (const ext of ['webp', 'png', 'jpg']) {
  if (fs.existsSync(path.join(root, slug, `hero.${ext}`))) { out[slug] = `/products/${slug}/hero.${ext}`; break; }
}
if (fs.existsSync(root)) for (const slug of fs.readdirSync(root)) for (const ext of ['webp', 'png', 'jpg']) {
  if (fs.existsSync(path.join(root, slug, `hover.${ext}`))) { out[slug + ':hover'] = `/products/${slug}/hover.${ext}`; break; }
}
fs.mkdirSync('src/data', { recursive: true }); fs.writeFileSync('src/data/images.json', JSON.stringify(out, null, 2));
console.log('product images found:', Object.keys(out).length);
