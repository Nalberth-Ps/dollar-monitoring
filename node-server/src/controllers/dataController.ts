import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

function ensureDirectoryExists(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}


function loadExistingData(filePath: string): any[] {
  if (fs.existsSync(filePath)) {
    const rawData = fs.readFileSync(filePath);
    return JSON.parse(rawData.toString());
  }
  return [];
}

function saveData(filePath: string, data: any[]) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export const handleDatasetUpload = (req: Request, res: Response) => {
  const dataDirPath = path.join(__dirname, '..', 'data');
  const dataFilePath = path.join(dataDirPath, 'dollar_data.json');

  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send('No data provided.');
    }

    ensureDirectoryExists(dataDirPath);

    const existingData = loadExistingData(dataFilePath);
    const newData = req.body;

    existingData.push(...newData);
    saveData(dataFilePath, existingData);

    console.log('Dataset recebido e salvo:', newData);
    res.send('Dataset uploaded and saved successfully!');
  } catch (error) {
    console.error('Erro ao processar e salvar o dataset:', error);
    res.status(500).send('Error processing dataset.');
  }
};
