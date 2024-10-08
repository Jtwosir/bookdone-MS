FROM node:20.4
WORKDIR /usr/src/app
# 不再需要全局安装 serve，除非你的项目确实需要它
COPY package.json ./
RUN npm install --production
COPY . .
RUN npm run build:pro
EXPOSE 5000
CMD ["npm", "start"]
