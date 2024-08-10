import express from 'express';
import bodyParser from 'body-parser';
import dataRouter from './routes/data';
import graphRouter from './routes/graph';
import notifyRouter from './routes/notify'; // Importando o novo roteador

const app = express();
const port = 3000;

// Middleware para processar JSON e dados de formulário
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para lidar com uploads de datasets
app.use('/data', dataRouter);

// Rota para gerar gráficos
app.use('/graph', graphRouter);

// Rota para cadastrar notificações
app.use('/notify', notifyRouter); // Adicionando a nova rota

// Arquivos estáticos
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
