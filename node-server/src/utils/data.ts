import fs from 'fs';
import path from 'path';

export function loadExistingData(): any[] {
  const dataFilePath = path.join(__dirname, '..', 'data', 'dollar_data.json');
  console.log(`Loading data from: ${dataFilePath}`);
  if (fs.existsSync(dataFilePath)) {
    const rawData = fs.readFileSync(dataFilePath);
    return JSON.parse(rawData.toString());
  }

  console.log(`File not found: ${dataFilePath}`);
  return [];
}
