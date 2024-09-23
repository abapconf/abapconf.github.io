sap.ui.define([
	"abapconf/2024/org/controller/BaseController",
	"sap/m/library"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (BaseController, mobileLibrary) {
		"use strict";

		var URLHelper = mobileLibrary.URLHelper;

		return BaseController.extend("abapconf.2024.org.controller.agenda.community.Watchparty", {
			onInit: function () {

			},

			onLoadMap: function(oEvent) {
				
				// get address information from binding
				let sPath = oEvent.getSource().getParent().getBindingContextPath();
				let watchParty = this.getModel("community").getProperty(sPath);
				let address = watchParty.address;

				this._openMap(address);
			},

			/**
			 * Open Google Maps with address as location parameter
			 * @param {*} address 
			 */
			_openMap: function(address) {

				// construct address
				address = this._encodeString(address);
				const mapsUrl = "https://www.google.com/maps/search/?api=1";
				const params = "&query=";
				
				// open url
				URLHelper.redirect(mapsUrl +  params + address, true);
			},

			/**
			 * Encode address in Google Maps format
			 * space: +
			 * comma: %2C
			 * See: https://developers.google.com/maps/documentation/urls/get-started?hl=de
			 * @param {*} value 
			 * @returns 
			 */
			_encodeString: function(value) {
				const regexSpace = / /g;
				const regexComma = /,/g;
				
				value = value.replace(regexSpace, '+');				
				value = value.replace(regexComma, '%2C');

				return value;
			}
            
		});
	});
