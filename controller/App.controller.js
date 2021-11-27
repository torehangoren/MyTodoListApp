sap.ui.define([
	"sap/ui/Device",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/json/JSONModel"
], function (Device, Controller, Filter, FilterOperator, JSONModel) {
	"use strict";

	return Controller.extend("goto.todo.controller.App", {

		//CONSTANTS
		cTOPIC_ID: 1,

		onInit: function () {



		},
		onLoginTap: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("main");
		}



	});

});
