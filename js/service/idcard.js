"use strict"
module.exports = function (app) {
	var init = false
	app.factory("$idcard", function () {
		return {
			init: function () {
				if ($('#__idCardReaderCtrl').length > 0){
					
				}else{
					$('body').append('<OBJECT style="display:block;width:1px;height:1px;left:-1600px;position:absolute;" ID="__idCardReaderCtrl" CLASSID="CLSID:5F4B4271-D1B4-46FA-AEE5-3188E285E170"></OBJECT>');
				}
				try {
					if(init || $('#__idCardReaderCtrl')[0].init() > 0) {
						init = true
						return true;
					}
				}
				catch (e) {
					return false;
				}
			},
			read: function () {
				var ctrl = $('#__idCardReaderCtrl')[0];
				//if(typeof(id) == 'string'){
				//	ctrl = $(id)[0];
				//}
				//ctrl.SetReadType(0);
				var nRet = ctrl.read();
				if (nRet) {
					var datetime = new Date();
					var year = datetime.getFullYear();
					var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
					var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
					var cur = year + '' + month + '' + date;
					var userLifeE = ctrl.UserLifeE;
					if (cur > userLifeE) {
						alert("身份证已过有效期！");
						return false;
					} else {
						return {
							name: $.trim(ctrl.UserName), sex: ctrl.Sex, nation: ctrl.Nation,
							birthday: ctrl.birthday, address: $.trim(ctrl.Address), cardNo: ctrl.CardNo,
							userLifeE: $.trim(ctrl.useEnd)
							//base64img:ctrl.Base64Photo
						};
					}
				}
				else {
					return false;
				}
			}
		}
	})
}