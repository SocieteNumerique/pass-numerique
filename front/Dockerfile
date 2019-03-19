FROM nginx:alpine

RUN apk add --no-cache nodejs=10.14.2-r0 yarn=1.12.3-r0 nano

# Build
COPY . /src
RUN cd /src && yarn install && yarn run prod

# Prepare nginx and built assets
COPY docker/nginx.conf /etc/nginx/nginx.conf
RUN cp -R /src/public /app && rm -rf /src
