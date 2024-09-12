sap.ui.define([
	"./BaseController",
	"abapconf/2024/org/model/models"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (BaseController, models) {
		"use strict";

		return BaseController.extend("abapconf.2024.org.controller.Home", {
			onInit: function () {

				var oHeaderModel = models.createHeaderViewModel();
				this.setModel(oHeaderModel, "homeView");

				var oModel = this.getModel("homeView");
				this.startCounter(oModel);

            },

		});
	});
