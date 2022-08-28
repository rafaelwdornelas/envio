#!/bin/bash

DOMINIO="$1"
echo "Nome do Dominio: $DOMINIO"
echo $DOMINIO > /etc/hostname
echo "127.0.1.2  $DOMINIO" >> /etc/hosts
echo $DOMINIO > /etc/mailname
sudo hostname $DOMINIO
sudo hostnamectl set-hostname $DOMINIO
sudo apt-get install software-properties-common
sudo apt-get update
sudo apt install bind9 bind9utils bind9-doc  -y
sudo systemctl restart bind9
sudo apt-get install zip unzip  -y
sudo apt-get install apache2  -y
sudo service apache2 restart
sudo apt install snapd
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
sudo certbot -n --agree-tos --email adm@$DOMINIO --standalone certonly -d $DOMINIO
sudo postconf -e smtpd_tls_cert_file=/etc/letsencrypt/live/$DOMINIO/fullchain.pem
sudo postconf -e smtpd_tls_key_file=/etc/letsencrypt/live/$DOMINIO/privkey.pem
sudo postconf -e smtpd_use_tls=yes
sudo DEBIAN_FRONTEND=noninteractive apt-get install postfix  -y
debconf-set-selections <<< "postfix postfix/main_mailer_type string 'internet sites'"
debconf-set-selections <<< "postfix postfix/mailname string $DOMINIO"
sudo apt-get install mutt  -y
sudo apt install mailutils  -y
sudo apt install nodejs npm -y
openssl genrsa -out dkim_private.pem 2048
openssl rsa -in dkim_private.pem -pubout -outform der 2>/dev/null | openssl base64 -A > dkim_public.txt
sudo apt-get install git -y 
git clone https://github.com/rafaelwdornelas/envio.git  && cd envio && npm i
node dns.js
sudo /etc/init.d/apache2 restart
sudo /etc/init.d/postfix restart
history -c
echo "INSTALAÇÂO CONCLUIDA"
