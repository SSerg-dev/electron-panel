FROM  python:3.7.6-slim-stretch

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install --no-install-recommends -y \
    curl rpm libopenjp2-tools \
    build-essential clang libdbus-1-dev libgtk-3-dev \
    libnotify-dev libgnome-keyring-dev \
    libasound2-dev libcap-dev libcups2-dev libxtst-dev \
    libxss1 libnss3-dev gperf bison python-dbusmock

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && apt-get install -y nodejs

WORKDIR /alles/electron

COPY . .

RUN npm install

RUN npx electron-builder --dir --armv7l --linux deb

CMD ["bash"]
