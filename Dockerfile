# Use the official PHP image with built-in server
FROM php:8.2-cli

# Set working directory
WORKDIR /app

# Copy all project files
COPY . /app

# Expose port 8000
EXPOSE 8000

# Start PHP built-in server on port 8000, using index.php as router
CMD ["php", "-S", "0.0.0.0:8000", "index.php"]
