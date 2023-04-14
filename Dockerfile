FROM  node:16-alpine

WORKDIR /alles/electron

COPY . .

RUN npm install

RUN npx electron-builder --dir --armv7l --linux deb

CMD ["npm", "start"]
