sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function (JSONModel, Device) {
	"use strict";
			
	return {

		channel1: "https://youtube.com/live/SnKqmgOMdqY",
		channel2: "https://youtube.com/live/5saGqydX6VE",
		channel3: "https://youtube.com/live/_5dnL6AZfnA",
	
		createDeviceModel: function () {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

		createHeaderViewModel: function() {
			var oData = {
				day: 0,
				hour: 0,
				minute: 0,
				second: 0,
				live: false,
				aftergolive: false,
				channel1: this.channel1,
				channel2: this.channel2,
				channel3: this.channel3
			};
			var oModel = new JSONModel(oData);
			return oModel;
		},

		createSessionDetailModel: function(oDataAgenda, oDataSpeaker) {
			oDataAgenda.info = oDataSpeaker;
			var oModel = new JSONModel(oDataAgenda);
			return oModel;
		},

		createSessionDetailSpeakerModel: function() {
			var oModel = new JSONModel([]);
			return oModel;
		},


		createSpeakersViewModel: function(speakers) {
			var oModel = new JSONModel(speakers);
			return oModel;
		},

		createAgendaViewModel: function() {

			// check if device is phone to set visible mode correctly for agenda table with Channel 1 and 2
			var oData = {
				showTrack1: true,
				showTrack2: true,
				showTrack3: true,
				showTableChannel3: true,
				hideTableChannel12: false,
				showEnglish: false,
				showGerman: false,
				showIcs: false,
				showSlides: true,
				showITregistration: true,
				open: false,
				videoicon: "sap-icon://video",
				channel1: this.channel1,
				channel2: this.channel2,
				channel3: this.channel3,
				day: 0,
				hour: 0,
				minute: 0,
				second: 0,
				live: false
			};
			var oModel = new JSONModel(oData);
			return oModel;
		},


		createFooterViewModel: function() {
			var oModel = new JSONModel({
				"showCookieNotice": true
			});
			return oModel;
		}

	};
});