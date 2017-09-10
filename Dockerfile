FROM nginx:alpine
ADD ./build /var/www/
ADD ./nginx.default.conf /etc/nginx/conf.d/default.conf
