# 使用官方的 Node.js 镜像作为基础镜像
FROM node:18-alpine as builder

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY . .

# 安装依赖
RUN npm install --legacy-peer-deps

# 构建生产环境
RUN npm run build:pro

# 使用 Nginx 作为生产服务器
FROM nginx:latest

# 复制构建的文件到 Nginx 的默认目录
COPY --from=builder /app/dist /usr/share/nginx/html/prod/user-manager

# 复制 Nginx 配置文件
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 5000

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
