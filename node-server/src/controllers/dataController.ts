import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

interface DollarData {
  date: string;
  price: number;
  percentChange: number;
}

function ensureDirectoryExists(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function loadExistingData(filePath: string): DollarData[] {
  try {
    if (fs.existsSync(filePath)) {
      const rawData = fs.readFileSync(filePath);
      return JSON.parse(rawData.toString());
    }
  } catch (error) {
    console.error(`Erro ao carregar dados do arquivo ${filePath}:`, error);
  }
  return [];
}

function saveData(filePath: string, data: DollarData[]): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Erro ao salvar dados no arquivo ${filePath}:`, error);
  }
}

function isDataIdentical(existingData: DollarData, newData: DollarData): boolean {
  return existingData.price === newData.price && existingData.percentChange === newData.percentChange;
}

export const handleDatasetUpload = (req: Request, res: Response) => {
  const dataDirPath = path.join(__dirname, '..', 'data');
  const dataFilePath = path.join(dataDirPath, 'dollar_data.json');

  try {
    if (!req.body || !Array.isArray(req.body) || req.body.length === 0) {
      return res.status(400).json({ status: 'error', message: 'No valid data provided.' });
    }

    ensureDirectoryExists(dataDirPath);

    const existingData = loadExistingData(dataFilePath);
    const newData: DollarData[] = req.body;

    if (existingData.length > 0) {
      const lastExistingData = existingData[existingData.length - 1];
      const lastNewData = newData[newData.length - 1];

      if (isDataIdentical(lastExistingData, lastNewData)) {
        console.log('Dados idênticos ao último registro, não serão adicionados.');
        return res.status(200).json({ status: 'success', message: 'No new data to add.' });
      }
    }

    existingData.push(...newData);
    saveData(dataFilePath, existingData);

    console.log('Dataset recebido e salvo com sucesso:', newData);
    res.status(200).json({ status: 'success', message: 'Dataset uploaded and saved successfully!', data: newData });
  } catch (error) {
    console.error('Erro ao processar e salvar o dataset:', error);
    res.status(500).json({ status: 'error', message: 'Error processing dataset.' });
  }
};
