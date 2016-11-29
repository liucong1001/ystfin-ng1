/**
 * Created by 扬 on 2016/10/29.
 */
"use strict"
require("angular-resource")
module.exports = function (app) {
    app.directive("ngImgView", ["$compile","$uibModal",function ($compile,$uibModal) {
        return {
            restrict:"A",
            link:function (scope, elem, attrs) {
                elem.addClass("clickable").on('click',function () {
                    var url = elem.attr('src')
                    var modalInstance = $uibModal.open({
                        animation: false,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        template: "<div class='img-view-dialog'><img ng-src='{{$ctrl.src}}' /></div>",
                        controller: "imgViewModalController",
                        controllerAs: "$ctrl",
                        resolve: {
                            data: function () {
                                return {src:url}
                            }
                        },
                        size:"lg"
                    })
                    modalInstance.result.then(function(){

                    },function (printed) {
                    })
                })
            },
            controller:["$scope",function ($scope) {
            }]
        }
    }])
    app.controller("imgViewModalController",["data",function (data) {
        var $ctrl = this
        $ctrl.src = data.src
    }])
}