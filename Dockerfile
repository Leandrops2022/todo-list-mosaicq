FROM node:20.15.0
WORKDIR /app
COPY package*.json ./
RUN npm ci 
COPY dist ./dist
COPY swagger.yaml ./
EXPOSE 3000
CMD ["node", "dist/index.js"]