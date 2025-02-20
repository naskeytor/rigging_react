# Usa una imagen de Node.js oficial
FROM node:18-alpine

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app/frontend

# Copiar archivos del proyecto
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto de Vite
EXPOSE 5173

# Comando por defecto para iniciar la app
CMD ["npm", "run", "dev"]