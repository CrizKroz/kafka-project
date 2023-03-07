# Usa una imagen de Node.js 16.13.1
FROM node:16.13.1-alpine

# Configura el directorio de trabajo en /usr/src/app
WORKDIR /usr/src/app

# Copia los archivos del proyecto a la imagen
COPY . .

# Instala las dependencias
RUN npm install
RUN npm install webpack -g


# Expone el puerto 2023
EXPOSE 2023

# Inicia la aplicación
CMD ["npm", "start"]
