# Teambuilding feedback app #

## Synopsis
Mobile app to gather data from teambuilding attenders using adjustable questionnaires.

## Motivation
The app is invented during a research project that is carried out by Business Academy Aarhus, http://www.baaa.dk/.

## Installation
Download and run the app inside the Meteor development framework.

## API Reference
Data is stored in a Mongo database, https://www.mongodb.com/
Application interface is established by the Meteor framework, https://www.meteor.com/

## License
See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).

## Deploy
DEPLOY_HOSTNAME=us-east-1.galaxy-deploy.meteor.com meteor deploy --settings settings-galaxy.json https://teambuilding-app.meteorapp.com

## Build mobile apps
rm -Rf ~/tmp/teambuilding/* ; meteor build ~/tmp/teambuilding --server https://teambuilding-app.meteorapp.com:443 --debug

