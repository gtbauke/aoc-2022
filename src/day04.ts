import { readInput } from './utils/readInput';

type Range = {
  min: number;
  max: number;
};

type Pair = [Range, Range];

const rangeContains = (a: Range, b: Range): boolean => {
  return b.min >= a.min && b.max <= a.max;
};

const rangeOverlaps = (a: Range, b: Range): boolean => {
  return a.min <= b.max && a.max >= b.min;
};

const main = async () => {
  const input = await readInput('04.txt');
  const pairs = input
    .split('\n')
    .filter(line => line)
    .map(
      line =>
        line
          .trim()
          .split(',')
          .map(r => {
            const [min, max] = r.split('-').map(Number);
            return { min, max } as Range;
          }) as Pair,
    );

  const fullOverlapCount = pairs
    .map(([first, second]) => {
      const isFirstContainedInSecond = rangeContains(first, second);
      const isSecondContainedInFirst = rangeContains(second, first);

      return isFirstContainedInSecond || isSecondContainedInFirst
        ? (1 as number)
        : (0 as number);
    })
    .reduce((acc, curr) => acc + curr, 0);

  console.log(fullOverlapCount);

  const overlapCount = pairs
    .map(([first, second]) => {
      const isFirstContainedInSecond = rangeOverlaps(first, second);
      const isSecondContainedInFirst = rangeOverlaps(second, first);

      return isFirstContainedInSecond || isSecondContainedInFirst
        ? (1 as number)
        : (0 as number);
    })
    .reduce((acc, curr) => acc + curr, 0);

  console.log(overlapCount);
};

main();
