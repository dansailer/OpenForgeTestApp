/* jshint esversion: 6 */


/**
 * Controllers (route handlers).
 */
const loginController = require('./controllers/login');


module.exports = function (app) {


    /**
     * Login
     */
    app.get('/', loginController.getLogin);
    app.get('/api/login/background/carousel', loginController.getBackgroundCarousel);

};
