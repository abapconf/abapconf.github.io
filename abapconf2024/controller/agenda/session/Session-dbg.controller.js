sap.ui.define([
	"abapconf/2024/org/controller/BaseController",
	"abapconf/2024/org/model/models",
	"sap/ui/core/Fragment",
	"sap/m/library",
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (BaseController, models, Fragment, mobileLibrary) {
		"use strict";

		var URLHelper = mobileLibrary.URLHelper;
		return BaseController.extend("abapconf.2024.org.controller.agenda.session.Session", {
			onInit: function () {				
                this.getRouter().getRoute("Session").attachPatternMatched(this._onObjectMatched, this);
			},


			_onObjectMatched: function (oEvent) {

                this.getView().setModel(models.createSessionDetailSpeakerModel(), "sessionSpeakers");

                var sId = oEvent.getParameter("arguments").id;                
                var oState = this.getModel("agenda").dataLoaded();
                oState.then( function() {
                    var aData = this.getModel("agenda").getData();

                    this.getView().bindElement({
                        path: "/"+sId+"",
                        model: "agenda"
                    });

                    var aSpeakers = aData[sId].speakerids;

                    this.getModel("speakers").dataLoaded()                    
                    .then( () => {

                        for (let i in aSpeakers) {
                            var aSpeakerData = this.getModel("speakers").getData();
                            var index = aSpeakerData.findIndex(x => x.id === aSpeakers[i]);
                            var oData = this.getModel("speakers").getProperty("/"+index);
                            
                            let aSessionSpeaker = this.getModel("sessionSpeakers").getProperty("/");
                            aSessionSpeaker.push(oData);
                            this.getModel("sessionSpeakers").setProperty("/", aSessionSpeaker);
                            
                        }
                    });
                }.bind(this));

            }

		});
	});
