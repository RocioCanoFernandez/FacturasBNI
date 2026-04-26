# Base image
FROM node:18-alpine as builder

# Set working directory
WORKDIR /app

# Copy package files and install ALL dependencies (including devDependencies like Vite)
COPY package.json package-lock.json ./
RUN npm install

# Copy all source files
COPY . .

# Build the project
RUN npm run build

# Production image using a lightweight static server (Nginx)
FROM nginx:alpine

# Copy built assets from builder phase to Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy a default nginx configuration to handle React Router properly
RUN echo 'server { \
    listen       80; \
    server_name  localhost; \
    location / { \
        root   /usr/share/nginx/html; \
        index  index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
    error_page   500 502 503 504  /50x.html; \
    location = /50x.html { \
        root   /usr/share/nginx/html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
