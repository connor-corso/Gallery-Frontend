# Help from here https://www.knowledgehut.com/blog/web-development/how-to-dockerize-react-app

#Stage 1
FROM node:20 as builder
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent 
RUN npm install -g --silent  --ignore-engines
COPY . ./
RUN npm run build  --ignore-engines



#Stage 2
FROM nginx:stable-alpine

COPY nginx.crt /etc/nginx/ssl/nginx.crt
COPY nginx.key /etc/nginx/ssl/nginx.key


COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 443

ENTRYPOINT ["nginx",  "-g", "daemon off;"]