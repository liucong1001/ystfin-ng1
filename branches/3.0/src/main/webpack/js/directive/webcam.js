"use strict"
module.exports = function (app) {
	app.factory("$webcam", [function () {
		return {
			show: function (x, y, fixed) {
				var ctrl = document.getElementById('__webcam')
				$(ctrl).css("left", x)
				$(ctrl).css("top", y)
				if (fixed) {
					$(ctrl).css("position", "fixed")
				}
				else {
					$(ctrl).css("position", "absolute")
				}
				$(ctrl).show()
			},
			hide: function () {
				$('#__webcam').hide()
			},
			setBox: function (box) {
				var ctrl = document.getElementById('__webcam');
				try {
					ctrl.setBox(box.x, box.y, box.width, box.height);
				}
				catch (e) {
					alert('摄像头纹控件未安装!');
				}
			},
			// 1 - 身份证 2 - 全屏 0 - 自动
			setRangeType: function (type) {
				var ctrl = document.getElementById('__webcam');
				try {
					ctrl.RangeType = type;
				}
				catch (e) {
					alert('摄像头纹控件未安装!');
				}
			},
			upload: function (callback,xuanzhuan) {
				var uploadUrl = location.protocol + '//' + location.host + '/common/upload/single';
				if(xuanzhuan == true){
					uploadUrl += '?xuanzhuan=true';
				}
				var ctrl = document.getElementById('__webcam');
				try {
					ctrl.snapshot(uploadUrl, $.proxy(function (success, filename) {
						if (callback)callback(success, filename);
					}, xuanzhuan));
				}
				catch (e) {
					console.log(e)
					if (callback) callback(false);
					alert('摄像头纹控件未安装!');
				}
			}
		}
	}])
	app.directive('ngWebcam', function () {
		return {
			restrict: "E",
			replace: false,
			scope: {
				width: "=",
				height: "=",
				affix: "="
			},
			link: function (scope, element, attrs) {
				if (scope.affix) {
					$(element).affix(scope.affix)
				}
				scope.$on('$destroy', function () {
					console.log("destroy");
					var ctrl = document.getElementById('__webcam');
					ctrl.remove()
//					ctrl.
				})
			},
			template: require("./html/webcam.html")
		}
	})
}
