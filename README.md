# retro-board

This is a Retrospective Idea board, powering [retrospected.com](http://www.retrospected.com).

![Retrospected.com](/content/screenshot.png?raw=true "Retrospected.com")

It features the following technologies:

* React
* Redux
* Socket IO
* Webpack
* Hot-reloading
* Material UI design
* Modular CSS
* redux-saga
* Multilingual / Internationalization


## How to run for production (or to try it out)

* Clone this repository
* `npm i` to install the dependencies (Node 4+, NPM 3+)
* `npm run build` to build everything (client and server) (`npm run build-win` on Windows)
* `npm start` to run the server on port 8080 (`npm run start-win` on Windows)
* Open your browser on [http://localhost:8080](http://localhost:8080)


## How to run for development

* Clone this repository
* `npm i` to install the dependencies (Node 4+, NPM 3+)
* Open another terminal (you need two of those)
* `npm run start-server` on the first terminal to start the server bit
* `npm run start-ui` on the second terminal, to run live webpack with hot-reload
* Open your browser on [http://localhost:8081](http://localhost:8081)


## How to use Google Analytics

By default, Google Analytics is deactivated (it doesn't even get build into the bundle).

To enable it, create a configuration file by copying `/config/configuration_template.json` to `/config/configuration.json`, and set it up by pasting your GA tracking ID, and setting the other setting to true, then rebuild.

Note: Google Analytics only works when using the production webpack config.


## Roadmap

* Persistence: Improve by using a dependency-less MongoDB clone (NeDB for instance)
* Add more languages
* Use ES7 decorators
* Changing the logic for the Like and Unlike buttons


## Versions history

### Version 0.2.0

* Multilingual: support for English, French and Hungarian
* Using `redux-saga` instead of `redux-thunk`
* Persistence: Simple persistence to disk (no database needed)
* Support for Google Analytics (with precise events monitoring)
* Ability to logout, and to leave a session
* Improve the reliability of the clients list (currently connected users)
* Fix issues when the web fonts can't load (firewall blocking for example)

### Version 0.1.1

* Minor visual tweaks
* Better console logs, server side
* Big clean up of un-used files and old libs

### Version 0.1.0

* First production version
* Basic functionalities are there and working
* Login
* Creating a session
* Joining a session
* Adding new posts
* Like / Unlike posts
* Ability to delete our own posts
* List of connected users
* No persistence (yet)

## Thanks

Many thanks to the following contributors who helped translating the app:

* Hungarian: [@iaretiga](https://github.com/iaretiga)
* Portuguese (Brazilian): [@renancouto](https://github.com/renancouto)

If you are a native speaker of another language, please don't hesitate to make a pull request to add a translation.

I'm looking for German, Chinese and Spanish translations.
