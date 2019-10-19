FROM node:alpine

RUN mkdir -p /opt/app
RUN apk add --no-cache libc6-compat
ENV NODE_ENV production
ENV PORT 4098
EXPOSE 4098

WORKDIR /opt/app
COPY . /opt/app

RUN npm --production=false install && npm run build

CMD [ "npm", "start" ]