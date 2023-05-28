
##
FROM node:16.19 AS build

WORKDIR /app

COPY . .

RUN rm -rf node_modules yarn.lock package-lock.json

RUN npm config rm http-proxy
RUN npm config rm https-proxy

RUN yarn config delete proxy
RUN yarn config delete https-proxy

RUN yarn cache clean

#RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y -qq --no-install-recommends \
#    libopenjp2-tools \
#    ca-certificates \
#    gnupg \
#    rpm \
#    curl \
#    build-essential \
#    bison \
#    python3

#RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -

#RUN curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor | tee /usr/share/keyrings/yarnkey.gpg >/dev/null

#RUN echo "deb [signed-by=/usr/share/keyrings/yarnkey.gpg] https://dl.yarnpkg.com/debian stable main" | tee /etc/apt/sources.list.d/yarn.list

#RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y -qq --no-install-recommends nodejs yarn

#RUN yarn config delete proxy

#RUN npm config rm https-proxy

#RUN npm config rm proxy

#RUN npm config set registry "https://registry.npmjs.org"

RUN yarn --network-timeout 300000

RUN yarn electron:armbuild

##
FROM debian:stretch-slim

WORKDIR /alles

RUN mkdir -p dist_electron data configs certificates log

COPY --from=build ./dist_electron ./dist_electron

COPY ./certificates ./certificates

COPY ./data ./data

COPY ./configs ./configs

CMD ["./dist_electron/electron-panel-1.0.0-arm64.AppImage"]
