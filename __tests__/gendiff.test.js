import fs from 'fs';
import path from 'path';
import gendiff from '../src/index.js';

const getFixturePath = (filename) => path.join('__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  ['json', 'output-JSON.json', 'json'],
  ['json', 'output-stylish.txt', 'stylish'],
  ['json', 'output-plain.txt', 'plain'],
  ['ini', 'output-stylish.txt', 'stylish'],
  ['yaml', 'output-stylish.txt', 'stylish'],
])('gendiff(%#)', (isFile, expectedFile, format) => {
  const firstFile = getFixturePath(`inputFile.${isFile}`);
  const secondFile = getFixturePath(`outputFile.${isFile}`);
  const output = readFile(expectedFile);
  expect(gendiff(firstFile, secondFile, format)).toBe(output);
});
