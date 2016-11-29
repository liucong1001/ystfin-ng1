/**
 * Created by 扬 on 2016/10/9.
 */
"use strict"
var app = require("../../ngcommon")
require("../../service/printarea")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/trans/printCarCert/:archivesNo',{template:require("./html/print/carCert.html")})
}])

app.controller("transPrintCarCert",["$scope","$routeParams","$templateCache","$location","$http","$print",function($scope,$params,$tpc,$location,$http,$print){
	$scope.archivesNo = $params.archivesNo;
	$http.get("/trans/findOneByArchivesNo/"+$scope.archivesNo).success(function(response){
		$scope.archivesNo = response.archivesNo;
		$scope.driving = response.vehicleCert.id;
		$scope.drivingBg = response.vehicleCertBg.id;
		$scope.registration = response.vehicle.registrationCert.id;
		$scope.registrationBg = response.vehicle.registrationCertBg.id;
	});
	$scope.print = function(){
		/*$print.init();
		$print.printArea(document.getElementById("printArea"),0,40,800,1200);*/
		$('#printArea').printArea({})
    }
	$scope.back = function(){
		$location.url('/trans/seller/complate/'+$scope.archivesNo);
    }
}])