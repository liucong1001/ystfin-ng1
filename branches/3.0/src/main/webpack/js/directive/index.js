/**
 * Created by 扬 on 2016/10/12.
 */
"use strict"
require("angular")
var app = angular.module("ys.ng.ui",["ngResource"])
require("./panel")(app)
require("./setfocus")(app)
require("./webcam")(app)
require("./convert")(app)
require("./table")(app)
require("./auth")(app)
require("./imgView")(app)
require("./complie")(app)
require("./inputcase")(app)
