# Node LTS - v12.13.0
FROM node:erbium-slim
ENV NODE_ENV development
# Expose port 1337
EXPOSE 1337
# Create directory if not exists
RUN mkdir -p /usr/src/app
# Directory in the image filesystem
WORKDIR /usr/src/app
# Copy project to /usr/src/app/
COPY . /usr/src/app/
# Install & run
RUN npm run start