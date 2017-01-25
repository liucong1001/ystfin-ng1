/**
 * Created by 扬 on 2016/10/12.
 */
require("angular")
var app = angular.module("ys.ng.service",["ngResource"])
require("./finger")(app)
require("./print")(app)
require("./iccard")(app)
require("./resource")(app)
require("./filter")(app)
require("./idcard")(app)
require("./globalConfig")(app)
require("./batch/batchService")(app)

