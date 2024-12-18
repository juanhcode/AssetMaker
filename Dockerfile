# Fase de construcción
FROM node:20-bullseye as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Fase de ejecución
FROM node:20-bullseye

WORKDIR /app

COPY --from=build /app/build ./build

# Instalar un servidor para la aplicación React
RUN npm install -g serve@latest

EXPOSE 3000

# Comando para servir la aplicación
CMD ["serve", "-s", "build", "-l", "3000"]

