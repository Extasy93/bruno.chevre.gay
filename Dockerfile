FROM httpd:2.4

COPY ./ /usr/local/apache2/htdocs/

WORKDIR /usr/local/apache2 

CMD ["httpd-foreground"] 