/**
 * Created by 扬 on 2017/1/23.
 */
var gloabConfigMap
module.exports = function (app) {
    app.factory("$globalConfig", ["$http","$q",function ($http,$q) {
        var defer = $q.defer();
        if(gloabConfigMap){
            defer.resolve(gloabConfigMap)
        }else{
            $http.get("/global/config").then(function (result) {
                defer.resolve(result.data)
            })
        }
        return defer.promise;
    }])
    app.filter("globalConfig", ["$globalConfig",function (gc) {
        var filter = function (properties) {
            if(gloabConfigMap){
                var arr = properties.split(".")
                var value = gloabConfigMap
                for(var i in arr){
                    value = value[arr[i]]
                    if(!value) break;
                }
                return value
            }else {
                gc.then(function (result) {
                    gloabConfigMap = result
                })
            }
        }
        filter.$stateful = true
        return filter
    }])
}