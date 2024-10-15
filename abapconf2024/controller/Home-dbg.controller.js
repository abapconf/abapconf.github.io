sap.ui.define([
	"./BaseController",
	"abapconf/2024/org/model/models",
	"sap/m/library"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (BaseController, models, mobileLibrary) {
		"use strict";

		var URLHelper = mobileLibrary.URLHelper;

		return BaseController.extend("abapconf.2024.org.controller.Home", {
			onInit: function () {

				var oHeaderModel = models.createHeaderViewModel();
				this.setModel(oHeaderModel, "homeView");

				var oModel = this.getModel("homeView");
				this.startCounter(oModel);

            },

			navToBrandeis: function() {
				let sUrl = "https://www.brandeis.de";
				this._navTo(sUrl);
			},

			navToCadaxo: function() {
				let sUrl = "https://www.cadaxo.com";
				this._navTo(sUrl);
			},

			navToS4Fit: function() {
				let sUrl = "https://www.s4fit.net/";
				this._navTo(sUrl);
			},

			navToEspressoTutorials: function() {
				let sUrl = "https://www.espresso-tutorials.de/";
				this._navTo(sUrl);
			},

			_navTo: function(sUrl) {
				URLHelper.redirect(sUrl, false);
			}

		});
	});
