# Docker Setup 
Este README fornece instruções sobre como rodar as imagens Docker disponíveis no Docker Hub para os projetos `python-app` e `node-server`.
## Imagens Disponíveis 
 
- **Python App** : [nalberth/python-app](https://hub.docker.com/repository/docker/nalberth/python-app)
 
- **Node Server** : [nalberth/node-server](https://hub.docker.com/repository/docker/nalberth/node-server)

## Pré-requisitos 

Certifique-se de que o Docker está instalado na sua máquina. Você pode verificar se o Docker está instalado e funcionando corretamente executando:


```bash
docker --version
```
Se o Docker não estiver instalado, siga as instruções de instalação no [site oficial do Docker]() .
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