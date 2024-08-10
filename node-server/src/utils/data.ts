import fs from 'fs';
import path from 'path';

export function loadExistingData(): any[] {
  const dataFilePath = path.join(__dirname, '..', 'data', 'dollar_data.json');
  if (fs.existsSync(dataFilePath)) {
    const rawData = fs.readFileSync(dataFilePath);
    return JSON.parse(rawData.toString());
  }
  return [];
}
