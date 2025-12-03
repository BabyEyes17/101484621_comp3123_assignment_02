FROM node:18 AS build

WORKDIR /app

# Build args must be declared BEFORE using them
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Build React app with env injected
RUN npm run build

# ---------- NGINX ----------
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
