# Simulateur de cofinancement du Pass Numérique

![](https://societenumerique.gouv.fr/wp-content/uploads/2018/01/logomarianne_typo-sombre.png)


Ce dépôt est l'application [Symfony](http://symfony.com) et 
[Preact](https://github.com/developit/preact) qui propulse le 
simulateur de cofinancement du Pass Numérique par la Mission Société Numérique.

L'objectif était de permettre aux collectivités territoriales de connaître rapidement le taux de co-financement auquel elles sont éligibles et de télécharger un document de synthèse des résultats à fournir afin de faciliter l'instruction des dossiers. Le simulateur est accessible en [suivant ce lien](https://www.societenumerique.gouv.fr/archive-pass/)

## Documentation de l'algorithme

Le taux de co-financement auquel les collectivités territoriales sont éligibles est calculé par l'application en fonction de critères décrits dans le [document suivant](https://github.com/SocieteNumerique/pass-numerique/blob/master/Documentation/app_pass(1).pdf/) et réplicables avec la [feuille de calcul suivante](https://github.com/SocieteNumerique/pass-numerique/blob/master/Documentation/fichiersimulation.xlsx).

## Capture d'écran


![](https://github.com/SocieteNumerique/pass-numerique/raw/master/Documentation/passnum.gif)

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

Ce projet est un fork du projet simuletataxe.fr développé de manière open-source et accessible dans le repository suivant :
[github.com/EnMarche/simuletataxe.fr](https://github.com/EnMarche/simuletataxe.fr).

Ce projet est de plus basé sur plusieurs projets open-source sans lesquels il ne pourrait pas avoir vu le jour :

* [Preact](https://github.com/developit/preact) et [Preact Router](https://github.com/developit/preact-router)
* [Webpack Encore](https://github.com/symfony/webpack-encore), [Webpack](https://github.com/webpack/webpack) et [Babel](https://github.com/babel/babel)
* [Twitter's twemoji](https://github.com/twitter/twemoji)
* [Docker](https://github.com/docker/docker-ce)
