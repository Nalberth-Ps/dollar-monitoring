import { Router } from 'express';
import { generateGraph } from '../controllers/graphController';

const router = Router();

router.get('/generate-graph', (req, res) => {
  try {
    const svg = generateGraph(); // Generates the SVG content
    res.set('Content-Type', 'image/svg+xml');
    res.send(svg); // Sends the SVG content directly
  } catch (error) {
    console.error('Erro ao gerar o gráfico:', error);
    res.status(500).send('Erro ao gerar o gráfico.');
  }
});

export default router;
