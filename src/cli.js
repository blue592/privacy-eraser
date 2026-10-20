#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { maskJson, maskText } from './mask.js';

function help() { console.log('privacy-mask\n\nUsage:\n  privacy-mask < file.txt\n  privacy-mask --file input.txt --out safe.txt\n  privacy-mask --json < data.json\n  privacy-mask --names < text.txt\n\nInput is processed locally and never uploaded.'); }
export async function main(argv = process.argv.slice(2)) {
  if (argv.includes('--help')) return help();
  const fileIndex = argv.indexOf('--file'); const outIndex = argv.indexOf('--out');
  const names = argv.includes('--names'); const json = argv.includes('--json'); const style = argv.includes('--style') ? argv[argv.indexOf('--style') + 1] : undefined;
  const input = fileIndex >= 0 ? await fs.readFile(argv[fileIndex + 1], 'utf8') : await new Promise(resolve => { let data = ''; process.stdin.setEncoding('utf8'); process.stdin.on('data', chunk => { data += chunk; }); process.stdin.on('end', () => resolve(data)); });
  let result; try { result = json ? JSON.stringify(maskJson(JSON.parse(input), { names }), null, 2) + '\n' : maskText(input, { names, style }); } catch (error) { throw new Error(`Invalid JSON: ${error.message}`); }
  if (outIndex >= 0) await fs.writeFile(path.resolve(argv[outIndex + 1]), result, { encoding: 'utf8', mode: 0o600 }); else process.stdout.write(result);
}
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) main().catch(error => { console.error(`Error: ${error.message}`); process.exitCode = 1; });

