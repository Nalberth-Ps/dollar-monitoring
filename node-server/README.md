# Node Server API 

Este container Node oferece três principais rotas para upload de dados, registro de notificações e geração de gráficos com base em dados financeiros.

## Rotas Disponíveis 

### 1. Upload de Dados 
**URL:**  `http://localhost:3000/data/upload`

**Método:**  `POST`

**Descrição:** Essa rota permite o upload de um dataset contendo informações financeiras como data, preço, mudança de valor, e mudança percentual.**Exemplo de Payload:** 

```json
[
  {
    "date": "2024-08-10 07:02:04",
    "price": 5.507,
    "valueChange": -0.0433,
    "percentChange": -0.7802785936965022
  }
]
```
**Resposta de Sucesso:** 

```json
{
    "status": "success",
    "message": "Dataset uploaded and saved successfully!",
    "data": [
        {
            "date": "2024-08-10 07:02:04",
            "price": 5.507,
            "valueChange": -0.0433,
            "percentChange": -0.7802785936965022
        }
    ]
}
```
**Resposta de Erro:** 

```json
{
    "status": "error",
    "message": "No valid data provided."
}
```

### 2. Registro de Notificações 
**URL:**  `http://localhost:3000/notify`

**Método:**  `POST`

**Descrição:** Essa rota permite o registro de uma notificação para um número de telefone, onde o usuário será notificado quando o valor de um ativo atingir o valor alvo especificado.**Exemplo de Payload:** 

```json
{
    "phoneNumber": "77998372702",
    "targetValue": 5.800
}
```
**Resposta de Sucesso:** 

```json
{
    "status": "success",
    "message": "Notificação registrada com sucesso. Você será alertado quando o dólar atingir R$5.8.",
    "data": {
        "phoneNumber": "77998372702",
        "targetValue": 5.8
    }
}
```
**Respostas de Erro:**  
- Quando o número de telefone não é fornecido:


```json
{
    "status": "error",
    "message": "Número de telefone é obrigatório."
}
```
 
- Quando o valor alvo não é um número:


```json
{
    "status": "error",
    "message": "Valor alvo deve ser um número."
}
```

### 3. Geração de Gráfico 
**URL:**  `http://localhost:3000/graph/generate-graph`


**Método:**  `GET`

**Descrição:** Essa rota gera e retorna um gráfico representando o preço do dólar ao longo do tempo, utilizando os dados obtidos via scraping e armazenados pelo container Python.**Resposta:** 
Um gráfico em formato de imagem, mostrando a evolução do preço do dólar.
## Como Rodar o Container 

Para rodar o container Node com as rotas descritas acima, utilize o comando:


```bash
docker run -d --name node-server -p 3000:3000 nalberth/node-server
```

Este comando irá:

- Executar o container em segundo plano.
 
- Mapear a porta `3000` do container para a porta `3000` do host.

## Requisitos 

- Docker instalado e configurado corretamente.
 
- Acesso à porta `3000` no host para acessar as rotas do servidor.

## Verificação e Teste 

Após iniciar o container, você pode verificar se as rotas estão funcionando corretamente utilizando ferramentas como Postman, cURL, ou diretamente via código.
