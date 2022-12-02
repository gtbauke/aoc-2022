import { readFile } from 'node:fs/promises';
import path from 'node:path';

const INPUT_FILE = path.join(__dirname, 'inputs', '02.txt');

type Shape = 'Rock' | 'Paper' | 'Scissors';
type Match = [Shape, Shape];

const opponentToShape: Record<string, Shape> = {
  A: 'Rock',
  B: 'Paper',
  C: 'Scissors',
};

const playerToShape: Record<string, Shape> = {
  X: 'Rock',
  Y: 'Paper',
  Z: 'Scissors',
};

const getPlayerShape = (opponent: Shape, roundGoal: 'X' | 'Y' | 'Z'): Shape => {
  if (opponent === 'Rock') {
    switch (roundGoal) {
      case 'X':
        return 'Scissors';
      case 'Y':
        return 'Rock';
      case 'Z':
        return 'Paper';
      default:
        throw new Error(`Invalid round goal ${roundGoal}`);
    }
  } else if (opponent === 'Paper') {
    switch (roundGoal) {
      case 'X':
        return 'Rock';
      case 'Y':
        return 'Paper';
      case 'Z':
        return 'Scissors';
      default:
        throw new Error(`Invalid round goal ${roundGoal}`);
    }
  } else {
    switch (roundGoal) {
      case 'X':
        return 'Paper';
      case 'Y':
        return 'Scissors';
      case 'Z':
        return 'Rock';
      default:
        throw new Error(`Invalid round goal ${roundGoal}`);
    }
  }
};

const shapeToPoints: Record<Shape, number> = {
  Rock: 1,
  Paper: 2,
  Scissors: 3,
};

const getPlayerMatchPoints = (match: Match): number => {
  const [opponent, player] = match;

  if (player === 'Rock') {
    switch (opponent) {
      case 'Rock':
        return 3;
      case 'Paper':
        return 0;
      case 'Scissors':
        return 6;
      default:
        throw new Error(`Invalid opponent shape ${opponent}`);
    }
  } else if (player === 'Paper') {
    switch (opponent) {
      case 'Rock':
        return 6;
      case 'Paper':
        return 3;
      case 'Scissors':
        return 0;
      default:
        throw new Error(`Invalid opponent shape ${opponent}`);
    }
  } else {
    switch (opponent) {
      case 'Rock':
        return 0;
      case 'Paper':
        return 6;
      case 'Scissors':
        return 3;
      default:
        throw new Error(`Invalid opponent shape ${opponent}`);
    }
  }
};

const main = async () => {
  const input = await readFile(INPUT_FILE, { encoding: 'utf-8' });
  const matches = input
    .split('\n')
    .filter(l => l.trim() !== '')
    .map(line => {
      const [opponent, player] = line.split(' ');
      return [opponentToShape[opponent], playerToShape[player]] as Match;
    });

  const points = matches
    .map(match => getPlayerMatchPoints(match) + shapeToPoints[match[1]])
    .reduce((a, b) => a + b, 0);

  console.log(points);

  const secondMatches = input
    .split('\n')
    .filter(l => l.trim() !== '')
    .map(line => {
      const [opponent, roundGoal] = line.split(' ');
      return [
        opponentToShape[opponent],
        getPlayerShape(opponentToShape[opponent], roundGoal as 'X' | 'Y' | 'Z'),
      ] as Match;
    });

  const secondPoints = secondMatches
    .map(match => getPlayerMatchPoints(match) + shapeToPoints[match[1]])
    .reduce((a, b) => a + b, 0);

  console.log(secondPoints);
};

main();
