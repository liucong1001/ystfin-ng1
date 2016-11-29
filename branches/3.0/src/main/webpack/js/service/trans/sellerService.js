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
}
