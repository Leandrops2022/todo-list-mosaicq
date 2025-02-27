# Frontend Dockerfile
FROM node:20.15.0

WORKDIR /app

# Copy package.json and package-lock.json for caching
COPY package*.json ./

# Install frontend dependencies
RUN npm ci

# Copy frontend source code
COPY . .

# Build frontend 
RUN npm run build

# Serve frontend with a lightweight server
CMD ["npx", "serve", "-s", "dist", "-l", "5173"]

# Expose frontend port
EXPOSE 5173  
