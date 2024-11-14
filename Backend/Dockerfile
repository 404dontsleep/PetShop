# Use Node.js base image
FROM node:18

# Set working directory in container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose backend port
EXPOSE 5000

# Run the backend server
CMD ["npm", "run", "dev"]
