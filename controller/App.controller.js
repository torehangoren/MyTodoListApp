
// JavaScript Libs includes
jQuery.sap.require("goto.todo.libs.md5");

sap.ui.define([
	"sap/ui/Device",
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function (Device, Controller) {
	"use strict";

	return Controller.extend("goto.todo.controller.App", {

		//CONSTANTS
		cTOPIC_ID: 1,

		onInit: function () {

		},
		onLoginTap: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var sInputUser = this.getView().byId("uid").getValue();
			var sInputPass = this.getView().byId("pasw").getValue();
			var oJSONModel = new sap.ui.model.json.JSONModel();
			var aResult = [];

			$.ajax({
				url: 'loginAuth.php',
				type: "POST",
				async: false,
				data: { user: sInputUser, pass: CryptoJS.MD5(sInputPass).toString() },
				success: function (data) {
					aResult = JSON.parse(data);
					if (aResult.result.length > 0) {
						oRouter.navTo(aResult.result[0].ROUTE);
					} else {
						MessageBox.error("Hatalı Kullanıcı adı veya Şifre!");
					}
				}.bind(this),
				error: function (err) {
					console.log(err);
				}
			});
		}



	});

});
