FROM debian:stretch-slim

WORKDIR /alles/

mkdir data configs certificates log

COPY ./dist_electron ./dist_electron

COPY ./certificates ./certificates

COPY ./data ./data

COPY ./configs ./configs

CMD ["./dist_electron/electron-panel-1.0.0.AppImage"]
