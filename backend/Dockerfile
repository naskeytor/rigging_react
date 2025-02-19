# Usa Python 3.9 como base
FROM python:3.9

# Establece el directorio de trabajo
WORKDIR /app/backend

# Instala las dependencias sin copiar el código
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Expone el puerto 5000
EXPOSE 5000

# Ejecuta Flask en modo desarrollo con recarga automática
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000", "--reload"]

