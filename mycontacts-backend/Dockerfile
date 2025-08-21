# Use Node.js 18 (Alpine variant for smaller size)
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install dependencies using npm ci for reproducibility
RUN npm ci --only=production

# Copy the rest of the source code
COPY . .

# Expose application port
EXPOSE 5000

# Run the application
CMD ["npm", "start"]
