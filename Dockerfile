# Use lightweight Alpine image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy backend source code
COPY backend/ .

# Expose backend port (change if needed)
EXPOSE 5000

# Run server
CMD ["node", "server.js"]
