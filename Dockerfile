# Build
FROM node:gallium-alpine3.17 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

## Deploy
FROM nginx:1.21.0-alpine as production

ENV NODE_ENV production

# Copy built assets from `build` image
COPY --from=build /app/dist /usr/share/nginx/html

# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN ls /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]