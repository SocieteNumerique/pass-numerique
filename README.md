# Simulateur de cofinancement du Pass Numérique

Ce repository est l'application [Symfony](http://symfony.com) et 
[Preact](https://github.com/developit/preact) qui propulse le 
simulateur de cofinancement du Pass Numérique par l'État.

## Utilisation

Ce projet utilise [Docker](https://docs.docker.com/install/) et [Docker-Compose](https://docs.docker.com/compose/install/).

Pour démarrer, lancez les containers:

```
# N'hésitez pas à modifier le fichier copié docker-compose.override.yaml à vos besoins
$ cp docker-compose.override.yaml.dist docker-compose.override.yaml

$ docker-compose up -d
```

Une fois les containers lancés, vous pouvez lancer le serveur de développement dans le container `front`:

```
docker-compose exec front yarn dev
```

Puis accédez à [http://localhost](http://localhost).

## Remerciements

Ce projet est un fork du projet simuletataxe.fr développé de manière open-source par En Marche :
[github.com/EnMarche/simuletataxe.fr](https://github.com/EnMarche/simuletataxe.fr).

Ce projet est de plus basé sur plusieurs projets open-source sans lesquels il ne pourrait pas avoir vu le jour :

* [Preact](https://github.com/developit/preact) et [Preact Router](https://github.com/developit/preact-router)
* [Webpack Encore](https://github.com/symfony/webpack-encore), [Webpack](https://github.com/webpack/webpack) et [Babel](https://github.com/babel/babel)
* [Twitter's twemoji](https://github.com/twitter/twemoji)
* [Docker](https://github.com/docker/docker-ce)
