import { readFile } from 'node:fs/promises';
import path from 'node:path';

const INPUT_FILE = path.join(__dirname, 'inputs', '01.txt');

type Elf = {
  calories: number[];
};

const main = async () => {
  const input = await readFile(INPUT_FILE, { encoding: 'utf-8' });
  const elves = input.split('\n\n').map(value => {
    const values = value.split('\n');
    return { calories: values.map(Number) } as Elf;
  });

  const summedValues = elves.map(elf =>
    elf.calories.reduce((a, b) => a + b, 0),
  );

  const max = Math.max(...summedValues);
  console.log(max);

  const stack: number[] = [];
  for (let i = 0; i < 3; i++) {
    const m = Math.max(...summedValues);

    stack.push(m);
    summedValues.splice(summedValues.indexOf(m), 1);
  }

  console.log(stack.reduce((a, b) => a + b, 0));
};

main();
