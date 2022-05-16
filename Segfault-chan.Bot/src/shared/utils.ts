import fs from 'fs';

export function readFiles(path: string, suffix = '.ts'): string[] {
  const files = fs.readdirSync(path)
    .filter((file) => file.endsWith(suffix))
    .map((file) => file.substring(0, file.length - 3));
  
  return files;
}

export function trim(value: string, max: number) {
  return value.length > max ? `${value.slice(0, max - 3)}...` : value;
}

export function removeCharacters(value: string, characters: string, escape = true): string {
  for (const character of characters) {
    const expression = escape ? `\\${character}` : character;
    value = value.replace(new RegExp(expression, 'g'), '');
  }

  return value;
}
