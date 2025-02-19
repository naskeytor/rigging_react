# Usa Node.js 18 como base
FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia solo package.json y package-lock.json para instalar dependencias
COPY package.json package-lock.json ./
RUN npm install

# Exponer el puerto 3000
EXPOSE 3000

# Ejecutar React en modo desarrollo con hot reload
CMD ["npm", "start"]
