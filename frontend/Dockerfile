FROM node:alpine

RUN mkdir -p /opt/app
RUN apk add --no-cache libc6-compat
ENV NODE_ENV production
ENV PORT 3000
EXPOSE 3000

WORKDIR /opt/app
COPY . /opt/app

RUN npm --production=false install && npm run build && npm run storybook:build

CMD [ "npm", "start" ]