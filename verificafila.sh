#!/bin/sh
while true;do
clear
cat /var/log/mail.log | perl ./pflogsumm.pl | more
sleep 1
done

