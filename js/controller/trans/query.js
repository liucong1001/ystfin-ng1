/**
 * Created by peter on 2017/3/22.
 */
"use strict"
var app = require("../../ngcommon")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/trans/query',
        {
            controller:"transQuery",
            template:require("./html/query/query.html")
        })
}])

app.controller("transQuery",["$scope","$filter",function ($scope,$filter) {
    //$scope.tableColumns = [
    //    {template:"{{row.archivesNo}}",title:"流水号", width:10,sortable:true,sorting:true,sortProperty:'wtr.archives_no'}
    //];

    $scope.tableColumns_nav=$scope.tableColumns;
    $scope.tableColumns_save=[
        {template:"{{row.archivesNo}}",title:"流水号", width:10,sortable:true,sorting:true,sortProperty:'wtr.archives_no'},
        {template:"<img ng-src='common/download/{{row.seller.regPhoto.id}}' style='width: 100%;height: 160px'/>",title:"卖家用户图像",width:10},
        {template:"<img ng-src='common/download/{{row.seller.idCardFront.id}}' style='width: 100%;height: 160px'/>",title:"组织机构正面",width:10},
        {template:"<img ng-src='common/download/{{row.seller.idCardBg.id}}' style='width: 100%;height: 160px'/>",title:"组织机构反面",width:10},
        {template:"<img ng-src='common/download/{{row.seller.fingerprintImg.id}}' style='width: 100%;height: 160px'/>",title:"指纹",width:10 }
    ];
    //卖家复选框默认勾选上的项 true显示 false隐藏
    $scope.seller_regPhoto=true;
    $scope.seller_idCardFront=true;
    $scope.seller_idCardBg=true;
    $scope.seller_fingerprintImg=true;
    $scope.toggle=function(){
        $scope.tableColumns=[];
        $scope.tableColumns.push({template:"{{row.archivesNo}}",title:"流水号", width:10,sortable:true,sorting:true,sortProperty:'wtr.archives_no'});
        if($scope.seller_regPhoto==true){
            $scope.tableColumns.push({template:"<img ng-src='common/download/{{row.seller.regPhoto.id}}' style='width: 100%;height: 160px'/>",title:"卖家用户图像",width:10});
        }
        if($scope.seller_idCardFront==true){
            $scope.tableColumns.push({template:"<img ng-src='common/download/{{row.seller.idCardFront.id}}' style='width: 100%;height: 160px'/>",title:"组织机构正面",width:10}
            );
        }
        if( $scope.seller_idCardBg==true){
            $scope.tableColumns.push({template:"<img ng-src='common/download/{{row.seller.idCardBg.id}}' style='width: 100%;height: 160px'/>",title:"组织机构反面",width:10}
            );
        }
        if($scope.seller_fingerprintImg==true){
            $scope.tableColumns.push({template:"<img ng-src='common/download/{{row.seller.fingerprintImg.id}}' style='width: 100%;height: 160px'/>",title:"指纹",width:10 }
            );
        }
    };
    $scope.tableColumns_private=[
        {template:"{{row.archivesNo}}",title:"流水号", width:10,sortable:true,sorting:true,sortProperty:'wtr.archives_no'},
        {template:"<img ng-src='common/download/{{row.seller.regPhoto.id}}' style='width: 100%;height: 160px'/>",title:"卖家个人图像",width:10},
        {template:"<img ng-src='common/download/{{row.seller.idCardFront.id}}' style='width: 100%;height: 160px'/>",title:"卖家身份证正面",width:10},
        {template:"<img ng-src='common/download/{{row.seller.idCardBg.id}}' style='width: 100%;height: 160px'/>",title:"卖家身份证反面",width:10},
        {template:"<img ng-src='common/download/{{row.seller.fingerprintImg.id}}' style='width: 100%;height: 160px'/>",title:"卖家个人指纹",width:10 },
    ];
    //卖家分页数组（无车类型下拉框）
    $scope.tableColumns_note=[
        {template:"{{row.archivesNo}}",title:"流水号", width:10,sortable:true,sorting:true,sortProperty:'wtr.archives_no'},
        {template:"<img ng-src='common/download/{{row.seller.regPhoto.id}}' style='width: 100%;height: 160px'/>",title:"卖家个人图像",width:10},
        {template:"<img ng-src='common/download/{{row.seller.idCardFront.id}}' style='width: 100%;height: 160px'/>",title:"卖家身份证正面",width:10},
        {template:"<img ng-src='common/download/{{row.seller.idCardBg.id}}' style='width: 100%;height: 160px'/>",title:"卖家身份证反面",width:10},
        {template:"<img ng-src='common/download/{{row.seller.fingerprintImg.id}}' style='width: 100%;height: 160px'/>",title:"卖家个人指纹",width:10 },
        {template:"<img ng-src='common/download/{{row.seller.businessCert.id}}' style='width: 100%;height: 160px'/>",title:"组织机构正面",width:10},
        {template:"<img ng-src='common/download/{{row.seller.businessCertBg.id}}' style='width: 100%;height: 160px'/>",title:"组织机构反面",width:10}
    ];
    $scope.tableColumns=$scope.tableColumns_note;
    //卖家个人（true勾选，false不勾选）
    $scope.seller_note=true;



    $scope.init_showCheckbox=function(){
        //卖家
        $scope.show=true;
        $scope.seller_regPhotoi=$scope.show;
        $scope.seller_idCardFronti=$scope.show;
        $scope.seller_idCardBgi=$scope.show;
        $scope.seller_fingerprintImgi=$scope.show;
        $scope.seller_businessCert=$scope.show;
        $scope.seller_businessCertBg=$scope.show;
        //买家复选框默认勾选上的项 true显示 false隐藏
        $scope.buyer_regPhoto=$scope.show;
        $scope.buyer_idCardFront=$scope.show;
        $scope.buyer_idCardBg=$scope.show;
        $scope.buyer_fingerprintImg=$scope.show;
        $scope.buyer_businessCert=$scope.show;
        $scope.buyer_businessCertBg=$scope.show;
        //车辆
        $scope.vehicleCert=true;
        $scope.vehicleCertBg=true;
        $scope.vehicle_registrationCert=true
        $scope.vehicle_registrationCertBg=true;
        //其他
        $scope.vehicle_gongZheng=true;
        $scope.vehicle_buyerEntrustBook=true;
        $scope.vehicle_bill=true;
        $scope.vehicle_transferProxy=true;
        //卖方委托人复选框勾选情况 （true勾选，false不勾选）
        $scope.sellerTrustor_regPhoto=true;
        $scope.sellerTrustor_fingerprintImg=true;
        $scope.sellerTrustor_idCardFront=true;
        $scope.sellerTrustor_idCardBg=true;
        $scope.vehicle_entrustBook=true;
        //买方委托人复选框勾选情况 （true勾选，false不勾选）
        $scope.buyerTrustor_regPhoto=true;
        $scope.buyerTrustor_fingerprintImg=true;
        $scope.buyerTrustor_idCardFront=true;
        $scope.buyerTrustor_idCardBg=true;
        $scope.vehicle_entrustBook=true;
        //公证书复选框勾选情况；（true勾选，false不勾选）
        $scope.notarizationFile1=true;
        $scope.notarizationFile2=true;
        $scope.notarizationFile3=true;
        $scope.notarizationFile4=true;
        $scope.notarizationFile5=true;
        $scope.notarizationFile6=true;
        //增值税发票复选框勾选情况（true勾选，false不勾选）
        $scope.vat1=true; $scope.vat2=true; $scope.vat3=true;
        $scope.vat4=true; $scope.vat5=true; $scope.vat6=true;
    };
    //初始化复选框选中
    $scope.init_showCheckbox();
    $scope.toggle_sellPrivate=function(){
        $scope.tableColumns=[];
        $scope.tableColumns.push( $scope.tableColumns_note[0]);
        if($scope.seller_regPhotoi==true){
            $scope.tableColumns.push($scope.tableColumns_note[1]);
        }
        if($scope.seller_idCardFronti==true){
            $scope.tableColumns.push($scope.tableColumns_note[2]
            );
        }
        if( $scope.seller_idCardBgi==true){
            $scope.tableColumns.push($scope.tableColumns_note[3]
            );
        }
        if($scope.seller_fingerprintImgi==true){
            $scope.tableColumns.push($scope.tableColumns_note[4]
            );
        }
        if($scope.seller_businessCert==true){
            $scope.tableColumns.push($scope.tableColumns_note[5]
            );
        }
        if($scope.seller_businessCertBg==true){
            $scope.tableColumns.push($scope.tableColumns_note[6]
            );
        }
    };
    //买家  公车:组织机构证书 图像 指纹  个人：身份证正反 图像 指纹
    $scope.tableColumns_buyer_save=[
        {template:"{{row.archivesNo}}",title:"流水号", width:10,sortable:true,sorting:true,sortProperty:'wtr.archives_no'},
        {template:"<img ng-src='common/download/{{row.buyer.regPhoto.id}}' style='width: 100%;height: 160px'/>",title:"买家用户图像",width:10},
        {template:"<img ng-src='common/download/{{row.buyer.idCardFront.id}}' style='width: 100%;height: 160px'/>",title:"身份证正面",width:10},
        {template:"<img ng-src='common/download/{{row.buyer.idCardBg.id}}' style='width: 100%;height: 160px'/>",title:"身份证反面",width:10},
        {template:"<img ng-src='common/download/{{row.buyer.fingerprintImg.id}}' style='width: 100%;height: 160px'/>",title:"指纹",width:10},
        {template:"<img ng-src='common/download/{{row.buyer.businessCert.id}}' style='width: 100%;height: 160px'/>",title:"组织机构证书(正)",width:10},
        {template:"<img ng-src='common/download/{{row.buyer.businessCertBg.id}}' style='width: 100%;height: 160px'/>",title:"组织机构证书(反)",width:10}
    ];

    $scope.toggle_buyer=function(){
        $scope.tableColumns=[];
        $scope.tableColumns.push($scope.tableColumns_buyer_save[0]);
        if($scope.buyer_regPhoto==true){
            $scope.tableColumns.push($scope.tableColumns_buyer_save[1] );
        }
        if($scope.buyer_idCardFront==true){
            $scope.tableColumns.push($scope.tableColumns_buyer_save[2] );
        }
        if($scope.buyer_idCardBg==true){
            $scope.tableColumns.push($scope.tableColumns_buyer_save[3]);
        }
        if($scope.buyer_fingerprintImg==true){
            $scope.tableColumns.push($scope.tableColumns_buyer_save[4]);
        }
        if($scope.buyer_businessCert==true){
            $scope.tableColumns.push($scope.tableColumns_buyer_save[5] );
        }
        if($scope.buyer_businessCertBg==true){
            $scope.tableColumns.push($scope.tableColumns_buyer_save[6] );
        }
    };
    //车辆 （true勾选，false不勾选）
    $scope.tableColumns_car_save=[
        {template:"{{row.archivesNo}}",title:"流水号", width:10,sortable:true,sorting:true,sortProperty:'wtr.archives_no'},
        {template:"<img ng-src='common/download/{{row.vehicleCert.id}}' style='width: 100%;'/>",title:"行驶证正面",width:10},
        {template:"<img ng-src='common/download/{{row.vehicleCertBg.id}}' style='width: 100%;'/>",title:"行驶证反面",width:10},
        {template:"<img ng-src='common/download/{{row.vehicle.registrationCert.id}}' style='width: 100%;'/>",title:"登记证书首页",width:10},
        {template:"<img ng-src='common/download/{{row.vehicle.registrationCertBg.id}}' style='width: 100%;'/>",title:"登记证书末页",width:10}
    ];
    $scope.tableColumns_car=$scope.tableColumns;

    $scope.toggle_car=function(){
        $scope.tableColumns=[];
        $scope.tableColumns.push($scope.tableColumns_car_save[0]);
        if($scope.vehicleCert==true){
            $scope.tableColumns.push($scope.tableColumns_car_save[1]);
        }
        if( $scope.vehicleCertBg==true){
            $scope.tableColumns.push($scope.tableColumns_car_save[2]);
        }
        if($scope.vehicle_registrationCert==true){
            $scope.tableColumns.push($scope.tableColumns_car_save[3]);
        }
        if($scope.vehicle_registrationCertBg==true){
            $scope.tableColumns.push($scope.tableColumns_car_save[4]);
        }
    };
    //其他(字段名没改)  公证书，委托书， 增值税发票，
    $scope.tableColumns_other=[
        {template:"{{row.archivesNo}}",title:"流水号", width:10,sortable:true,sorting:true,sortProperty:'wtr.archives_no'},
        {template:"<img ng-src='common/download/{{row.transferProxy.id}}' style='width: 100%;'/>",title:"商户车辆转让协议",width:10}
    ];

    $scope.toggle_other=function(){
        $scope.tableColumns=[];
        $scope.tableColumns.push({template:"{{row.archivesNo}}",title:"流水号", width:10,sortable:true,sorting:true,sortProperty:'wtr.archives_no'}
        );
        if($scope.vehicle_transferProxy==true){
            $scope.tableColumns.push( $scope.tableColumns_other[1]);
        }
    }

     //卖方委托人
    $scope.tableColumns_sellerTrustor=$scope.tableColumns;
    $scope.tableColumns_sellerTrustor_save=[
        {template:"{{row.archivesNo}}",title:"流水号", width:10,sortable:true,sorting:true,sortProperty:'wtr.archives_no'},
        {template:"<img ng-src='common/download/{{row.sellerTrustor.regPhoto.id}}' style='width: 100%;'/>",title:"卖方委托人图像",width:10},
        {template:"<img ng-src='common/download/{{row.sellerTrustor.fingerprintImg.id}}' style='width: 100%;'/>",title:"卖方委托人指纹",width:10},
        {template:"<img ng-src='common/download/{{row.sellerTrustor.idCardFront.id}}' style='width: 100%;'/>",title:"卖方委托人证件正面",width:10},
        {template:"<img ng-src='common/download/{{row.sellerTrustor.idCardBg.id}}' style='width: 100%;'/>",title:"卖方委托人证件反面",width:10},
        {template:"<img ng-src='common/download/{{row.vehicle.entrustBook.id}}' style='width: 100%;'/>",title:"卖方委托书",width:10}
    ];

     $scope.toggle_sellerTrustor=function(){
         $scope.tableColumns=[];
         $scope.tableColumns.push($scope.tableColumns_sellerTrustor_save[0]);
         if($scope.sellerTrustor_regPhoto==true){
             $scope.tableColumns.push($scope.tableColumns_sellerTrustor_save[1]);
         }
         if($scope.sellerTrustor_fingerprintImg==true){
             $scope.tableColumns.push($scope.tableColumns_sellerTrustor_save[2]);
         }
         if($scope.sellerTrustor_idCardFront==true){
             $scope.tableColumns.push($scope.tableColumns_sellerTrustor_save[3]);
         }
         if($scope.sellerTrustor_idCardBg==true){
             $scope.tableColumns.push($scope.tableColumns_sellerTrustor_save[4]);
         }
         if($scope.vehicle_entrustBook==true){
             $scope.tableColumns.push($scope.tableColumns_sellerTrustor_save[5]);
         }
     };
    //买方委托人
    $scope.tableColumns_buyTrustor=$scope.tableColumns;
    $scope.tableColumns_buyTrustor_save=[
        {template:"{{row.archivesNo}}",title:"流水号", width:10,sortable:true,sorting:true,sortProperty:'wtr.archives_no'},
        {template:"<img ng-src='common/download/{{row.buyerTrustor.regPhoto.id}}' style='width: 100%;'/>",title:"买方委托人图像",width:10},
        {template:"<img ng-src='common/download/{{row.buyerTrustor.fingerprintImg.id}}' style='width: 100%;'/>",title:"买方委托人指纹",width:10},
        {template:"<img ng-src='common/download/{{row.buyerTrustor.idCardFront.id}}' style='width: 100%;'/>",title:"买方委托人证件正面",width:10},
        {template:"<img ng-src='common/download/{{row.buyerTrustor.idCardBg.id}}' style='width: 100%;'/>",title:"买方委托人证件反面",width:10},
        {template:"<img ng-src='common/download/{{row.vehicle.buyerEntrustBook.id}}' style='width: 100%;'/>",title:"买方委托书",width:10}
    ];

    $scope.toggle_buyTrustor=function(){
        $scope.tableColumns=[];
        $scope.tableColumns.push($scope.tableColumns_buyTrustor_save[0]);
        if( $scope.buyerTrustor_regPhoto==true){
            $scope.tableColumns.push($scope.tableColumns_buyTrustor_save[1]);
        };
        if($scope.buyerTrustor_fingerprintImg==true){
            $scope.tableColumns.push($scope.tableColumns_buyTrustor_save[2]);
        }
        if($scope.buyerTrustor_idCardFront==true){
            $scope.tableColumns.push($scope.tableColumns_buyTrustor_save[3]);
        }
        if($scope.buyerTrustor_idCardBg==true){
            $scope.tableColumns.push($scope.tableColumns_buyTrustor_save[4]);
        }
        if($scope.vehicle_entrustBook==true){
            $scope.tableColumns.push($scope.tableColumns_buyTrustor_save[5]
            );
        }
    };

     //公证书
    $scope.tableColumns_notarizationFile=[
        {template:"{{row.archivesNo}}",title:"流水号", width:10,sortable:true,sorting:true,sortProperty:'wtr.archives_no'},
        {template:"<img ng-src='common/download/{{row.notarizationFile1.id}}' style='width: 100%;'/>",title:"公证书第一页",width:10},
        {template:"<img ng-src='common/download/{{row.notarizationFile2.id}}' style='width: 100%;'/>",title:"公证书第二页",width:10},
        {template:"<img ng-src='common/download/{{row.notarizationFile3.id}}' style='width: 100%;'/>",title:"公证书第三页",width:10},
        {template:"<img ng-src='common/download/{{row.notarizationFile4.id}}' style='width: 100%;'/>",title:"公证书第四页",width:10},
        {template:"<img ng-src='common/download/{{row.notarizationFile5.id}}' style='width: 100%;'/>",title:"公证书第五页",width:10},
        {template:"<img ng-src='common/download/{{row.notarizationFile6.id}}' style='width: 100%;'/>",title:"公证书第六页",width:10},
    ];
    $scope.tableColumns_notarizationFile_save=$scope.tableColumns_notarizationFile;

       $scope.toggle_notarizationFile=function(){
           $scope.tableColumns=[];
           $scope.tableColumns.push($scope.tableColumns_notarizationFile[0]);
          if($scope.notarizationFile1==true){
              $scope.tableColumns.push($scope.tableColumns_notarizationFile[1]);
          }
           if($scope.notarizationFile2==true){
               $scope.tableColumns.push($scope.tableColumns_notarizationFile[2]);
           }
           if($scope.notarizationFile3==true){
               $scope.tableColumns.push($scope.tableColumns_notarizationFile[3]);
           }
           if($scope.notarizationFile4==true){
               $scope.tableColumns.push($scope.tableColumns_notarizationFile[4]);
           }
           if($scope.notarizationFile5==true){
               $scope.tableColumns.push($scope.tableColumns_notarizationFile[5]);
           }
           if($scope.notarizationFile6==true){
               $scope.tableColumns.push($scope.tableColumns_notarizationFile[6]);
           }
       };

    //增值税发票
    $scope.tableColumns_vat=[
        {template:"{{row.archivesNo}}",title:"流水号", width:10,sortable:true,sorting:true,sortProperty:'wtr.archives_no'},
        {template:"<img ng-src='common/download/{{row.vat.id}}' style='width: 100%;'/>",title:"增值税发票第一张",width:10},
        {template:"<img ng-src='common/download/{{row.vat2.id}}' style='width: 100%;'/>",title:"增值税发票第二张",width:10},
        {template:"<img ng-src='common/download/{{row.vat3.id}}' style='width: 100%;'/>",title:"增值税发票第三张",width:10},
        {template:"<img ng-src='common/download/{{row.vat4.id}}' style='width: 100%;'/>",title:"增值税发票第四张",width:10},
        {template:"<img ng-src='common/download/{{row.vat5.id}}' style='width: 100%;'/>",title:"增值税发票第五张",width:10},
        {template:"<img ng-src='common/download/{{row.vat6.id}}' style='width: 100%;'/>",title:"增值税发票第六张",width:10}
    ];

      $scope.toggle_vat=function(){
          $scope.tableColumns=[];
          $scope.tableColumns.push($scope.tableColumns_vat[0]);
          if( $scope.vat1==true){$scope.tableColumns.push($scope.tableColumns_vat[1])}
          if( $scope.vat2==true){$scope.tableColumns.push($scope.tableColumns_vat[2])}
          if( $scope.vat3==true){$scope.tableColumns.push($scope.tableColumns_vat[3])}
          if( $scope.vat4==true){$scope.tableColumns.push($scope.tableColumns_vat[4])}
          if( $scope.vat5==true){$scope.tableColumns.push($scope.tableColumns_vat[5])}
          if( $scope.vat6==true){$scope.tableColumns.push($scope.tableColumns_vat[6])}
      }

    //定义复选框变化显示情况（false-隐藏；true-显示）
    $scope.filter={};
    $scope.seller=false;
    $scope.sellerTrustor=false;
    $scope.seller_private=false;
    $scope.private_sell=false;
    $scope.buyer=false;
    $scope.buyTrustor=false;
    $scope.car=false;
    $scope.other=false;
    $scope.notarizationFile=false;
    $scope.vat=false;
    $scope.type_attr='999';
    $scope.select_carType=false;  //车辆使用类型下拉框暂时隐藏
    //车辆使用类型下拉框的change事件
    $scope.select_attr=function(attr){
        $scope.tableColumns=[];
        if(attr==11 & $scope.type_pager==1){
            $scope.seller_note=false;//提示消息
            $scope.seller_private=true;  $scope.seller=false;
            $scope.buyer=false;  $scope.car=false;$scope.other=false;
            $scope.notarizationFile=false;$scope.vat=false;
            //分页变化
            $scope.tableColumns=$scope.tableColumns_private;
        };
        if(attr==22 & $scope.type_pager==1){
            $scope.seller_note=false;//提示消息
            $scope.seller_private=false; $scope.seller=true;
            $scope.buyer=false;  $scope.car=false;$scope.other=false;
            //$scope.private_sell=false; //显示列表的卖家 （公）
            $scope.notarizationFile=false;$scope.vat=false;
            //分页变化
            $scope.tableColumns=$scope.tableColumns_save;
        }
        if($scope.type_pager==99){$scope.tableColumns=$scope.tableColumns_nav;}
        if( $scope.type_pager==2){$scope.tableColumns=$scope.tableColumns_buyer_save;}
        if($scope.type_pager==3){$scope.tableColumns=$scope.tableColumns_car_save;}
        if($scope.type_pager==4){$scope.tableColumns=$scope.tableColumns_other;}
        if($scope.type_pager==5){$scope.tableColumns=$scope.tableColumns_notarizationFile;}
        if($scope.type_pager==6){$scope.tableColumns=$scope.tableColumns_vat;}
        if($scope.type_pager==7){ $scope.tableColumns=$scope.tableColumns_sellerTrustor_save}
        if($scope.type_pager==8){$scope.tableColumns=$scope.tableColumns_buyTrustor_save;}
    }
    //下拉框默认选择
    $scope.type_pager='1';

    //选择查看图片类型下拉框的change事件
    $scope.select=function(x){

        $scope.tableColumns=[];
        $scope.init_showCheckbox();
        if(x==99){
            //复选框全部隐藏
            $scope.seller=false; $scope.buyer=false;  $scope.car=false;$scope.other=false;$scope.seller_private=false;
            $scope.private_sell=false; $scope.sellerTrustor=false; $scope.buyTrustor=false;
            $scope.notarizationFile=false;$scope.vat=false;
            $scope.seller_note=false;
            $scope.tableColumns=$scope.tableColumns_nav;
        }
        if(x==1){
            if(x==1 & $scope.type_attr==22){
                $scope.seller_note=false;//卖家
                $scope.seller=true; $scope.buyer=false;  $scope.car=false;$scope.other=false;$scope.seller_private=false;
                $scope.private_sell=false; //显示列表的个人卖家（隐藏） 卖家公显示
                $scope.sellerTrustor=false; $scope.buyTrustor=false;
                $scope.notarizationFile=false;$scope.vat=false;
                $scope.tableColumns= $scope.tableColumns_save;
            }
            if(x==1 & $scope.type_attr==11){
                $scope.seller_note=false;//卖家
                $scope.seller_private=true;  $scope.seller=false;
                $scope.buyer=false;  $scope.car=false;$scope.other=false;
                $scope.notarizationFile=false;$scope.vat=false;
                $scope.sellerTrustor=false; $scope.buyTrustor=false;
                $scope.tableColumns=$scope.tableColumns_private;
            }
            if(x==1 & $scope.type_attr==999){
                $scope.seller_note=true;//卖家
                $scope.seller=false; $scope.buyer=false;  $scope.car=false;$scope.other=false;$scope.seller_private=false;
                $scope.private_sell=false; //显示列表的个人卖家（隐藏） 卖家公显示
                $scope.sellerTrustor=false; $scope.buyTrustor=false;
                $scope.notarizationFile=false;$scope.vat=false;
                $scope.tableColumns=$scope.tableColumns_note; //分页流水号
            }
        }
        if(x==2){
            $scope.seller_note=false;//卖家
             //复选框变化
            $scope.seller=false; $scope.buyer=true;  $scope.car=false;$scope.other=false;
            $scope.seller_private=false;$scope.private_sell=false;
            $scope.sellerTrustor=false; $scope.buyTrustor=false;
            $scope.notarizationFile=false;$scope.vat=false;
            //分页显示变化 (买方)
            $scope.tableColumns= $scope.tableColumns_buyer_save;
        }
        if(x==3){
            $scope.seller_note=false;//卖家
            //复选框变化
            $scope.seller=false; $scope.buyer=false;  $scope.car=true;$scope.other=false;
            $scope.seller_private=false;$scope.private_sell=false;
            $scope.sellerTrustor=false; $scope.buyTrustor=false;
            $scope.notarizationFile=false;$scope.vat=false;
            //分页显示变化
            $scope.tableColumns=$scope.tableColumns_car_save;
        }
        if(x==4){

            $scope.seller_note=false;//卖家
            //复选框变化
            $scope.seller=false; $scope.buyer=false;  $scope.car=false;$scope.other=true;
            $scope.seller_private=false;$scope.private_sell=false;
            $scope.sellerTrustor=false; $scope.buyTrustor=false;
            $scope.notarizationFile=false;$scope.vat=false;
            //分页显示变化
            $scope.tableColumns= $scope.tableColumns_other;
        }
        if(x==5){
            $scope.seller_note=false;//卖家
            $scope.seller=false; $scope.buyer=false; $scope.car=false;$scope.other=false;
            $scope.seller_private=false;$scope.private_sell=false;
            $scope.sellerTrustor=false; $scope.buyTrustor=false;
            $scope.notarizationFile=true;$scope.vat=false;
            //公证书
            $scope.tableColumns=$scope.tableColumns_notarizationFile;
         }
        if(x==6){
            $scope.seller_note=false;//卖家
            $scope.seller=false; $scope.buyer=false; $scope.car=false;$scope.other=false;
            $scope.seller_private=false;$scope.private_sell=false;
            $scope.sellerTrustor=false; $scope.buyTrustor=false;
            $scope.notarizationFile=false;$scope.vat=true;
           //增值税发票
            $scope.tableColumns=$scope.tableColumns_vat;
        }
        if(x==7){
            $scope.seller_note=false;//卖家
            $scope.seller=false; $scope.buyer=false; $scope.car=false;$scope.other=false;
            $scope.seller_private=false;$scope.private_sell=false;
            $scope.notarizationFile=false;$scope.vat=false;
            $scope.sellerTrustor=true;$scope.buyTrustor=false;
            //卖家委托人
            $scope.tableColumns=$scope.tableColumns_sellerTrustor_save;
        }
        if(x==8){
            $scope.seller_note=false;//卖家
            $scope.seller=false; $scope.buyer=false; $scope.car=false;$scope.other=false;
            $scope.seller_private=false;$scope.private_sell=false;
            $scope.notarizationFile=false;$scope.vat=false;
            $scope.sellerTrustor=false;$scope.buyTrustor=true;
            $scope.tableColumns=$scope.tableColumns_buyTrustor_save;
        }
    };
    //时间格式变换
    $scope.changetime=function(){
        $scope.filter.startDate=$filter('date')($scope.startDate,'yyyy-MM-dd');//成交起始日期
        $scope.filter.endDate=$filter('date')($scope.endDate,'yyyy-MM-dd');//成交截止日期
        $scope.filter.rukuStartDate=$filter('date')($scope.rukuStartDate,'yyyy-MM-dd');//入库审核起始日
        $scope.filter.rukuEndDate=$filter('date')($scope.rukuEndDate,'yyyy-MM-dd');   //入库审核截止日
        $scope.filter.outReivewTime=$filter('date')($scope.outReivewTime,'yyyy-MM-dd'); //成交日期
        $scope.ngTable.reload();
    };
}]);
