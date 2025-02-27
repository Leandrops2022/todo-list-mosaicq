# Backend Dockerfile
FROM node:20.15.0

WORKDIR /app

# Copy package.json and package-lock.json first for efficient caching
COPY package*.json ./

# Install backend dependencies
RUN npm ci

# Copy the rest of the backend files
COPY . .

# Expose backend port
EXPOSE 3000

# Start the backend server
CMD ["node", "dist/index.js"]
