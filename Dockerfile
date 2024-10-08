# 使用官方 Node.js 运行时作为基础镜像
FROM node:alpine

# 设置工作目录
WORKDIR /usr/src/app

# 将 npm 和 yarn 包安装缓存卷起来
VOLUME ["/tmp"]

# 将当前目录内容复制到容器的 /usr/src/app 中
COPY . .

# 安装依赖包
RUN npm ci
# RUN yarn install --production # 如果使用的是 yarn

# 构建项目
RUN npm run build:pro
# RUN yarn build # 如果使用的是 yarn

# 将端口暴露出来
EXPOSE 5000

# 启动应用
CMD ["npm", "start"]
# CMD ["yarn", "start"] # 如果使用的是 yarn
