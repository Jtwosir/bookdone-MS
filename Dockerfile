# 使用官方的 Node.js 运行时作为父镜像
FROM node:16

# 设置工作目录
WORKDIR /app

# 复制所有源代码到容器中
COPY . .

# 使用npm安装依赖
RUN npm install --legacy-peer-deps

# 构建应用
RUN npm run build:pro

# 生产环境运行时使用的Node.js镜像
#FROM node:16

# 复制构建好的应用到新的运行时容器中
#COPY --from=build-stage /app/dist ./dist

# 使用 Nginx 镜像作为运行时镜像
FROM nginx:latest

# 将 Vite 项目的 dist 目录复制到 Nginx 的默认静态文件目录
COPY --from=0 /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/

# 设置端口
#EXPOSE 5000

# 启动命令
#CMD ["npm", "run", "serve"]
