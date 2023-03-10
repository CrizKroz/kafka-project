# Usa una imagen de Node.js 16.13.1
FROM node:16.13.1

# Configura el directorio de trabajo en /usr/src/app
WORKDIR /usr/src/app

# Copia los archivos del proyecto a la imagen
COPY . .

# Instala las dependencias
RUN npm install
RUN npm install webpack -g


# Expone el puerto 3000
EXPOSE 3000

# Inicia la aplicación
CMD ["npm", "start"]
