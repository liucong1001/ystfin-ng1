/**
 * Created by 扬 on 2016/10/12.
 */
require("angular")
var app = angular.module("ys.ng.service",["ngResource"])
require("./finger")(app)
require("./print")(app)
require("./idcard")(app)
require("./trans/sellerService")(app)
require("./batch/batchService")(app)
