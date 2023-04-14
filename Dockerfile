FROM  python:3.7.6-slim-stretch

ENV DEBIAN_FRONTEND=noninteractive

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && apt-get install -y nodejs

WORKDIR /alles/electron

COPY . .

RUN npm install

RUN npx electron-builder --dir --armv7l --linux deb

CMD ["bash"]
