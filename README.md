# SURFBS
--------
### (Survival Free Black Slack)
--------

SURFBS est un chatroom privé destiné à être hébergé sur un raspberry pi connecté à une box internet. Il devra être auto-suffisant, ne pas utiliser de CDN et un minimum de frameworks. Pour l'instant nous avons choisi d'utiliser MariaDB pour la base de donnée, NodeJS avec [Express] et la librairie [MariaDB] (connexion avec la db) pour le back end et pour que le front soit responsive et pas trop moche, nous utiliserons le framework css [Skeleton].

## Base de donnée
### MariaDB
Tables:
* convives ()
* sujets
* repliques (ambigu)

La base de donnée et les tables seront créées par un script createdb.js au lancement.

## Back end
### NodeJS + Express


## Front end
### Skeleton



[Express]: http://expressjs.com/en/4x/api.html
[MariaDB]: https://mariadb.com/kb/en/getting-started-with-the-nodejs-connector/
[Skeleton]: http://getskeleton.com/