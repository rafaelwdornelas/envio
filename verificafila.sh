#!/bin/sh
while true;do
clear
cat /var/log/mail.log | ./pflogsumm.pl | more
sleep 1
done

