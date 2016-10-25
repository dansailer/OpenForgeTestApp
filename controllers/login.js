/* jshint esversion: 6 */

/**
 * Login controller
 */
const fs = require('fs');
const path = require('path');

/**
 * GET /login
 */
exports.getLogin = (req, res, next) => {
    if (req.user) {
        return res.redirect('/');
    }
    return res.render("pages/login", {
        layout: 'nomenu'
    });
};


/**
 * GET /api/login/background/carousel
 */
exports.getBackgroundCarousel = (req, res, next) => {
    fs.readdir(path.join(__dirname, '../public/img/background'), (err, items) => {
        if (items !== undefined && items !== null) {
            for (var i = 0; i < items.length; i++) {
                items[i] = {
                    src: "/img/background/" + items[i]
                };
            }
        }
        return res.json(items).status(200);
    });
};

