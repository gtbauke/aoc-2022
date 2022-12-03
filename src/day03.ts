/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { readInput } from './utils/readInput';

type Item =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z';

type Priority =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45
  | 46
  | 47
  | 48
  | 49
  | 50
  | 51
  | 52;

type Rucksack = {
  compartmentA: Item[];
  compartmentB: Item[];
};

type Group = [Rucksack, Rucksack, Rucksack];

const getItemPriority = (item: Item): Priority => {
  if (item.toLowerCase() === item) {
    return (item.charCodeAt(0) - 96) as Priority;
  }

  return (item.charCodeAt(0) - 38) as Priority;
};

const splitInGroups = (items: Rucksack[]): Group[] => {
  const groups: Group[] = [];

  for (let i = 0; i < items.length; i += 3) {
    const group = [items[i], items[i + 1], items[i + 2]] as Group;
    groups.push(group);
  }

  return groups;
};

const main = async () => {
  const input = await readInput('03.txt');

  const rucksacks = input
    .split('\n')
    .filter(line => line !== '')
    .map(line => line.trim())
    .map(line => {
      const compartmentA = line.slice(0, line.length / 2).split('') as Item[];
      const compartmentB = line.slice(line.length / 2).split('') as Item[];

      return {
        compartmentA,
        compartmentB,
      } as Rucksack;
    });

  const totalPriority = rucksacks
    .map(r => {
      const samePriorityItem = r.compartmentA.find(item =>
        r.compartmentB.includes(item),
      )!;

      return samePriorityItem;
    })
    .filter(item => item !== undefined)
    .map(getItemPriority)
    .reduce((acc, curr) => acc + curr, 0);

  console.log(totalPriority);

  const groups = splitInGroups(rucksacks);
  const groupsTotalPriority = groups
    .map(g => {
      const samePriorityItem = [
        ...g[0].compartmentA,
        ...g[0].compartmentB,
      ].find(
        item =>
          [...g[1].compartmentA, ...g[1].compartmentB].includes(item) &&
          [...g[2].compartmentA, ...g[2].compartmentB].includes(item),
      )!;

      return samePriorityItem;
    })
    .filter(item => item !== undefined)
    .map(getItemPriority)
    .reduce((acc, curr) => acc + curr, 0);

  console.log(groupsTotalPriority);
};

main();
