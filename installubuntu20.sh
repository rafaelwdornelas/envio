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
sudo DEBIAN_FRONTEND=noninteractive apt-get install postfix  -y
debconf-set-selections <<< "postfix postfix/main_mailer_type string 'internet sites'"
debconf-set-selections <<< "postfix postfix/mailname string $DOMINIO"
sudo mkdir /etc/postfix/ssl
sudo openssl req -nodes -newkey rsa:2048 -keyout $DOMINIO.key -out $DOMINIO.csr
sudo mv $DOMINIO.key /etc/postfix/ssl/
sudo mv $DOMINIO.csr /etc/postfix/ssl/
sudo postconf -e smtpd_tls_cert_file=/etc/postfix/ssl/$DOMINIO.key
sudo postconf -e smtpd_tls_key_file=/etc/postfix/ssl/$DOMINIO.crt
sudo postconf -e smtpd_use_tls=yes
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
