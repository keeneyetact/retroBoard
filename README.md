# retro-board

This is a Retrospective Idea board, powering [retrospected.com](http://www.retrospected.com).

It features the following technologies:

* React
* Redux
* Socket IO
* Webpack
* Hot-reloading
* Material UI design
* Modular CSS

## How to run for production

* Clone this repository
* `npm i` to install the dependencies (Node 4+, NPM 3+)
* `npm run build` to build everything (client and server)
* `NODE_ENV=production PORT=8080 node run.js` to run the server on port 8080

## How to run for development

* Clone this repository
* `npm i` to install the dependencies (Node 4+, NPM 3+)
* Open another terminal (you need two of those)
* `npm run start-server` on the first terminal to start the server bit
* `npm run start-ui` on the second terminal, to run live webpack with hot-reload
* Open your browser on [http://localhost:8081]


## Verions history

### Version 0.1.0
