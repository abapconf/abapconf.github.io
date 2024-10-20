sap.ui.define([
	"abapconf/2024/org/controller/BaseController"
],
/**
 * @param {typeof sap.ui.core.mvc.Controller} Controller
 */
function (BaseController) {
	"use strict";

	return BaseController.extend("abapconf.2024.org.controller.speakerDetail.SpeakerDetail", {
		onInit: function () {
			
			this.getRouter().getRoute("SpeakerDetail").attachPatternMatched(this._onObjectMatched, this);
		},


		_onObjectMatched: function (oEvent) {

			var sId = oEvent.getParameter("arguments").id;
			var oState = this.getModel("speakers").dataLoaded();
			oState.then( function() {
				var aData = this.getModel("speakers").getData();
				var index = aData.findIndex(x => x.id === sId);
				this.getView().bindElement({
					path: "/" + index,
					model: "speakers"
				});
			}.bind(this));

		}

	});
});
