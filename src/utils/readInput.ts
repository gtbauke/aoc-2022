import { readFile } from 'node:fs/promises';
import path from 'node:path';

type Day =
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'
  | '17'
  | '18'
  | '19'
  | '20'
  | '21'
  | '22'
  | '23'
  | '24'
  | '25';
type InputFile = `${Day}.txt`;

const INPUTS_FOLDER_PATH = path.join(__dirname, '..', 'inputs');

export const readInput = async (file: InputFile): Promise<string> => {
  const filePath = path.join(INPUTS_FOLDER_PATH, file);
  const content = await readFile(filePath, { encoding: 'utf-8' });

  return content;
};
