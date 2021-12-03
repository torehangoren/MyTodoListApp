sap.ui.define([
	"sap/ui/Device",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/json/JSONModel"
], function (Device, Controller, Filter, FilterOperator, JSONModel) {
	"use strict";

	return Controller.extend("goto.todo.controller.Main", {

		//CONSTANTS
		cTOPIC_ID: 1,
		cPC_SEGMENT_ID: "SBFilterTabsPCID",
		cMobile_SEGMENT_ID: "SBFilterTabsMobileID",

		//GLOBALE VARIABLES
		sTABKEY: "all",

		onInit: function () {

			this.getView().setModel(new JSONModel({
				isMobile: Device.browser.mobile,
				filterText: undefined
			}), "view");

			this._getItems();

		},

		_getItems: function () {
			var oJSONModel = new sap.ui.model.json.JSONModel();
			var oCompletedModel = new sap.ui.model.json.JSONModel();
			var oActiveModel = new sap.ui.model.json.JSONModel();
			var aResult = [];
			var aCompletedItems = [];
			var aActiveItems = [];

			$.ajax({
				url: 'getItems.php',
				async: false,
				success: function (data) {
					aResult = JSON.parse(data);
					aResult.result.forEach(function (oResult) {
						oResult.ID = parseInt(oResult.ID, 10);
						oResult.TOPIC_ID = parseInt(oResult.TOPIC_ID, 10);

						if (oResult.COMPLETED === "1") {
							oResult.COMPLETED = true;
							aCompletedItems.push(oResult);
						} else {
							oResult.COMPLETED = false;
							aActiveItems.push(oResult);
						}

					});

					oJSONModel.setData(aResult.result);
					oCompletedModel.setData(aCompletedItems);
					oActiveModel.setData(aActiveItems);
					this.getOwnerComponent().setModel(oJSONModel, "shown");
					this.getView().setModel(oJSONModel, "shown");
					this.getView().setModel(oJSONModel, "all");
					this.getView().setModel(oActiveModel, "active");
					this.getView().setModel(oCompletedModel, "completed");

					//set the current tab again
					if (this.getView().getModel("view").getData().isMobile) {
						this.getView().byId(this.cMobile_SEGMENT_ID).setSelectedKey(this.sTABKEY);
					} else {
						this.getView().byId(this.cPC_SEGMENT_ID).setSelectedKey(this.sTABKEY);
					}
					this.getView().setModel(this.getView().getModel(this.sTABKEY), "shown");
				}.bind(this),
				error: function (err) {
					console.log(err);
				}
			});
		},
		onAddNewTodo: function (oEvent) {

			var aData = this.getView().getModel("all").getData();
			var iID = 0;
			var aLastItem = [];

			if (aData.length > 0) {
				aLastItem = this._arraySort(aData, "ID");
				iID += aLastItem[0].ID + 1;
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
			var aData = this.getView().getModel("shown").getData();
			aData.forEach(function (oItem) {
				if (oItem.COMPLETED) {
					$.ajax({
						url: 'deleteItem.php',
						type: "POST",
						async: false,
						data: { id: oItem.ID, topic_id: oItem.TOPIC_ID },
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
			var iID = null;
			var iTOPIC_ID = null;
			var sCompleted = "0";
			this.getView().getModel("shown").getData().forEach(function (oItem) {
				if (parseInt(oEvent.getSource().getProperty("name"), 10) === oItem.ID) {
					iID = oItem.ID;
					iTOPIC_ID = oItem.TOPIC_ID;
					return;
				}
			});

			if (!iTOPIC_ID) {
				return;
			}

			if (oEvent.getSource().getProperty("selected")) {
				sCompleted = "1";
			}

			if (this.getView().getModel("view").getData().isMobile) {
				this.sTABKEY = this.getView().byId(this.cMobile_SEGMENT_ID).getProperty("selectedKey");
			} else {
				this.sTABKEY = this.getView().byId(this.cPC_SEGMENT_ID).getProperty("selectedKey");
			}

			$.ajax({
				url: 'updateItem.php',
				type: "POST",
				async: false,
				data: { id: iID, topic_id: iTOPIC_ID, completed: sCompleted },
				success: function (data) {
					this._getItems();
				}.bind(this),
				error: function (err) {
					console.log(err);
				}
			});


		},
		_arraySort: function (aData, att) {
			return aData.sort(function (a, b) {
				var y = a[att]; var x = b[att];
				return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			});
		},
		onFilter: function (oEvent) {
			this.sTABKEY = oEvent.getSource().getProperty("selectedKey");
			this.getView().setModel(this.getView().getModel(this.sTABKEY), "shown");

		}



	});

});
