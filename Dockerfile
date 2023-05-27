FROM ubuntu:20.04 AS builder

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y \
    build-essential \
    clang \
    cmake \
    libdbus-1-dev \
    libgtk-3-dev \
    libnotify-dev \
    libasound2-dev \
    libcap-dev \
    libcups2-dev \
    libxtst-dev \
    libxss1 \
    libnss3-dev \
    curl \
    gperf \
    bison \
    python3-dbusmock \
    openjdk-8-jre

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -

RUN curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor | tee /usr/share/keyrings/yarnkey.gpg >/dev/null

RUN echo "deb [signed-by=/usr/share/keyrings/yarnkey.gpg] https://dl.yarnpkg.com/debian stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update && apt-get install -y nodejs yarn

WORKDIR /app/

COPY . ./

RUN yarn

RUN yarn electron:build

FROM debian:stretch-slim

WORKDIR /alles/

COPY --from=builder /app/dist_electron ./dist_electron

COPY --from=builder /app/certificates ./certificates

COPY --from=builder /app/data ./data

COPY --from=builder /app/configs ./configs

CMD ["./dist_electron/electron-panel-1.0.0-arm64.AppImage"]
