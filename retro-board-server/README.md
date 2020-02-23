openssl req -nodes -new -x509 -keyout server.key -out server.cert

https://www.freecodecamp.org/news/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec/



openssl req -x509 -new -nodes -key rootCA.key -sha256 -days 10240 -out rootCA.pem

sudo cp ./rootCA.pem /usr/local/share/ca-certificates/rootCA.crt

dpkg-reconfigure ca-certificates. /etc/ssl/certs