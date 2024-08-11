# Python Data Scraper 

Este projeto realiza o scraping de dados do dólar, processa esses dados e os envia para um servidor Node.js.

## Funcionalidades 
 
- **Scraping de Dados do Dólar:** 
  - Um cron job é responsável por realizar o scraping periódico dos dados do dólar.
 
- **Limpeza de Dados:** 
  - Após o scraping, os dados são processados para garantir sua integridade e formato adequado para análise.
 
- **Envio de Dados:** 
  - Os dados limpos são enviados para o servidor Node.js para serem armazenados e utilizados nas funcionalidades subsequentes.

## Logs 

O sistema de logs é utilizado para acompanhar o processo de scraping e envio de dados. Certifique-se de que os logs estejam configurados corretamente para capturar todos os eventos importantes.