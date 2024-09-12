sap.ui.define([
	"abapconf/2024/org/controller/BaseController",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"abapconf/2024/org/model/models"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (BaseController, Filter, FilterOperator, models) {
		"use strict";

		return BaseController.extend("abapconf.2024.org.controller.speakers.SpeakersTable", {
			onInit: function () {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.getRoute("Speakers").attachPatternMatched(this._onShowSpeakers, this);
			}, 

			_onShowSpeakers: function() {

				var model = models;
				var that = this;
				this.getView().getModel("speakers").dataLoaded()
				.then( () => {
				
					let speakers = this.getView().getModel("speakers").getData();
					let count = speakers.length;
					//let rows = count / 3;
	
					let speakersTable = [];
					for (let i = 0; i < speakers.length; i += 3) {
						const chunk = speakers.slice(i, i + 3);
						speakersTable.push(chunk);
					}
					that.setModel(model.createSpeakersViewModel(speakersTable), "speakersTable");

				});
				

			},


			
			
			/**
			 * Handle event to open speaker details
			 * 
			 * @param {sap.ui.base.Event} oEvent Press event from ListItem
			 */
			openSpeakerDetail: function(oEvent) {
				
				var oCtx = oEvent.getSource().mBindingInfos.src.binding.getContext();
				var sPath = oCtx.getPath();
				var sId = this.getModel("speakersTable").getProperty(sPath + "/id");
				
				this.getRouter().navTo("SpeakerDetail", {
					id: sId
				});
				
			},
			

			/**
			 * Search the speaker table
			 * 
			 * Triggered when the user enters a search term. Searches for all fields in the table
			 * 
			 * @param {*} oEvent 
			 * @public
			 */
			doSearch: function(oEvent) {
				console.log("doSearch");

				var sQuery = oEvent.getParameter("query");
				var oTable = this.byId("tblSpeaker");
				var aFilter = [];
				
				if (sQuery) {
					aFilter.push(
						new Filter({
							filters: [
								new Filter("shortBio", FilterOperator.Contains, sQuery),
								new Filter("firstname", FilterOperator.Contains, sQuery),
								new Filter("lastname", FilterOperator.Contains, sQuery),
								new Filter("sessions/0/title", FilterOperator.Contains, sQuery)
							],
							and: false
						})
					);
				}
				// filter binding
				var oBinding = oTable.getBinding("items");
				oBinding.filter(aFilter);
			}


		});
	});
