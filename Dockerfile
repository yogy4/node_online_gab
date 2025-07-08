
FROM node:18.11.0
# ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

# RUN npm install --production
RUN npm install
COPY . .
# RUN npm run start
EXPOSE 8080
# CMD [ "node", "index.js" ]
CMD [ "node run start" ]