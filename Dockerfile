FROM  ubuntu:20.04 AS builder

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y \
    build-essential \
    clang \
    libdbus-1-dev \
    libgtk-3-dev \
    libnotify-dev \
    libasound2-dev \
    libcap-dev \
    libcups2-dev \
    libxtst-dev \
    libxss1 \
    libnss3-dev \
    gcc-multilib \
    g++-multilib curl \
    gperf \
    bison \
    python3-dbusmock \
    openjdk-8-jre

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && apt-get install -y nodejs
RUN curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor | tee /usr/share/keyrings/yarnkey.gpg >/dev/null
RUN echo "deb [signed-by=/usr/share/keyrings/yarnkey.gpg] https://dl.yarnpkg.com/debian stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y yarn

WORKDIR /app/

COPY . ./

RUN yarn || true

RUN sed -i 's/\"dependencies\".*/\"dependencies\" : \{\},/' ./node_modules/accounting/package.json

RUN yarn

RUN npx electron-builder --dir --armv7l --linux deb


FROM debian:stretch-slim

WORKDIR /root/

COPY --from=builder /app/dist/ ./

CMD ["bash"]
