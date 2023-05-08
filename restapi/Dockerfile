FROM node:18.13.0
LABEL org.opencontainers.image.source https://github.com/Arquisoft/lomap_es3b
COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm install
#Compilar desde typescript a javascript (Se genera la salida en el directorio build)
RUN npm run build
# La siguiente línea optimiza node.js para entornos de producción
ENV NODE_ENV production 
#Ejecutar en producción
CMD ["node", "build/server.js"]cd 
