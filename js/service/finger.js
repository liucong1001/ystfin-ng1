"use strict"
module.exports = function (app) {
	app.factory("$finger", function () {
		return {
			init: function () {
				if ($('#__fingerprintCtrl').length > 0) return;
				$('body').append('<OBJECT style="display:none;width:200px;height:100px;bottom:300px;;left:600px;position:absolute;" ID="__fingerprintCtrl" CLASSID="CLSID:D9AD2CC2-A3D7-4990-894E-8A125149A0D7"></OBJECT>');
			},
			read: function (callback) {
				this.init()
				var uploadUrl = location.protocol + '//' + location.host + '/common/upload/single'
				var fgctrl = document.getElementById('__fingerprintCtrl')
				try {
					$(fgctrl).show()
					console.log('+++++++')
					fgctrl.read(uploadUrl, $.proxy(function (success, filename, base64) {
						console.log('-----', filename)
						$(fgctrl).hide()
						callback.call(this, success, filename, base64)
					}, this))
				}
				catch (e) {
					callback(false)
					alert('指纹控件未安装!')
				}
			},
			verify: function (base64, callback) {
				this.init()
				var fgctrl = document.getElementById('__fingerprintCtrl')
				try {
					$(fgctrl).show()
					fgctrl.verify(base64, $.proxy(function (success) {
						$(fgctrl).hide()
						callback.call(this, success)
					}, this))
				}
				catch (e) {
					callback(false)
					alert('指纹控件未安装!')
				}
			}
		}
	})
}
