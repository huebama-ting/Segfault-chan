import fs from 'fs';

export function readFiles(path: string, suffix = '.ts'): string[] {
  const files = fs.readdirSync(path)
    .filter((file) => file.endsWith(suffix))
    .map((file) => file.substring(0, file.length - 3));
  
  return files;
}
