# retro-board

This is a Retrospective Idea board, powering [retrospected.com](http://www.retrospected.com).

![Retrospected.com](/content/screenshot-v4.png?raw=true "Retrospected.com")

It features the following technologies:

* [React](https://github.com/facebook/react)
* [Redux](https://github.com/reactjs/redux)
* [Socket IO](http://socket.io)
* [Webpack](https://github.com/webpack/webpack)
* [Hot-reloading](https://webpack.github.io/docs/hot-module-replacement.html)
* [Material UI design](https://www.google.com/design/spec/material-design/introduction.html)
* [Modular CSS](https://github.com/css-modules/css-modules)
* [redux-saga](https://github.com/yelouafi/redux-saga)
* [reselect](https://github.com/reactjs/reselect)
* [Multilingual](https://stackoverflow.com/questions/33413880/react-redux-and-multilingual-internationalization-apps-architecture) / Internationalization
* [MongoDB](https://www.mongodb.org/) (optional), defaults to [NeDB](https://github.com/louischatriot/nedb) (in-process)
* ES7 [decorators](https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841#.1p78pdaao)
* [ESLint](http://eslint.org/) for JS and JSX


## How to run for production (or to try it out)

* Clone this repository
* `npm i` to install the dependencies (Node 4+, NPM 3+)
* `npm run build` to build everything (client and server)
* `npm start` to run the server on port 8080
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


## How to use MongoDB

By default, the database engine is NeDB, an in-process database with no external dependencies (i.e. no database to install on your system).

If you want to use a more "production-ready" database such as MongoDB, create the configuration file as explained above and set `DB_Use_Mongo` to `true`. You will of course need an instance of MongoDB running on your system for that to work.


## How to enable SocketIO anti-spam

It's very easy to abuse a SocketIO connection, by running some code in your console and doing `io.emit('spam')` in an infinite loop to create a DOS attack on the server.

To enable a rate-limiting fix for this attack, set `Use_Anti_Spam` to `true` in the config file.

## How to debug

### Debugging the server

* Run `npm run start-server-debug`
* Don't forget to start the client side as well `npm run start-ui`
* A Chrome Dev tool will open, wait a bit until it finishes loading
* It will break at the first line of code, so once it's there, click continue
* Then wait a bit (could be 20-30 seconds) for the code to run and the server to work properly
* From now on, you can set up a breakpoint anywhere in the Chrome Dev tools and it should work.
* Happy debugging!

### Debugging the client

* Run both client and server normally (`npm run start-server` and `npm run start-ui`)
* From the browser window where the website is open, open the Chrome Dev tools
* Go on the **Sources** tab, and on the left, find your sources under `webpack://` and then `.`.
* You can then put breakpoints in there and debugging


## Roadmap

* Add more languages
* Unit tests
* GraphQL

## Versions history

### Version 0.6.1

* React-toolbox 1.0.0
* Debugging instructions

### Version 0.6.0

* Added the ability to edit existing posts inline (posts you wrote)
* Adding a new Invite button to simplify and explain how to invite other people
* Removing the snackbar
* Removing ES7 decorators, as they are not standard yet
* Removing hash on CSS and JS on production (not necessary since we have the version number)

### Version 0.5.2

* Fixed a bug on the anti-spam when if using a proxy (nginx for instance), the wrong ip was used
* Fixed a bug where the linting would fail if the default configuration was used (thanks @veselignome)

### Version 0.5.1

* Full support of [ESLint](http://eslint.org/), based on [AirBnB rules](https://github.com/airbnb/javascript)
* Adding an anti-spam for SocketIO, because someone is having fun crashing my server (thanks!)

### Version 0.5.0

* Adding the possibility to join a previously joined session quickly (Thanks @Sonaryr)
* Performance improvement on title edit (Also thanks to @Sonaryr)
* New Logo!
* Added Favicons

### Version 0.4.1

* Updated the screenshot on the readme
* package.json version updated properly this time

### Version 0.4.0

* Improved the "Create Session" page, allows a user to create a session with a custom name
* Ability to edit that session name in real-time (by anyone)
* Added a "Summary Mode": this gives a summary of a current session, allowing a user to copy-paste the entire content easily
* New shorter session IDs
* New look-and-feel (new colours)
* Using [reselect](https://github.com/reactjs/reselect) to create memoized selectors
* Improving performance by using `shouldComponentUpdate` via a custom base [Component](app/Component.jsx)
* Updated to the brand new React 15
* Improving Windows support by allowing Windows users to use the same commands as \*nix users
* Internationalisation: added Dutch to the list of supported languages

### Version 0.3.0

* Adding support for more robust databases (NeDB, by default, in process, and MongoDB)
* Change to the Like / Unlike logic: a user can now only vote once, and not for his own posts
* Change to the Like / Unlike logic: like and unlikes counts are separated
* Adding ES7 decorators, more readable than the previous curry-ed functions
* Better support for Windows
* Internationalisation: added Brazilian Portuguese to the list of supported languages

### Version 0.2.0

* Using `redux-saga` instead of `redux-thunk`
* Persistence: Simple persistence to disk (no database needed)
* Support for Google Analytics (with precise events monitoring)
* Ability to logout, and to leave a session
* Improve the reliability of the clients list (currently connected users)
* Fix issues when the web fonts can't load (firewall blocking for example)
* Internationalisation: support for English, French and Hungarian

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

## Frequently Asked Questions

#### What if I want to name my session so I can remember easily how to come back to it?

You can actually change the session ID in the URL with anything you like: for example [www.retrospected.com/session/hello_world](http://www.retrospected.com/session/hello_world)

Try not to take a too common name though, to avoid anyone else finding your session by chance.

You can also use the "Advanced" tab when creating a session, and provide a name.

## Thanks

Many thanks to the following contributors who helped translating the app:

* Hungarian: [@iaretiga](https://github.com/iaretiga)
* Portuguese (Brazilian): [@renancouto](https://github.com/renancouto)
* Dutch: [@Sonaryr](https://github.com/Sonaryr)

If you are a native speaker of another language, please don't hesitate to make a pull request to add a translation.
