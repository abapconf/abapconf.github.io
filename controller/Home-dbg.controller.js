sap.ui.define([
	"./BaseController",
	"abapconf/2023/org/model/models"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (BaseController, models) {
		"use strict";

		return BaseController.extend("abapconf.2023.org.controller.Home", {
			onInit: function () {

				var oHeaderModel = models.createHeaderViewModel();
				this.setModel(oHeaderModel, "homeView");

				this._startCounter();

            },

			_startCounter: function() {

				var sStartTime = "2023-12-07T08:30:00+01:00";
				//var sStartTime = "2021-12-07T08:45:00+01:00";
				var date = new Date(sStartTime);
				var timeCountdown = date.getTime();
				// model
				var oModel = this.getModel("homeView");

				// Get today's date and time
				var now = new Date().getTime();
					
				// Find the distance between now and the count down date
				var distance = timeCountdown - now;
					
				// Time calculations for days, hours, minutes and seconds
				var days = Math.floor(distance / (1000 * 60 * 60 * 24));
				var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
				var seconds = Math.floor((distance % (1000 * 60)) / 1000);
			
				oModel.setProperty("/day", days);
				oModel.setProperty("/hour", hours < 10 ? "0"+hours : hours);
				oModel.setProperty("/minute", minutes < 10 ? "0"+minutes : minutes);
				oModel.setProperty("/second", seconds < 10 ? "0"+seconds : seconds);

				if (days < 0 && hours < 0 && minutes < 0 && seconds < 0) {
					oModel.setProperty("/live", true);
				}
			},
            
		});
	});
