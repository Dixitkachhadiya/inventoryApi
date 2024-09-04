module.exports = (app) => {
    const apiRoute = require('./ApiController.js');

    app.get('/findOne', apiRoute.findOne);

    // =========================== AddBusiness Category Api's ==================================

    app.post('/insertBusinessCategory', apiRoute.insertBusinessCategory);
    app.get('/getAllbuisnessRecord', apiRoute.getAllbuisnessRecord);
    app.delete('/deleteRecordByid/:id', apiRoute.deleteRecordByid);


    // ============================ GetBusiness Api's =================================

    app.get('/getAllbusinessRecordByid/:id', apiRoute.getAllbusinessRecordByid);
    app.post('/insertRecord', apiRoute.insertRecord);
    app.get('/getInsertedRecord/:id', apiRoute.getInsertedRecord);
    app.delete('/deleteBusinessCategoryRecord/:id', apiRoute.deleteBusinessCategoryRecord);
    app.get('/getCashInCategory/:id', apiRoute.getCashInCategory);
    app.get('/getCashOutCategory/:id', apiRoute.getCashOutCategory);


    // ================================= Cash in & Cash Out Api's ============================

    app.post('/insertCashInAndOutRecord',apiRoute.insertCashInAndOutRecord);
    app.get('/getRecordFromEditCashinout/:id',apiRoute.getRecordFromEditCashinout);
    app.put('/updatecashinandoutRecord/:id',apiRoute.updatecashinandoutRecord);

}