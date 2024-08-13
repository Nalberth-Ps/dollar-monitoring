# Docker Setup 
Este README fornece instruções sobre como rodar as imagens Docker disponíveis no Docker Hub para os projetos `python-app` e `node-server`.
## Imagens Disponíveis 
 
- **Python App** : [nalberth/python-app](https://hub.docker.com/repository/docker/nalberth/python-app)
 
- **Node Server** : [nalberth/node-server](https://hub.docker.com/repository/docker/nalberth/node-server)

## Pré-requisitos 

Certifique-se de que o Docker e o Docker Compose estão instalados na sua máquina. Você pode verificar se ambos estão instalados e funcionando corretamente executando:


```bash
docker --version
docker-compose --version
```
Se o Docker ou Docker Compose não estiverem instalados, siga as instruções de instalação no [site oficial do Docker]() .
## Como Rodar as Imagens 

### 1. Criar uma Rede Docker Personalizada 
Para garantir que os containers possam se comunicar como microserviços distintos, primeiro crie uma rede Docker personalizada com o nome `dolar_scraping`:

```bash
docker network create dolar_scraping
```

### 2. Rodar a Imagem do Node Server 
Em seguida, execute o container `node-server` conectando-o à rede `dolar_scraping` e mapeando a porta 3000:

```bash
docker run -d --name node-server --network dolar_scraping -p 3000:3000 nalberth/node-server
```

- O container será executado em segundo plano (modo "detached").
 
- O nome do container será `node-server`.
 
- A porta `3000` do container será mapeada para a porta `3000` do host.

### 3. Rodar a Imagem do Python App 
Finalmente, execute o container `python-app` na mesma rede `dolar_scraping` para que ele possa se comunicar com o `node-server`:

```bash
docker run -d --name python-app --network dolar_scraping nalberth/python-app
```

- O container será executado em segundo plano (modo "detached").
 
- O nome do container será `python-app`.

## Executar Usando Docker Compose 
Se preferir, você pode usar `docker-compose` para simplificar o processo de execução dos containers. Para isso, siga os passos abaixo:
### Passo 1: Executar o Docker Compose 
No terminal, navegue até o diretório onde o arquivo `docker-compose.yml` está localizado e execute o comando:

```bash
docker-compose up -d
```
 
- Isso irá criar e iniciar os containers definidos no `docker-compose.yml`.
 
- A rede `dolar_scraping` será criada automaticamente, e os containers serão configurados para se comunicar entre si.

### Passo 2: Verificar os Containers em Execução 

Você pode verificar o status dos containers usando o comando:


```bash
docker-compose ps
```

### Passo 3: Parar e Remover os Containers 

Para parar os containers, use:


```bash
docker-compose down
```
Isso irá parar e remover todos os containers, mas os dados persistirão no diretório `./data`.
### Nota Importante 

Se a imagem especificada não estiver presente no seu sistema local, o Docker fará automaticamente o download da imagem correspondente do Docker Hub antes de iniciar o container.

## Verificando Containers em Execução 

Para listar todos os containers em execução, utilize o comando:


```bash
docker ps
```

## Parando e Removendo Containers 

Para parar um container:


```bash
docker stop <nome-do-container>
```

Para remover um container:


```bash
docker rm <nome-do-container>
```
Substitua `<nome-do-container>` pelo nome que você deu ao container (`python-app` ou `node-server`).