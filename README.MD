## Start DB
docker run --name couchdb bitnami/couchdb:latest
docker container start couchdb

curl -sSL https://raw.githubusercontent.com/bitnami/containers/main/bitnami/couchdb/docker-compose.yml > docker-compose.yml
docker-compose up -d

## Set-Up 
.env file

## Use application
### Install dependencies 
type npm i into /front and back/miroservices/read

## Build Application
type npm run build into /front and back/miroservices/read

## Start Application
type npm run dev into /front and back/miroservices/read

## Next steps
- Implement unity tests
- docker
- kubernets
- production model
- CI/CD
