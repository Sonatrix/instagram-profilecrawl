var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
var csv = require('csv-express');
const vueRenderer = require('@doweb/vuexpress').vueRenderer;

let options = {
    // folder with your views
    views: path.join(__dirname+"../../public"),
    // cache templates
    cache: true,
    // use watch = true only in dev mode! Will start webpack watcher only on the current request.
    watch: false,
    // meta info - check out https://github.com/ktquez/vue-head for more information
    metaInfo: {
      title: 'Default Title'
    },
    // extract css to file, otherwise it will be inline
    extractCSS: true,
    // css output folder, extracted styles from your *.vue files
    cssOutputPath: "css/style.css",
    // path to your web root
    publicPath: path.join(__dirname+"../../public"),
    // global vars, access directly like window.
    globals: {
        example: 'world!'
    },
    plugins: [
        // vue plugins
        // require('your-plugin')
    ],
    compilerConfig: {
        // custom webpack config
    },
    compilerConfigCallback: function(webpackConfig) {
        // change the merged webpackconfig if you like
        return webpackConfig;
    },
    onError: (err) => {}, // error handler
    onReady: () => {} // ready event handler, when completed the work of initialization
};



// configure db
require('./config/db');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname+"../../public")));
app.use('/static', express.static(path.join(__dirname+"../../public")))
app.use(cookieParser());
const renderer = vueRenderer(options);
app.use(renderer);

// Initialise routes
require('./routes')(app);

var port = process.env.PORT || 3000;
app.set('port', port);

var server = http.createServer(app);

server.listen(port, function(error, res) {
    if (error) {
        console.log("Error while starting server");
    }
     console.log(`Server is listening on port ${port}`)
})

// initialise cron jobs
require('./services');
