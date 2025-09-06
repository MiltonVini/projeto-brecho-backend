# 1. Escolhe a imagem da versão do Node desejada
FROM node:22-alpine

# Instalar dependências do sistema (OpenSSL e bash)
RUN apk add --no-cache openssl bash

# 2. Define o diretório de trabalho dentro do container
WORKDIR /app

# 3. Copia o package.json e package-lock.json para instalar dependências
COPY package*.json ./

# 4. Instala as dependências
RUN npm install

# 5. Copia o resto do código da aplicação
COPY . .

# 6. Gera o Prisma Client
RUN npx prisma generate

# 7. Expõe a porta que a aplicação vai rodar
EXPOSE 3000

# 8. Realiza build da aplicação
RUN npm run build

# 9. Define o comando padrão para rodar a aplicação
CMD ["npm", "start"]
