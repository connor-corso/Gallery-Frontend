# Help from here https://www.knowledgehut.com/blog/web-development/how-to-dockerize-react-app

#Stage 1
FROM node:20 as builder
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

#Stage 2
FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
#COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

ENTRYPOINT ["nginx",  "-g", "daemon off;"]