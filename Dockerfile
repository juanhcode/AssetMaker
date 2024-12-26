# Fase de construcción
FROM node:20-bullseye as build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Fase de ejecución
FROM nginx:stable-alpine

# Elimina la configuración por defecto de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia tu configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d

# Copia los archivos de construcción al directorio predeterminado de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expone el puerto 4200
EXPOSE 4200

# Inicia Nginx
CMD ["nginx", "-g", "daemon off;"]
