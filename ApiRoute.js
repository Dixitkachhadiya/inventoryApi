module.exports = (app) => {
    const apiRoute = require('./ApiController.js');

    app.get('/findOne', apiRoute.findOne);

}