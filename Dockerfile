FROM docker-registry-oss.yifen7.cn/env/node-base:latest

WORKDIR /data1/admin/app

COPY ./package.json /data1/admin/app
RUN npm install --production

COPY ./ /data1/admin/app
RUN npm run build

EXPOSE 8080

CMD npm start