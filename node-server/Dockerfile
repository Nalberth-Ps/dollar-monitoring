# Use a imagem base do Node.js
FROM node:16

# Crie o diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos de configuração
COPY package*.json ./
COPY tsconfig.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos
COPY src/ ./src/
COPY public/ ./public/

# Compile o TypeScript
RUN npm run build

# Exponha a porta da aplicação
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/index.js"]
