FROM node:22.11.0-alpine

# Instala pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copia os arquivos de dependência
COPY package.json pnpm-lock.yaml ./

# Instala as dependências
RUN pnpm install

# Copia o resto da aplicação
COPY . .

# Comando para iniciar (ajusta conforme tua stack)
CMD ["pnpm", "dev"]