/**
 * Created by 扬 on 2016/10/11.
 */
"use strict";
module.exports = function (app) {
    app.factory("batchInStep", ["$resource", function ($resource) {
        return $resource('/batch/in/:step/:id', null, {
            update: {method: 'PUT'}
        });
    }]);
    
    app.factory("batchOutStep", ["$resource", function ($resource) {
        return $resource('/batch/out/:step/:id', null, {
            update: {method: 'PUT'}
        });
    }]);
};
