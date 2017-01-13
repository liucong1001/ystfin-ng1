/**
 * Created by 扬 on 2016/10/11.
 */
"use strict"
module.exports = function (app) {
    app.factory("sellerStep", ["$resource", function ($resource) {
        return $resource('/trans/seller/:step/:id', null, {
            update: {method: 'PUT'}
        })
    }])
    app.factory("sellerReview", ["$resource", function ($resource) {
        return $resource('/trans/seller/review')
    }])
    app.factory("TransRecord",["$resource",function ($resource) {
        return $resource("/new/trans/:id",{
            update:{method:"PUT"}
        })
    }])
    app.factory("Order",["$resource",function ($resource) {
        return $resource("/order/:id",{
            update:{method:"PUT"}
        })
    }])

    app.factory("AccountRecords",["$resource",function ($resource) {
        return $resource("/account/:id/records/",{
            update:{method:"PUT"}
        })
    }])

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

    app.factory("Bills",["$resource",function ($resource) {
        return $resource('/new/trans/bills/:archivesNo',null,{
           update: {method: 'PUT'}
        });
    }]);

}
