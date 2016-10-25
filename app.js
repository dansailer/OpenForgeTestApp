/* jshint esversion: 6 */

/**
 * NPM modules
 */
const express = require('express');
const session = require('express-session');
const handlebars = require('express-handlebars');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');


/**
 * Create Express server and configuration.
 */
const app = express();
app.set('port', process.env.PORT || 8080);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(expressValidator()); // Has to be after bodyParser
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: 31557600000
}));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/fonts', express.static(__dirname + '/node_modules/bootstrap/dist/fonts')); // redirect Fonts bootstrap
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/font-awesome/css')); // redirect CSS font-awesome
app.use('/fonts', express.static(__dirname + '/node_modules/font-awesome/fonts')); // redirect Fonts font-awesome
app.use('/css/animate.min.css', express.static(__dirname + '/node_modules/animate.css/animate.min.css')); // redirect CSS animate.min.css


/**
 *  View Engine
 */
app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    helpers: {
        dotdotdot: function (str) {
            if (!str) {
                return '';
            }
            str = str.trim();
            if (str.length > 40)
                return str.substring(0, 40) + '...';
            return str;
        },
        checkedIfInArray: function (value, array) {
            if (!value) {
                return '';
            }
            if (!array) {
                return '';
            }
            if (array.indexOf(value) == -1) {
                return '';
            } else {
                return 'checked';
            }
        },
        block: function (name) {
            var blocks = this._blocks;
            content = blocks && blocks[name];
            return content ? content.join('\n') : null;
        },
        contentFor: function (name, options) {
            var blocks = this._blocks || (this._blocks = {});
            block = blocks[name] || (blocks[name] = []); //Changed this to [] instead of {}
            block.push(options.fn(this));
        },
        ifCond: function (v1, operator, v2, options) {
            switch (operator) {
            case '==':
                return (v1 == v2) ? options.fn(this) : options.inverse(this);
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
            case '<=':
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
            case '>':
                return (v1 > v2) ? options.fn(this) : options.inverse(this);
            case '>=':
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
            case '&&':
                return (v1 && v2) ? options.fn(this) : options.inverse(this);
            case '||':
                return (v1 || v2) ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
            }
        }
    }
}));
app.set('view engine', 'handlebars');


/**
 *  Routes
 */
require('./routes.js')(app);



/**
 * Start Express server.
 */
var server = app.listen(app.get('port'), () => {
    console.log((new Date()).toISOString() + ' Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});


module.exports = app;
