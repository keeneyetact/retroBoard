# retro-board

This is a Retrospective Idea board, powering [retrospected.com](http://www.retrospected.com).

![Retrospected.com](/content/screenshot-v2.png?raw=true 'Retrospected.com')

This project is both an actual product, and also a technology demo using the latest and greatest JavaScript/TypeScript libraries of the month.

It features the following technologies:

- [React 16](https://github.com/facebook/react)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [React Router 4](https://github.com/ReactTraining/react-router)
- [Mono Repo / Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces)
- [TypeScript](https://www.typescriptlang.org/)
- [Hot-reloading](https://github.com/gaearon/react-hot-loader)
- [Socket IO](http://socket.io)
- [Webpack 4](https://github.com/webpack/webpack) (See older versions for Webpack 1, 2 and 3)
- [Material UI design](https://www.google.com/design/spec/material-design/introduction.html)
- [Styled Components](https://www.styled-components.com/)
- [Multilingual](https://stackoverflow.com/questions/33413880/react-redux-and-multilingual-internationalization-apps-architecture) / Internationalization
- [Postgres](https://www.postgresql.org/) (optional), defaults to [NeDB](https://github.com/louischatriot/nedb) (in-process)
- [Jest](https://facebook.github.io/jest) for Unit Testing
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro), for Integration Tests
- [Yarn](https://yarnpkg.com/en/), replacing NPM
- [Docker](https://docker.com), for easy deployment

Previous versions, up to v1.0.1 featured the following libraries:

- ~~[Redux](https://github.com/reactjs/redux)~~
- ~~[CSS Modules](https://github.com/css-modules/css-modules)~~
- ~~[redux-saga](https://github.com/yelouafi/redux-saga)~~
- ~~[reselect](https://github.com/reactjs/reselect)~~
- ~~[ESLint](http://eslint.org/) for JS and JSX~~

## Prerequisites

- `Yarn`: Please install [Yarn](https://yarnpkg.com/en/), as this mono-repo uses **Yarn Workspaces** which won't work with NPM.

## How to try it out (Mac/Linux)

- Clone this repository
- Switch to the `master` branch (the default is `develop` which might not be stable: `git checkout master`)
- `yarn` to install the dependencies (_not_ `npm i`!)
- `yarn start` to transpile the server, run the server on port 8080 and start the UI
- Open your browser on [http://localhost:3000](http://localhost:3000)

## How to try it out (Windows)

Follow the steps in "How to run for development" below.

## How to run for development

- Clone this repository
- `yarn` to install the dependencies (_not_ `npm i`!)
- Open another terminal (you need two of those, and the order is important)
- `yarn start-ui` on the first terminal to run live Webpack with hot-reload
- `yarn start-server` on the second terminal to start the backend
- Open your browser on [http://localhost:3000](http://localhost:3000)

## How to run for Production using Docker

### Prerequisites

You must have `docker` and `docker-compose` installed on your system.

### Result

This will install a production-ready version of Retrospected automatically, using Postgres. You don't need to have anything installed other than Docker. This will install and run:

- Postgres
- pgAdmin4 (Web UI for postgres)
- The Retrospected Nodejs backend
- The frontend, served by `nginx`.

### Installation

- Copy `docker-compose.yml.example` to `docker-compose.yml`
- Edit the file to set some passwords etc. You can also set your Google Analytics ID to enable Google Analytics tracking. You can also leave the file "as-is", it has sensible defaults.
- Run `docker-compose build`: this will build the backend and frontend images, based on your settings.
- Get yourself a coffee ☕️
- Run `docker-compose up -d`
- Voilà!

### Backups

When using the Docker deployment, your database runs from a container. But if you still need to make some backup of your data, you can do the following:

- Get the docker database image ID by doing: `docker ps`
- Run `` docker exec -t <docker_image_id> pg_dumpall -c -U postgres > dump_`date +%d-%m-%Y"_"%H_%M\_%S`.sql ``
- To restore your databases: `cat dump_1234.sql | docker exec -i <docker_image_id> psql -U postgres`

## How to run the tests

- Clone this repository
- `yarn` to install the dependencies (_not_ `npm i`!)
- `npm test` to run the tests
- **or** `yarn test-watch` to run the tests every time you change a file

## How to use Google Analytics

By default, Google Analytics is deactivated (it doesn't even get built into the bundle).

To enable it, you'll need to create a local `.env` file in `./retro-board-app/env.local` by copy-pasting the existing `.env` file in the same directory. To enable Google Analytics, simply add your GA Tracking ID like so: `REACT_APP_GA_ID=UA-&2345678-1`.

Note: Google Analytics only works when using the production webpack config (i.e. when `NODE_ENV` is set to `production`).

## How to use Postgres (w/o Docker)

By default, the database engine is NeDB, an in-process database with no external dependencies (i.e. no database to install on your system).

If you want to use a more "production-ready" database such as Postgres (without Docker), copy `.env.example` to `.env`, change `DB_TYPE` to `postgres` and fill the rest.

## How to debug

### Debugging the client

- Run both client and server normally (`yarn start-server` and `yarn start-ui`)
- From the browser window where the website is open, open the Chrome Dev tools
- Go on the **Sources** tab, and on the left, find your sources under `webpack://` and then `.`.
- You can then put breakpoints in there and debugging

## Roadmap

- Adding a real (but optional) login mechanism (Google/GitHub etc.)
- Highlight posts where the user voted

## Versions history

### Version 2.1.3

- IE fix: the previous polyfill didn't quite work with IE9 to IE11.

### Version 2.1.2

- Older browser support (IE11, somewhat works with IE10 and IE9).
- Adding an "outdated browser" warning
- Adding a remaining votes counter when using a maximum number of votes rule.
- Changing how Editable Labels work: they now only fire onChange on blur or Enter, minimizing the amount of traffic over the socket
- Removing the REACT_APP_DEBUG environment variable (using NODE_ENV instead).
- Adding a loading spinner while loading the game now that we can't predict which number of columns are going to appear on screen.
- Making sure index.html is not cached by Nginx on production
- Removing .map files on production

### Version 2.1.1

- MS Windows support/fixes (Thanks [@srraf](https://github.com/srraf)).
- [PR-48](https://github.com/antoinejaussoin/retro-board/pull/48) - Fixed a word-wrapping issue when we have only one (long) post (Thanks [@manicmaniac](https://github.com/manicmaniac)).
- Fixes a possible race-condition issue with "vote" syncing.

### Version 2.1.0

- Adding full customisation of columns and rules:
  - You can now create a board with 1 to 5 columns
  - You can allow a user to vote for his own posts
  - You can allow multiple votes on the same post
  - You can limit the number of up and down votes
  - You can choose to display the name of the author, and the name of the persons who vote
- Your language selection is now remembered between sessions
- Various UI fixes:
  - Login modal improvements
  - Editable label improvements
- Various Docker improvements
- Upgraded dependencies
- Special thanks to [@jesusabp](https://github.com/jesusabp), [@zalexki](https://github.com/zalexki) and [@jfritz](https://github.com/jfritz) for their inputs and ideas!

### Version 2.0.4

- Upgraded dependencies
- Allows multi-line posts and comments (use the shift key to add a new line) (Thanks [@andyk314](https://github.com/andyk314))
- Re-adding Hot Reload, which now works great with TypeScript and Create-React-App.

### Version 2.0.3

- Upgraded dependencies
- Fixed an issue with Docker eating too much space with its unlimited log size. Log is now limited to 50mb.

### Version 2.0.2

- Added an "Action" field on each Post: this allows the user to define a list of actions that need doing in the next sprint, and allows displaying this list in the Summary Mode.
- Bugfix: In certain conditions, some race-condition would store a post with a null session ID (so the post was lost forever).
- Bugfix: Disabled the Web Worker, as it's not working properly when loading a game directly (and not loading the homepage).

### Version 2.0.1

- Adding support for Postgres migrations
- Adding created/updated fields on Post and Session
- Bugfix: Summary mode wasn't ordered by votes anymore. (thanks [@cindyccook](https://github.com/cindyccook))

### Version 2.0.0

- Complete rewrite
- TypeScript
- React Hooks
- @testing-library/react
- New component library (MaterialUI)
- Docker-friendly

### Version 1.0.1

- Japanese Translation (thanks [@sat0yu](https://github.com/sat0yu))
- Simplified the ESLint configuration
- Introducing Prettier (`yarn format`)
- Upgrading to Babel 7

### Version 1.0.0

- React 16
- Webpack 4 (for previous versions of webpack, see below)
- Using [@bionikspoon/react-toolbox](https://github.com/bionikspoon/react-toolbox) instead of the original `react-toolbox`, as the project is no longer maintained and doesn't work with React 16.
- Upgraded all the other dependencies, everything should be up-to-date
- Improved the home screen

### Version 0.10.0

- Webpack 3 (for Webpack 2, look at version 0.9.0)
- Converting entire project to 2-space indentation
- Upgrade other dependencies
- Polish Translation (thanks [@olaf-cichocki](https://github.com/olaf-cichocki))
- Arabic Translation (thanks [@Meshredded](https://github.com/Meshredded))
- Improved the loading screen

### Version 0.9.0

- Webpack 2 (for Webpack 1, look at version 0.8.1 and older)
- React 15.5 (which needs the new `prop-types` module, among other things)
- React Router 4 (completely different way of doing the routing)
- Move the structure of the project to a modular structure
- Upgraded all the other dependencies to the latest versions, except `react-toolbox`

### Version 0.8.1

- Hotfix (ESLint errors on production build)

### Version 0.8.0

- Using [redux-saga-testing](https://github.com/antoinejaussoin/redux-saga-testing) to test sagas
- Chinese (Traditional and Simplified) Translation (Thanks [@aqutw](https://github.com/aqutw))
- Using [Yarn](https://yarnpkg.com/en/)
- Updating dependencies
- Fixing some Spanish translation mistakes (Thanks @MrPolymath)
- Fixed a bug where the Vote buttons would allow a user to vote multiple times (on the UI only)

### Version 0.7.0

- Good test coverage, using Jest
- Russian Translation (Thanks [@vectart](https://github.com/vectart))
- Spanish Translation (Thanks [@andresin87](https://github.com/andresin87))
- Replacing PNG flags by SVG/CSS versions
- Using `react-hot-loader` 3.0.0 (beta2) for Hot reloading
- Fixing a few mobile/responsive issues

### Version 0.6.1

- React-toolbox 1.0.0
- Debugging instructions

### Version 0.6.0

- Added the ability to edit existing posts inline (posts you wrote)
- Adding a new Invite button to simplify and explain how to invite other people
- Removing the snackbar
- Removing ES7 decorators, as they are not standard yet
- Removing hash on CSS and JS on production (not necessary since we have the version number)

### Version 0.5.2

- Fixed a bug on the anti-spam when if using a proxy (nginx for instance), the wrong ip was used
- Fixed a bug where the linting would fail if the default configuration was used (thanks @veselignome)

### Version 0.5.1

- Full support of [ESLint](http://eslint.org/), based on [AirBnB rules](https://github.com/airbnb/javascript)
- Adding an anti-spam for SocketIO, because someone is having fun crashing my server (thanks!)

### Version 0.5.0

- Adding the possibility to join a previously joined session quickly (Thanks [@Sonaryr](https://github.com/Sonaryr))
- Performance improvement on title edit (Also thanks to @Sonaryr)
- New Logo!
- Added Favicons

### Version 0.4.1

- Updated the screenshot on the readme
- package.json version updated properly this time

### Version 0.4.0

- Improved the "Create Session" page, allows a user to create a session with a custom name
- Ability to edit that session name in real-time (by anyone)
- Added a "Summary Mode": this gives a summary of a current session, allowing a user to copy-paste the entire content easily
- New shorter session IDs
- New look-and-feel (new colours)
- Using [reselect](https://github.com/reactjs/reselect) to create memoized selectors
- Improving performance by using `shouldComponentUpdate` via a custom base [Component](app/Component.jsx)
- Updated to the brand new React 15
- Improving Windows support by allowing Windows users to use the same commands as \*nix users
- Internationalisation: added Dutch to the list of supported languages (Thanks [@Sonaryr](https://github.com/Sonaryr))

### Version 0.3.0

- Adding support for more robust databases (NeDB, by default, in process, and MongoDB)
- Change to the Like / Unlike logic: a user can now only vote once, and not for his own posts
- Change to the Like / Unlike logic: like and unlikes counts are separated
- Adding ES7 decorators, more readable than the previous curry-ed functions
- Better support for Windows
- Internationalisation: added Brazilian Portuguese to the list of supported languages (Thanks [@renancouto](https://github.com/renancouto))

### Version 0.2.0

- Using `redux-saga` instead of `redux-thunk`
- Persistence: Simple persistence to disk (no database needed)
- Support for Google Analytics (with precise events monitoring)
- Ability to logout, and to leave a session
- Improve the reliability of the clients list (currently connected users)
- Fix issues when the web fonts can't load (firewall blocking for example)
- Internationalisation: support for English, French and Hungarian (Thanks [@iaretiga](https://github.com/iaretiga))

### Version 0.1.1

- Minor visual tweaks
- Better console logs, server side
- Big clean up of un-used files and old libs

### Version 0.1.0

- First production version
- Basic functionalities are there and working
- Login
- Creating a session
- Joining a session
- Adding new posts
- Like / Unlike posts
- Ability to delete our own posts
- List of connected users
- No persistence (yet)

## Frequently Asked Questions

#### What if I want to name my session so I can remember easily how to come back to it?

You can actually change the session ID in the URL with anything you like: for example [www.retrospected.com/game/hello_world](http://www.retrospected.com/game/hello_world)

Try not to take a too common name though, to avoid anyone else finding your session by chance.

## Thanks

Many thanks to the following contributors who helped translating the app:

- Hungarian: [@iaretiga](https://github.com/iaretiga)
- Portuguese (Brazilian): [@renancouto](https://github.com/renancouto)
- Dutch: [@Sonaryr](https://github.com/Sonaryr)
- Russian: [@vectart](https://github.com/vectart)
- Spanish: [@andresin87](https://github.com/andresin87)
- Chinese: [@aqutw](https://github.com/aqutw)
- Polish: [@olaf-cichocki](https://github.com/olaf-cichocki)
- Arabic: [@Meshredded](https://github.com/Meshredded)
- Japanese: [@sat0yu](https://github.com/sat0yu)

If you are a native speaker of another language, please don't hesitate to make a pull request to add a translation.
I'm especially looking for a German translation.

Special thanks to [@andresin87](https://github.com/andresin87) for pointing the `flag-icon-css` package to me, it replaces the PNG flags in a neater way.

Another special thanks to Browserstack, as they allow me to test this project is other browsers.

<a href="https://www.browserstack.com/"><img src="./content/browserstack.png" width="300" height="65"></a>

Please make your PRs from the **develop** branch, not **master**.
