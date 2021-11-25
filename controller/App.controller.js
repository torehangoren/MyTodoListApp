sap.ui.define([
	"sap/ui/Device",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/json/JSONModel"
], function(Device, Controller, Filter, FilterOperator, JSONModel) {
	"use strict";

	return Controller.extend("goto.todo.controller.App", {

		//CONSTANTS
		cTOPIC_ID: 1,

		onInit: function() {
			this.aSearchFilters = [];
			this.aTabFilters = [];

			this.getView().setModel(new JSONModel({
				isMobile: Device.browser.mobile,
				filterText: undefined
			}), "view");

			this._getItems();

		},

		_getItems(){
			var oJSONModel = new sap.ui.model.json.JSONModel();
			var aResult = [];

		$.ajax({                                      
		      url: 'getItems.php',                  
		      async:false,        
		      success: function(data) {
				  aResult = JSON.parse(data);
				  aResult.result.forEach(function(oResult){
					  if(oResult.COMPLETED === "1"){
						oResult.COMPLETED = true;
					} else {
						oResult.COMPLETED = false; 
					}
							});
				  
				oJSONModel.setData(aResult);
				this.getView().setModel(oJSONModel);
			      }.bind(this),
		      error: function(err){
		    	  console.log(err);
		      }
		    });
		},
		onAddNewTodo: function(oEvent){
			
		$.ajax({                                       
			url: 'addItem.php',     
			type: "POST",              
			async:false, 
			data: { text: oEvent.getParameter("value"), completed: "0", topic_id: this.cTOPIC_ID },       
			success: function(data) {
				this._getItems();
				}.bind(this),
			error: function(err){
				console.log(err);
			}
		  });
		}, 
		clearCompleted: function(oEvent){
			
			this.getView().getModel().getData().result.forEach(function(oItem){
					if(oItem.COMPLETED){
						$.ajax({                                       
							url: 'deleteItem.php',     
							type: "POST",              
							async:false, 
							data: { text: oItem.TEXT, completed: "1", topic_id: oItem.TOPIC_ID },       
							success: function(data) {
								this._getItems();
								}.bind(this),
							error: function(err){
								console.log(err);
							}
						  });
							}});

			}, 
			onCbCompleted: function (oEvent){
				var aSelectedLine = oEvent.getSource().getBindingContext().getObject();
				
				this.getView().getModel().getData().result.forEach(function(oItem){
					if(aSelectedLine.TEXT === oItem.TEXT && aSelectedLine.TOPIC_ID === oItem.TOPIC_ID){
						oItem === aSelectedLine;
							}});
			}



	});

});
