# Use Node.js image
FROM node:22-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Build TypeScript code
RUN npm run build

# Expose port (match your Express port, e.g., 5000)
EXPOSE 5000

# Start the server
CMD ["npm", "run", "start"]