# Use the Node.js 18 LTS image as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your API gateway listens on
EXPOSE 3000

# Command to start the server
CMD ["node", "docker-server.js"]
