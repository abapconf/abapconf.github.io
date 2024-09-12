sap.ui.define([
	"abapconf/2024/org/controller/BaseController",
	"abapconf/2024/org/model/models",
	"sap/ui/core/Fragment"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (BaseController, models, Fragment) {
		"use strict";

		return BaseController.extend("abapconf.2024.org.controller.agenda.Agenda", {
			onInit: function () {
				this.setModel(models.createAgendaViewModel(), "agendaView");

				var oModel = this.getModel("agendaView");
				this.startCounter(oModel);
			},

			/*
			openSession: function(oEvent, sSlot, iSpeakerId) {
				console.log(sSlot);
				var oDataAgenda = this.getModel("agenda").getProperty("/" + sSlot);
				var oDataSpeaker = this.getModel("speakers").getProperty("/" + iSpeakerId);
				var oModel = models.createSessionDetailModel(oDataAgenda, oDataSpeaker);
				console.log(oModel);
				//this.openQuickView(oEvent, oModel);				
			},
			*/
			openSession: function(oEvent, sSlot) {
				console.log(sSlot);
				
				this.getRouter().navTo("Session", {
					id: sSlot
				});

			},


			openQuickView: function (oEvent, oModel) {
				var oButton = oEvent.getSource(),
					oView = this.getView();
	
				if (!this._pQuickView) {
					this._pQuickView = Fragment.load({
						id: oView.getId(),
						name: "abapconf.2024.org.view.agenda.Details",
						controller: this
					}).then(function (oQuickView) {
						oView.addDependent(oQuickView);
						return oQuickView;
					});
				}
				this._pQuickView.then(function (oQuickView){
					oQuickView.setModel(oModel);
					oQuickView.openBy(oButton);
				});
			},

			/**
			 * Triggered by user
			 * Select language of sessions to show in agenda
			 * @param {*} oEvent 
			 */
			 changeAgendaLanguage: function(oEvent) {
				var sKey = oEvent.getParameter("selectedItem").getKey();
				var oModel = this.getView().getModel("agendaView");

				// de
				// en

				switch (sKey)  {
					case "de":
						oModel.setProperty("/showEnglish", true);
						oModel.setProperty("/showGerman", false);
						break;
					case "en":
						oModel.setProperty("/showEnglish", false);
						oModel.setProperty("/showGerman", true);
						break;					
					default: 
						oModel.setProperty("/showEnglish", false);
						oModel.setProperty("/showGerman", false);
					break;
				}
			},


			/**
			 * Triggered by user.
			 * Select which track to hide or show
			 * @param {*} oEvent 
			 */
			 changeAgendaTracks: function(oEvent) {
				var sKey = oEvent.getParameter("selectedItem").getKey();
				var oModel = this.getView().getModel("agendaView");
				var bPhone = this.getModel("device").getProperty("/system/phone");

				switch (sKey)  {
					case "track1":
						oModel.setProperty("/showTrack1", true);
						oModel.setProperty("/showTrack2", false);
						oModel.setProperty("/showTrack3", false);
						oModel.setProperty("/showTableChannel3", false);
						if (bPhone) {
							oModel.setProperty("/hideTableChannel12", false);
						}
						break;
					case "track2":
						oModel.setProperty("/showTrack1", false);
						oModel.setProperty("/showTrack2", true);
						oModel.setProperty("/showTrack3", false);
						oModel.setProperty("/showTableChannel3", false);
						if (bPhone) {
							oModel.setProperty("/hideTableChannel12", false);
						}
						break;
					case "track3":
						oModel.setProperty("/showTrack1", false);
						oModel.setProperty("/showTrack2", false);
						oModel.setProperty("/showTrack3", true);
						oModel.setProperty("/showTableChannel3", true);
						if (bPhone) {
							oModel.setProperty("/hideTableChannel12", true);
						}
						break;
					default: 
						oModel.setProperty("/showTrack1", true);
						oModel.setProperty("/showTrack2", true);
						oModel.setProperty("/showTrack3", true);
						oModel.setProperty("/showTableChannel3", true);
						if (bPhone) {
							oModel.setProperty("/hideTableChannel12", false);
						}
					break;
				}
			},

			
			/**
			 * Navigates to the speaker detail page
			 * 
			 * Speaker detail to open is given by parameter iSpeaker, that is the speaker ID
			 * 
			 * @param {*} oEvent 
			 * @param {integer} iSpeaker 
			 * @public
			 */
			openSpeaker: function(oEvent, iSpeaker) {
				this.getRouter().navTo("SpeakerDetail", {
					id: iSpeaker
				});
			}
		});
	});
