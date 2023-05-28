FROM ubuntu:20.04 AS builder

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install --no-install-recommends -y \
    libopenjp2-tools \
    ca-certificates \
    gnupg \
    rpm \
    curl \
    build-essential \
    curl \
    bison \
    python3

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -

#RUN curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor | tee /usr/share/keyrings/yarnkey.gpg >/dev/null

#RUN echo "deb [signed-by=/usr/share/keyrings/yarnkey.gpg] https://dl.yarnpkg.com/debian stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update && apt-get install --no-install-recommends -y nodejs 
#yarn

WORKDIR /app/

COPY . ./

RUN npm install

RUN npm run electron:build

#RUN yarn install --network-timeout 100000

#RUN yarn electron:build

#
FROM debian:stretch-slim AS run

WORKDIR /alles/

COPY --from=builder /app/dist_electron ./dist_electron

COPY --from=builder /app/certificates ./certificates

COPY --from=builder /app/data ./data

COPY --from=builder /app/configs ./configs

COPY --from=builder /app/dist_electron .

CMD ["./dist_electron/electron-panel-1.0.0.AppImage"]
