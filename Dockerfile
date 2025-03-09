# Use a imagem oficial do Node.js como base
FROM node:20

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Instala o Angular CLI globalmente
RUN npm install -g @angular/cli

# Copia o package.json e o package-lock.json
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todos os arquivos do projeto para o diretório de trabalho
COPY . .

# Exponha a porta que o ng serve vai utilizar
EXPOSE 4200

# Comando para iniciar o servidor de desenvolvimento
CMD ["ng", "serve", "--host", "0.0.0.0"]

