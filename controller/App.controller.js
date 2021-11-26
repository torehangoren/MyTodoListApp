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

			this.getView().setModel(new JSONModel({
				isMobile: Device.browser.mobile,
				filterText: undefined
			}), "view");

			this._getItems();

		},

		_getItems() {
			var oJSONModel = new sap.ui.model.json.JSONModel();
			var aResult = [];

			$.ajax({
				url: 'getItems.php',
				async: false,
				success: function (data) {
					aResult = JSON.parse(data);
					aResult.result.forEach(function (oResult) {
						if (oResult.COMPLETED === "1") {
							oResult.COMPLETED = true;
						} else {
							oResult.COMPLETED = false;
						}
						oResult.ID = parseInt(oResult.ID, 10);
					});

					oJSONModel.setData(aResult);
					this.getView().setModel(oJSONModel);
				}.bind(this),
				error: function (err) {
					console.log(err);
				}
			});
		},
		onAddNewTodo: function (oEvent) {

			var aData = this.getView().getModel().getData().result;
			var iID = 0;
			var aLastItem = [];

			if (aData.length > 0) {
				aLastItem = this.sortByAttribue(aData, "ID");
				iID += aLastItem[0].ID;
			} else {
				iID = 1;
			}


			$.ajax({
				url: 'addItem.php',
				type: "POST",
				async: false,
				data: { text: oEvent.getParameter("value"), completed: "0", topic_id: this.cTOPIC_ID, id: iID },
				success: function (data) {
					this.getView().byId("addTodoItemInput").setValue("");
					this._getItems();
				}.bind(this),
				error: function (err) {
					console.log(err);
				}
			});
		},
		clearCompleted: function (oEvent) {
			aData.forEach(function (oItem) {
				if (oItem.COMPLETED) {
					$.ajax({
						url: 'deleteItem.php',
						type: "POST",
						async: false,
						data: { text: oItem.TEXT, completed: "0", topic_id: oItem.TOPIC_ID, id: oItem.ID },
						success: function (data) {
							this._getItems();
						}.bind(this),
						error: function (err) {
							console.log(err);
						}
					});
				}
			}.bind(this));

		},
		onCbCompleted: function (oEvent) {
			var aSelectedLine = oEvent.getSource().getBindingContext().getObject();

			this.getView().getModel().getData().result.forEach(function (oItem) {
				if (aSelectedLine.TEXT === oItem.TEXT && aSelectedLine.TOPIC_ID === oItem.TOPIC_ID) {
					oItem === aSelectedLine;
				}
			});
		},
		sortByAttribue: function(arr, attribute){
			return arr.sort(function(a,b) { 
				return a[attribute] < b[attribute];
			  });
		}



	});

});
