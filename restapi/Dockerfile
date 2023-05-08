FROM node:18.13.0
LABEL org.opencontainers.image.source https://github.com/Arquisoft/lomap_es3b
COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm install
#Ejecutar en producción
CMD ["npm", "start"] 
