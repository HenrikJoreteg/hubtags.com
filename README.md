# HubTags.com

Live site: [http://hubtags.com](http://hubtags.com/)

Sample app built using [Ampersand.js](http://ampersandjs.com/) using [React](http://facebook.github.io/react/) as a view layer.

This app lets you log in with GitHub and view/edit labels for your repos.

It's compiled into a completely static site and deployed to [HubTags.com](http://hubtags.com/) staticly using [Surge.sh](http://surge.sh/).

## Running it

You'll need [Node.js](http://nodejs.org/) installed first.

To get download and install everything:

```
git clone https://github.com/HenrikJoreteg/hubtags.com.git
cd hubtags.com
npm install
```

To run in development mode:

```
npm start
```

When you run it using `npm start` it will be in development mode which means styles and React components are hotloaded without needing any browser extensions, simply make changes in your editor and save.

To build:

```
npm run build
```

When you run `npm run build` a static site gets created ins `/public` which can be deployed to surge using `npm run yolo` (You'll have to change the domain option in `package.json` to run that script since you don't have permission to deploy to the production domain).

## Attempting to simplify dev experience

As much as possible, I'm trying to make the tools get out of our way.

Just run `npm start`, write your code in the `src` directory (feel free to use ES6 and JSX), and run a simple deploy script to go live.

## Features/Tools

At the end of the day, the goal of all this is to optimize the experience of developing a high quality [Native Web App](http://blog.andyet.com/2015/01/22/native-web-apps).

In the current landscape, building high quality front-end apps is a giant pain. No one seems to know where to start or what to do. They may have a favorite set of tools but there is basically zero consensus on how to actually build a whole app. Consider the following:

- You want a run-anywhere web app
- Devs want to build with modern language and tools (not worry about polyfills, etc)
- In order to support proper clientside routing you need a server that isn't entirly dumb. It needs to know to have some sort of route "catchall" that returns your javascript, otherwise the client can't control routing.
- Grunt, Gulp, Browserify, webpack.
- The JS language itself is a moving target.
- There's a million frameworks, and everyone [including myself](http://blog.andyet.com/2014/08/13/opinionated-rundown-of-js-frameworks) has opinions on what they bring to the table.
- Performance is important
- Isomorophic all the things! (but how?!, that stuff's hard to get right)

At the end of the day, the developer experience is basically fear, confusion, and a tangle of grunt configs.

This is an attempt to provide a good devloper experience from start to deployment (no ops expertise required) and to create a fast, small, well performing app that's simple to ship.

In order to actually provide a good workflow there's a ton of tools and tech under the hood to handle all the hairy details.

Here's what it uses:

- Written in ES6+, compiled with [Babel.js](https://babeljs.io/)
- Uses these [Ampersand Modules](http://ampersandjs.com/):
  - ampersand-app
  - ampersand-model
  - ampersand-react-mixin
  - ampersand-rest-collection
  - ampersand-router
- [Webpack](http://webpack.github.io/) powers the development server and build system, and has been configured with [hjs-webpack](https://github.com/henrikjoreteg/hjs-webpack)
  - Note that major dependencies of hjs-webpack, like webpack itself are all installed as `peerDependencies` to allow you to set the exact version you want to use.
  - Same is true of stuff like Babel and React
- OAuth secrets are kept secret by using a free click-to-deploy instance of [github-secret-keeper](https://github.com/HenrikJoreteg/github-secret-keeper#setting-it-up-on-heroku) deployed to [Heroku](http://heroku.com). It's only job is to keep the Client Secret for the Github app, a secret.
- Backbutton and proper URLs are implemented with ampersand-router and made possible in a static site due to Surge's clever approach of using a `200.html` file at your root as the catchall (if present). You can learn more by [reading the surge intro post](https://medium.com/surge-sh/introducing-surge-the-cdn-for-front-end-developers-b4a50a61bcfc)
- Uses [yeticss.com](http://yeticss.com/) for styles.
  - Stylsheets are imported (required) from within the application code just like JS (thanks webpack)
  - During development they're bundled into the main JS bundle
  - When the build script is run, a seperate minified CSS file is produced in the `/public` dir
- Uses [autoprefixer-stylus](https://www.npmjs.com/package/autoprefixer-stylus) to seemlessly insert those pesky `-moz`, `-webkit` prefixes where required.
- Use GitHub's [Octicon](https://octicons.github.com/) icon set
  - Installed via npm just like other assets.
  - required in `/src/app.js` with this line `import octicons from 'octicons/octicons/octicons.css'`
  - Thanks to the [webpack file-loader](https://github.com/webpack/file-loader#file-loader-for-webpack) as configured in [hjs-webpack](https://github.com/henrikjoreteg/hjs-webpack) the icon fonts are inlined as base64 so you don't have to think about relative URLs in CSS. No manually copying assets into output directory needed, just npm install and require CSS.
- We use React as the view layer.
- We do partial isomorphic rendering by statically pre-rendering the React component used for layout on the front end, as well as the logged out homepage view. So, most of the benefits of isomorphic apps, but none of the complexity of trying to dynamically render client code on the server.
- We use [Surge](http://surge.sh/) to actually deploy (which becomes the easiest part of the whole thing).

## Running it

```
git clone git@github.com:HenrikJoreteg/hubtags.com.git
cd hubtags.com
npm i
npm start
```

Then open your browser to: http://localhost:3000

## More

Bu...bu...bu... but you're building apps that *require* JavaScript?! Yes, I explain that in this talk I gave at [FFConf 2014](https://www.youtube.com/watch?v=hrAssE8meRo).

I'm teaching several workshops on building static Native Web Apps, such as [FluentConf](http://fluentconf.com/javascript-html-2015/public/content/native-web-application), [Future Insights Live](https://futureinsightslive.com/las-vegas-2015/schedule), [edUi](http://eduiconf.org/speakers/henrik-joreteg/), and [FrontendMasters](https://frontendmasters.com/).

I wrote a book called [Human JavaScript](http://humanjavascript.com/), and I'm working on a second edition covering tools/approaches introduced here.

You can also follow me on Twitter: [@HenrikJoreteg](http://twitter.com/henrikjoreteg).

