# 使用 Node 作为基础镜像
FROM node:20
# 设置工作目录
WORKDIR /usr/src/app
# 复制项目文件到工作目录
COPY . .
# 安装依赖
RUN npm install
# 构建项目
RUN npm run build
# 暴露端口
EXPOSE 3000
# 启动应用
CMD ["npm", "run", "serve"]
