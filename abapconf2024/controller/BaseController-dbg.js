sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/m/library",
	"sap/base/Log",
	"sap/ui/core/syncStyleClass"
], function (Controller, UIComponent, mobileLibrary, Log, syncStyleClass) {
	"use strict";

	// shortcut for sap.m.URLHelper
	var URLHelper = mobileLibrary.URLHelper;

	return Controller.extend("abapconf.2024.org.controller.BaseController", {
		/**
		 * Convenience method for accessing the router.
		 * @public
		 * @returns {sap.ui.core.routing.Router} the router for this component
		 */
		getRouter : function () {
			return UIComponent.getRouterFor(this);
		},


		/**
		 * Convenience method for getting the view model by name.
		 * @public
		 * @param {string} [sName] the model name
		 * @returns {sap.ui.model.Model} the model instance
		 */
		getModel : function (sName) {
			return this.getView().getModel(sName);
        },
        

        /**
         * Navigate to given target
         * @public
         * @param {string} sTarget name of view to navigate to
         */
        navTo: function (sTarget) {
            this.getRouter().navTo(sTarget);
        },
        
        
        /**
		 * Convenience method for getting the logger.
		 * @public
		 * @param {string} [sComponent] the component name
		 * @returns {sap.base.Log.Logger} the logger instance
		 */
		getLogger: function(sComponent) {
			var oLogger = Log.getLogger(sComponent);
			oLogger.setLevel(4); // set debug mode
			return oLogger;
		},


		/**
		 * Convenience method for setting the view model.
		 * @public
		 * @param {sap.ui.model.Model} oModel the model instance
		 * @param {string} sName the model name
		 * @returns {sap.ui.mvc.View} the view instance
		 */
		setModel : function (oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},

        
		/**
		 * Getter for the resource bundle.
		 * @public
		 * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
		 */
		getResourceBundle : function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},

		/**
		 * Calculate if the event is live or not
		 */
		startCounter: function(oModel) {

			const calcTimeUntilEventStarts = () => {
				var sStartTime = "2024-12-05T08:30:00+01:00";
				//var sStartTime = "2024-11-26T08:45:00+01:00";
				var date = new Date(sStartTime);
				var timeCountdown = date.getTime();
	
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
	
				// check if pos go live date (event date + 4)
				const diff = Math.floor((new Date() - date) / (1000*60*60*24))
				if (diff > 4) {
					oModel.setProperty("/aftergolive", true);
				}
			}

			setInterval(calcTimeUntilEventStarts, 1000);
		},
        
        
		/**
		* Adds a history entry in the FLP page history
		* @public
		* @param {object} oEntry An entry object to add to the hierachy array as expected from the ShellUIService.setHierarchy method
		* @param {boolean} bReset If true resets the history before the new entry is added
		*/
		addHistoryEntry: (function() {
			var aHistoryEntries = [];

			return function(oEntry, bReset) {
				if (bReset) {
					aHistoryEntries = [];
				}

				var bInHistory = aHistoryEntries.some(function(oHistoryEntry) {
					return oHistoryEntry.intent === oEntry.intent;
				});

				if (!bInHistory) {
					aHistoryEntries.push(oEntry);
					this.getOwnerComponent().getService("ShellUIService").then(function(oService) {
						oService.setHierarchy(aHistoryEntries);
					});
				}
			};
		})()

	});

});