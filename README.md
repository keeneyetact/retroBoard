# retro-board

[![Build Status](https://travis-ci.org/antoinejaussoin/retro-board.svg?branch=develop)](https://travis-ci.org/antoinejaussoin/retro-board)
![GitHub package.json version](https://img.shields.io/github/package-json/v/antoinejaussoin/retro-board)

This is a Retrospective Idea board, powering [retrospected.com](http://www.retrospected.com).

&nbsp;

<p align="center">
  <img src="./content/logos/react.png" height="65">
  &nbsp;
  <img src="./content/logos/ts.png" height="65">
  &nbsp;
  <img src="./content/logos/docker.png" height="65">
  &nbsp;
  <img src="./content/logos/k8s.svg" height="65">
  &nbsp;
  <img src="./content/logos/socketio.png" height="65">
</p>

![Retrospected.com](/content/screenshot-v4.jpeg?raw=true 'Retrospected.com')

This project is both an actual product, and also a technology demo using the latest and greatest JavaScript/TypeScript libraries of the month.

It features the following technologies:

- [React 17](https://github.com/facebook/react)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [React Router 4](https://github.com/ReactTraining/react-router)
- [TypeScript 4](https://www.typescriptlang.org/)
- [Recoil.js](https://recoiljs.org), as the global state management library
- [Socket IO](http://socket.io)
- [Webpack 4](https://github.com/webpack/webpack) (See older versions for Webpack 1, 2 and 3)
- [MUI 5](https://mui.com) for our components (previously known as Material-UI)
- [Material UI design](https://www.google.com/design/spec/material-design/introduction.html)
- [Emotion](https://emotion.sh/docs/introduction)
- [Multilingual](https://stackoverflow.com/questions/33413880/react-redux-and-multilingual-internationalization-apps-architecture) / Internationalization
- [Postgres](https://www.postgresql.org/)
- [Node 16](https://nodejs.org/en/)
- [Passport](http://www.passportjs.org/) for seamless OAuth authentication with:
  - Google
  - Twitter
  - GitHub
  - Slack
  - Microsoft
  - Okta
- [Giphy](https://giphy.com/) because adding a bit of fun to your retro can't hurt!
- [React Beautiful DND](https://github.com/atlassian/react-beautiful-dnd) to allow re-ordering and grouping by drag-and-drop
- [Jest](https://facebook.github.io/jest) for Unit Testing
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro), for Integration Tests
- [Yarn](https://yarnpkg.com/en/), replacing NPM
- [Docker](https://docker.com), for easy deployment
- [Kubernetes](https://kubernetes.io/), to scale Retrospected for its 10M+ users (not)
- [GitHub Actions](https://github.com/features/actions), for Continuous Integration and Deployment (CI/CD)
- [Multi-Architecture](https://github.com/docker/buildx/), for automatic compatibility with ARM-based servers
- [Stripe](https://stripe.com/), for our payment solution
- [Docusaurus](http://docusaurus.io/), for our documentation

Previous versions, up to v1.0.1 featured the following libraries:

- ~~[Redux](https://github.com/reactjs/redux)~~
- ~~[CSS Modules](https://github.com/css-modules/css-modules)~~
- ~~[redux-saga](https://github.com/yelouafi/redux-saga)~~
- ~~[reselect](https://github.com/reactjs/reselect)~~
- ~~[ESLint](http://eslint.org/) for JS and JSX~~

## Documentation 📖

You can browse the documentation [here](https://docs.retrospected.com).

## Using Retrospected 🚀

You have two ways of running Retrospected:

- Using the public version, at [www.retrospected.com](https://www.retrospected.com)
- Host Retrospected [on your premises](https://docs.retrospected.com/docs/self-hosting/quick-start)

## Want to host Retrospected on your premises? 🖥

You can start an instance of Retrospected in 5 minutes by following the [quick-start guide](https://docs.retrospected.com/docs/self-hosting/quick-start).

This will run a demo version, which you can turn into a fully licenced version by purchasing a [Self Hosted licence](https://www.retrospected.com/subscribe?product=self-hosted).

## Versions History

### Version 4.11.1 (hotfix)

- Reverting the migration from react-scripts (create-react-app) 5.0.0 to 4.0.3. The new version includes Webpack 5, which causes issues with polyfills. The issue should be fixed in 5.0.1 which is not available yet.

### Version 4.11.0

- Adding a chat functionality. Send messages to your colleagues without having to use Slack or any other external tool!
- Add the author (when the "Show Author" option is enabled) in the summary panel.  👏 Thanks [@hmlkao](https://github.com/hmlkao) for the idea. ([#336](https://github.com/antoinejaussoin/retro-board/issues/336)).
- Deprecate Yarn Workspaces to limit dependency sharing
- ⏫ Upgrade most dependencies for security reasons
- Upgrade Nginx image to fix security issues
- Force secure cookies on production
- Add Trivy vulnerability scanner on CI

### Version 4.10.0

- Add better GDPR compliance, with the right to be forgotten: allows a user to delete all of their data
- Add the ability for users to signal if they are done with their posts, to help the moderator
- ⏫ Upgrading dependencies

### Version 4.9.0

- Brand new [documentation website](https://docs.retrospected.com).
- Migrate all docker images from `antoinejaussoin/retro-board-*` to `retrospected/*`.
- Allowing Self-Hosted instances to use SendGrid for email recovery
- 🐛 The Unlimited subscription domain check was not accepting valid domains such as `.ventures` or `.agency`.

### Version 4.8.0

- Upgrade to MUI 5.0 (ex Material UI)
- Migration from Styled Components to Emotion (for compatibility reasons with MUI)
- Add hard-coded self-hosting licence mechanism for companies with restricted internet access
- ⏫ Upgrading dependencies

### Version 4.7.2

- Replacing Google OAuth passport library, to try and reduce Google OAuth errors on production
- Added a script to make bumping versions easier
- ⏫ Upgrading dependencies

### Version 4.7.1 (hotfix)

- 🐛 Fixed a bug highlighted by Sentry, where anonymous account without a password would trigger an exception.

### Version 4.7.0

- Account Federation: all accounts with the same email address are now a unique account (sharing sessions, etc.). If you owned multiple accounts with the same email address (for instance one via Google OAuth and another via GitHub), they will be merged into a single account.
- CSRF protection
- Significant performance improvements on retrieving past sessions (10x to 100x)
- Add the ability for anonymous users to delete the boards they created under certain conditions ([#229](https://github.com/antoinejaussoin/retro-board/issues/229)).
- ⏫ Upgrading dependencies

### Version 4.6.1

- Fixing a typo. 👏 Thanks Chad S.! ([#296](https://github.com/antoinejaussoin/retro-board/issues/296))

### Version 4.6.0

- Support OKTA for authentication
- Speeding up the migration on production (using transpiled JavaScript instead of TypeScript via ts-node)
- Making email checks for Pro Team subscriptions case-insensitive. 👏 Thanks Nico! ([#287](https://github.com/antoinejaussoin/retro-board/issues/287))

### Version 4.5.0

- Adding the ability to self-host Retrospected in a very easy way.
- Change the default order for new posts. New posts are now (by default) appearing at the top of the column. 👏 Thanks [@konrad44](https://github.com/konrad44) for the idea. ([#272](https://github.com/antoinejaussoin/retro-board/issues/272))
- Upgrade containers from Node 15 to Node 16
- Spelling fixes on home page cards
- ⏫ Upgrading dependencies

### Version 4.4.0

- 🐛 Fixed a bug where the export button on the summary page was hidden by the participants bar. 👏 Thanks [@hieuwu](https://github.com/hieuwu) for pointing this out. ([#262](https://github.com/antoinejaussoin/retro-board/issues/262))
- Added the ability to collapse groups (hidding their content). 👏 Thanks to Sultan S. for the suggestion. ([#263](https://github.com/antoinejaussoin/retro-board/issues/263))
- Added the possibility for deployements where the backend has a single instance (no replicas) to not use Redis with Socket.IO.
- Fixed a bug that would trigger the rate limiting when adding posts to groups, triggering a disconnection
- ⏫ Upgrading dependencies

### Version 4.3.0

- Add the ability to restrict the number of posts per user on a given session (as an option).
- Rename some folders in the repository to more sensible names
- Prevent the UI from sending more than 100 Sentry errors, to avoid spamming Sentry.

### Version 4.2.2

- Add a better check for self-hosted licences.
- ⏫ Upgrading dependencies

### Version 4.2.1

- Search now also works with the author's name, if the author is displayed. 👏 Thanks [@ayxos](https://github.com/ayxos) for pointing this out. ([#202](https://github.com/antoinejaussoin/retro-board/issues/202))
- Replacing the reducer logic with Recoil for global state management.
- Adding the possibility of creating a post by clicking on the 'return' icon (⮐) instead of hitting "Enter". 👏 Thanks to [@do606](https://github.com/do606) for pointing out that Enter doesn't always seem to work ([#246](https://github.com/antoinejaussoin/retro-board/issues/246)).
- Re-adding the ability of creating a post by hitting Enter on a numeric pad. 👏 Thanks again to [@do606](https://github.com/do606) for that.
- ⏫ Upgrading dependencies

### Version 4.2.0

- Add a page explaining how local encryption works
- Re-introducing rate limiting, both for the REST API and the Websocket connections, in Node and Nginx
- Reduce the quantity of data sent over Websockets (for instance, only sending post ID instead of whole post when voting)
- Reduce the number of SQL queries on the backend, simplifying the backend logic
- Return an error message to the UI if a Websocket message doesn't succeed
- Improve websocket reconnection logic
- Upgrading to Socket.IO 4.0
- ⏫ Upgrading dependencies
- 🐛 The participants footer was sometimes hidden by the blur overlay of a post. 👏 Thanks [@Pajinell](https://github.com/Pajinell) for pointing this out. ([#240](https://github.com/antoinejaussoin/retro-board/issues/240))
- 👏 Thanks to [@cindyccook](https://github.com/cindyccook) for pointing out reliability issues ([#232](https://github.com/antoinejaussoin/retro-board/issues/232)).

### Version 4.1.4 (hotfix)

- 🐛 Language loading issues

### Version 4.1.3 (hotfix)

- 🐛 New users were wrongly added with a quota of 0

### Version 4.1.2 (hotfix)

- 🐛 Fixed a bug with local storage

### Version 4.1.1 (hotfix)

- 🐛 Fixed a bug where Slack OAuth was disabled

### Version 4.1.0

- Adding a 30-day trial
- Adding Microsoft OAuth 2.0
- Code splitting: all pages have their own bundle now, for a faster first-load experience
- Removing all `import React from 'react';` imports, as they are now redundant.
- Introducing Recoil.js (as an experiment)
- Limiting the number of posts to 50 for free accounts

### Version 4.0.5

- 🐛 Fixed a bug whereby adding multiple cards on a single group wouldn't work correctly (only the first card would be persisted in that group). 👏 Thanks to Daniel N. for reporting this by email.

### Version 4.0.4

- 🐛 Fixed a bug where adding an action was changing ownership of the post to the person adding the action. 👏 Thanks [@botactic](https://github.com/botactic)! ([#209](https://github.com/antoinejaussoin/retro-board/issues/209))
- Use TypeORM transactions for every database interactions, fixing some random races conditions.
- Improving multi-arch support
- Improving API calls and Sentry

### Version 4.0.3

- 🐛 Fixed a bug where groups couldn't be deleted if you didn't create them in the first place.

### Version 4.0.2

- 🚨 Emergency fix, for a serious bug that made it seem like a lot of people were participant to your session. This was never the case, it was displaying every non-logged in people as spectators to your session erroneously.

### Version 4.0.1

- Added the list of participants to the bottom of the screen 🧑‍💻
- Added a notification on connection or disconnection of participants 🟢 🔴
- Update OAuth photo on every login
- Replaced GitHub OAuth library by a more recent version, to avoid deprecated GitHub API.
- 🐛 Fixed a bug where the author of a new session wasn't registered as a participant
- 🐛 Fixed a bug where online participants were not showing

### Version 4.0.0

- [⭐️ Pro Feature] Encrypted Sessions: full client-side encryption of your data
- [⭐️ Pro Feature] Private Sessions: ensure only your colleagues can access your session
- Full support for password-based accounts
- Slack Authentication (OAuth) 🔑
- Replacing Travis by GitHub Actions for CI and Deployment 🚀
- New Freemium model
- Adding dynamic HTML title for better browser experience. 👏 Thanks [@sam-pires](https://github.com/sam-pires)! ([#167](https://github.com/antoinejaussoin/retro-board/issues/167))
- Adding a search functionality to find the needle in your haystack. 👏 Thanks [@ayxos](https://github.com/ayxos) for the suggestion! ([#171](https://github.com/antoinejaussoin/retro-board/issues/171))
- Improving the Post component to hide up/down votes when they are disabled. Also got rid of the "flippable" panel,
  all actions are now visible directly. 👏 Thanks [@Xyaren](https://github.com/Xyaren) for pointing this out. ([#150](https://github.com/antoinejaussoin/retro-board/issues/150))
- Automatic Backend code linting, and CI linting
- ⏫ Upgrade to TypeScript 4
- ⏫ Upgrade to React 17
- ⏫ Upgrade to Create-React-App 4
- ⏫ Upgrade to Socket.IO 3.0
- 👏 A big thanks to [@wooddar](https://github.com/wooddar) for beta-testing and his great feedback!

### Version 3.2.3

- Fixed a bug with GitHub authentication, where the display name was not set ([#165](https://github.com/antoinejaussoin/retro-board/pull/165)). 👏 Thanks [@hieuwu](https://github.com/hieuwu)!

### Version 3.2.2

- 🐛 Fixed a bug where any user editing the name of the session would become owner of the session.

### Version 3.2.1

- 🐛 Fixed a serious bug under Firefox, where users could not see the content of the post ([#154](https://github.com/antoinejaussoin/retro-board/issues/154), [#148](https://github.com/antoinejaussoin/retro-board/issues/148)). 👏 Thanks to all people who reported this ([@Xyaren](https://github.com/Xyaren), [@dallasgutauckis](https://github.com/dallasgutauckis), [@courtney-thwaites](https://github.com/courtney-thwaites)).

### Version 3.2.0

- 🇮🇹 Improved Italian translation (👏 Thanks [@mventuri](https://github.com/mventuri))
- Ability to delete sessions, if you are authenticated and you are the author of the session ([#116](https://github.com/antoinejaussoin/retro-board/issues/116))
- Allow changing the default language for new users via environement variables ([#135](https://github.com/antoinejaussoin/retro-board/issues/135))
- Allow a moderator to blur cards written by others, to keep everything hidden until the end of the retrospective ([#100](https://github.com/antoinejaussoin/retro-board/issues/100))
- Complete redesign of the Custom Session settings modal
- Ability to modify session settings once the game has started. This is only available to the session moderator (author) ([#92](https://github.com/antoinejaussoin/retro-board/issues/92)).
- Ability to display past sessions for Anonymous users. This is limited to viewing past sessions on the same browser, any login to a different browser will create a different anonymous account, for safety reasons ([#112](https://github.com/antoinejaussoin/retro-board/issues/112)).
- ⏫ Dependencies update

### Version 3.1.1

- 🇳🇱 Improved Dutch translation (👏 Thanks [@jghaanstra](https://github.com/jghaanstra))
- ⏫ Dependencies update

### Version 3.1.0

- Multi-architecture support! Hello Rasperry Pi 🍇 🎉! And Apple Silicon 🍎
- Docker images are automatically compatible with ARM (arm64, v6, v7, v8)

### Version 3.0.3

- 🐛 Bug fix: [Issue 121](https://github.com/antoinejaussoin/retro-board/issues/121), [Issue 123](https://github.com/antoinejaussoin/retro-board/issues/123)
- ⏫ Dependencies update

### Version 3.0.2

- Adding privacy policy, terms and conditions, GDPR support
- 🐛 Fix various bugs reported by Sentry

### Version 3.0.1

- Improvements on the landing page experience
- SEO

### Version 3.0.0

- Brand new landing page, and much improved look and feel 🎉
- Authentication using your favourite social media account:
  - GitHub
  - Google
  - Twitter
  - ...more coming!
- Ability to re-order posts by drag-and-drop 🚀
- Ability to group posts together
- Save your custom session settings as a default template
- Giphy support 😃
- Improved homepage dashboard 📈

### Version 2.2.4

- 🇷🇺 Russian Translation improvements (👏 Thanks [@regmagik](https://github.com/regmagik))
- Fixing logout button translation
- Adding fetch polyfill for IE
- ⏫ Upgrading dependencies

### Version 2.2.3

- 🇮🇹 Italian Translation (👏 Thanks [@mventuri](https://github.com/mventuri))
- Re-enabling source maps for Sentry
- ⏫ Upgrading dependencies

### Version 2.2.2

- Allowing a user to disable voting (by setting the max number of votes to 0) (👏 Thanks [@imranismail](https://github.com/imranismail))
- Fixing an issue with Docker and Yarn's installation
- ⏫ Upgrading dependencies

### Version 2.2.1

- Adding Sentry support for the backend
- Making Google Analytics and Sentry configurable at run-time (as in Docker run-time)
- Adding Copy to clipboard compatibility for more browsers
- Preventing the app from crashing when cookies are disabled on Firefox
- Handling disconnections better by not reconnecting automatically and displaying a message instead.

### Version 2.2.0

- Kubernetes configs. Deploy Retrospected to the cloud! ☁️ 🚀 ☸️
- Making the backend scalable by making SocketIO use Redis to communicate between instances. This is disabled by default
  and is only useful for Kubernetes deployments.
- The backend hostname is now configurable on the nginx config on the frontend.
- Replaced all occurences of `withRouter` by `useHistory` and `useParams`
- Added CI/CD support with Travis
- Auto-deployment of Docker images to Docker Hub
- Changing the UX related to Summary Mode
- Added the ability to copy the content of the session in the clipboard, both in Markdown format and Rich Text
- Added Error Boundaries to improve the user experience if the app crashes
- Added support for Sentry.io (error logging)
- Fixed an issue where multiline content was not displayed properly for anyone except the author
- Fixed an issue where a post couldn't be deleted if it had votes attached to it
- [Issue 56](https://github.com/antoinejaussoin/retro-board/issues/56) - Fixed an issue where new users who were not persisted yet couldn't vote (👏 Thanks [@dkistner](https://github.com/dkistner))

### Version 2.1.4

- 🇩🇪 German Translation (👏 Thanks [@PaulBrandt](https://github.com/PaulBrandt))
- 🐛 Bugfix: First post was sometimes not saved on regular sessions

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

- MS Windows support/fixes (👏 Thanks [@srraf](https://github.com/srraf)).
- [PR-48](https://github.com/antoinejaussoin/retro-board/pull/48) - Fixed a word-wrapping issue when we have only one (long) post (👏 Thanks [@manicmaniac](https://github.com/manicmaniac)).
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
- ⏫ Upgraded dependencies
- 👏 Special thanks to [@jesusabp](https://github.com/jesusabp), [@zalexki](https://github.com/zalexki) and [@jfritz](https://github.com/jfritz) for their inputs and ideas!

### Version 2.0.4

- ⏫ Upgraded dependencies
- Allows multi-line posts and comments (use the shift key to add a new line) (👏 Thanks [@andyk314](https://github.com/andyk314))
- Re-adding Hot Reload, which now works great with TypeScript and Create-React-App.

### Version 2.0.3

- ⏫ Upgraded dependencies
- Fixed an issue with Docker eating too much space with its unlimited log size. Log is now limited to 50mb.

### Version 2.0.2

- Added an "Action" field on each Post: this allows the user to define a list of actions that need doing in the next sprint, and allows displaying this list in the Summary Mode.
- 🐛 Bugfix: In certain conditions, some race-condition would store a post with a null session ID (so the post was lost forever).
- 🐛 Bugfix: Disabled the Web Worker, as it's not working properly when loading a game directly (and not loading the homepage).

### Version 2.0.1

- Adding support for Postgres migrations
- Adding created/updated fields on Post and Session
- 🐛 Bugfix: Summary mode wasn't ordered by votes anymore. (👏 Thanks [@cindyccook](https://github.com/cindyccook))

### Version 2.0.0

- Complete rewrite
- TypeScript
- React Hooks
- @testing-library/react
- New component library (MaterialUI)
- Docker-friendly

### Version 1.0.1

- 🇯🇵 Japanese Translation (👏 Thanks [@sat0yu](https://github.com/sat0yu))
- Simplified the ESLint configuration
- Introducing Prettier (`yarn format`)
- ⏫ Upgrading to Babel 7

### Version 1.0.0

- React 16
- Webpack 4 (for previous versions of webpack, see below)
- Using [@bionikspoon/react-toolbox](https://github.com/bionikspoon/react-toolbox) instead of the original `react-toolbox`, as the project is no longer maintained and doesn't work with React 16.
- ⏫ Upgraded all the other dependencies, everything should be up-to-date
- Improved the home screen

### Version 0.10.0

- Webpack 3 (for Webpack 2, look at version 0.9.0)
- Converting entire project to 2-space indentation
- ⏫ Upgrade other dependencies
- 🇵🇱 Polish Translation (👏 Thanks [@olaf-cichocki](https://github.com/olaf-cichocki))
- 🇦🇪 Arabic Translation (👏 Thanks [@Meshredded](https://github.com/Meshredded))
- Improved the loading screen

### Version 0.9.0

- Webpack 2 (for Webpack 1, look at version 0.8.1 and older)
- React 15.5 (which needs the new `prop-types` module, among other things)
- React Router 4 (completely different way of doing the routing)
- Move the structure of the project to a modular structure
- ⏫ Upgraded all the other dependencies to the latest versions, except `react-toolbox`

### Version 0.8.1

- Hotfix (ESLint errors on production build)

### Version 0.8.0

- Using [redux-saga-testing](https://github.com/antoinejaussoin/redux-saga-testing) to test sagas
- 🇹🇼🇨🇳 Chinese (Traditional and Simplified) Translation (👏 Thanks [@aqutw](https://github.com/aqutw))
- Using [Yarn](https://yarnpkg.com/en/)
- ⏫ Updating dependencies
- Fixing some Spanish translation mistakes (👏 Thanks @MrPolymath)
- 🐛 Fixed a bug where the Vote buttons would allow a user to vote multiple times (on the UI only)

### Version 0.7.0

- Good test coverage, using Jest
- 🇷🇺 Russian Translation (👏 Thanks [@vectart](https://github.com/vectart))
- 🇪🇸 Spanish Translation (👏 Thanks [@andresin87](https://github.com/andresin87))
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

- 🐛 Fixed a bug on the anti-spam when if using a proxy (nginx for instance), the wrong ip was used
- 🐛 Fixed a bug where the linting would fail if the default configuration was used (👏 Thanks @veselignome)

### Version 0.5.1

- Full support of [ESLint](http://eslint.org/), based on [AirBnB rules](https://github.com/airbnb/javascript)
- Adding an anti-spam for SocketIO, because someone is having fun crashing my server (thanks!)

### Version 0.5.0

- Adding the possibility to join a previously joined session quickly (👏 Thanks [@Sonaryr](https://github.com/Sonaryr))
- Performance improvement on title edit (Also thanks to @Sonaryr 👏)
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
- 🇳🇱 Internationalisation: added Dutch to the list of supported languages (👏 Thanks [@Sonaryr](https://github.com/Sonaryr))

### Version 0.3.0

- Adding support for more robust databases (NeDB, by default, in process, and MongoDB)
- Change to the Like / Unlike logic: a user can now only vote once, and not for his own posts
- Change to the Like / Unlike logic: like and unlikes counts are separated
- Adding ES7 decorators, more readable than the previous curry-ed functions
- Better support for Windows
- 🇧🇷 Internationalisation: added Brazilian Portuguese to the list of supported languages (👏 Thanks [@renancouto](https://github.com/renancouto))

### Version 0.2.0

- Using `redux-saga` instead of `redux-thunk`
- Persistence: Simple persistence to disk (no database needed)
- Support for Google Analytics (with precise events monitoring)
- Ability to logout, and to leave a session
- Improve the reliability of the clients list (currently connected users)
- Fix issues when the web fonts can't load (firewall blocking for example)
- 🇬🇧 🇫🇷 🇭🇺 Internationalisation: support for English, French and Hungarian (👏 Thanks [@iaretiga](https://github.com/iaretiga))

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

## Thanks 👏

Many thanks to the following contributors who helped translating the app:

- Hungarian: [@iaretiga](https://github.com/iaretiga)
- Portuguese (Brazilian): [@renancouto](https://github.com/renancouto)
- Dutch: [@Sonaryr](https://github.com/Sonaryr), [@jghaanstra](https://github.com/jghaanstra)
- Russian: [@vectart](https://github.com/vectart), [@regmagik](https://github.com/regmagik)
- Spanish: [@andresin87](https://github.com/andresin87)
- Chinese: [@aqutw](https://github.com/aqutw)
- Polish: [@olaf-cichocki](https://github.com/olaf-cichocki)
- Arabic: [@Meshredded](https://github.com/Meshredded)
- Japanese: [@sat0yu](https://github.com/sat0yu)
- German: [@PaulBrandt](https://github.com/PaulBrandt)
- Italian: [@mventuri](https://github.com/mventuri)

If you are a native speaker of another language, please don't hesitate to make a pull request to add a translation.

Special thanks to [@andresin87](https://github.com/andresin87) for pointing the `flag-icon-css` package to me, it replaces the PNG flags in a neater way.

Another special thanks to Browserstack, as they allow me to test this project in other browsers.

<a href="https://www.browserstack.com/"><img src="./content/browserstack.png" width="300" height="65"></a>

Please make your PRs from the **develop** branch, not **master**.
