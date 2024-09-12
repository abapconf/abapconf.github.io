sap.ui.define([
	"abapconf/2024/org/controller/BaseController",
	"sap/ui/core/Fragment",
	"abapconf/2024/org/model/models"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (BaseController, Fragment, models) {
		"use strict";

		return BaseController.extend("abapconf.2024.org.controller.header.Header", {
			onInit: function () {
				var oHeaderModel = models.createHeaderViewModel();
				this.setModel(oHeaderModel, "headerView");

				var oModel = this.getModel("headerView");
				this.startCounter(oModel);
            },

            
            doNavigation: function($event, sTarget) {
                this.navTo(sTarget);
            },


			/**
			 * Show popover for lanuage selection
			 * 
			 * @param {sap.ui.base.Event} oEvent 
			 * @public
			 */
			onSelectLanguage: function(oEvent) {
				console.log("onSelectLanguage");

				var oSource = oEvent.getSource();
				var oView = this.getView();

				if (!this._oSelectLanguage) {
					this._oSelectLanguage = Fragment.load({
						id: oView.getId(),
						name: "abapconf.2024.org.view.dialog.SelectLanguage",
						controller: this
					}).then(function(oPopover) {
						oView.addDependent(oPopover);
						return oPopover;
					});
				}
				this._oSelectLanguage.then(function(oPopover) {
					oPopover.openBy(oSource);
				});

			},

			_closeSelectLanguage: function () {
				this.byId("selectLanguagePopover").close();
			},

			doChangeLanguage: function(oEvent) {
				var oItem = oEvent.getParameter("item");
				var sKey = oItem.getProperty("key");

				sap.ui.getCore().getConfiguration().setLanguage(sKey);
				
				this._closeSelectLanguage();
			}
		});
	});
