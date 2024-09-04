module.exports = (app) => {
    const apiRoute = require('./ApiController.js');

    app.get('/findOne', apiRoute.findOne);

     // =========================== AddBusiness Category Api's ==================================

     app.post('/insertBusinessCategory',apiRoute.insertBusinessCategory);

}