FROM  node:16.20-buster-slim

WORKDIR /alles/electron

COPY . .

RUN npm install

RUN npx electron-builder --dir --armv7l --linux deb

CMD ["bash"]
