// Some bundled libraries contain a literal U+FFFD inside template strings.
// Replace it with the equivalent � escape so strict static hosts accept the files.
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
const walk = (d) => readdirSync(d).flatMap((f) => {
  const p = join(d, f);
  return statSync(p).isDirectory() ? walk(p) : p.endsWith('.js') ? [p] : [];
});
for (const f of walk(process.argv[2] ?? 'storybook-static')) {
  const s = readFileSync(f, 'utf8');
  if (s.includes('�')) writeFileSync(f, s.replaceAll('�', '\\uFFFD'));
}
