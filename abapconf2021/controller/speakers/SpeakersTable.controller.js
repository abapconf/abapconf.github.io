sap.ui.define(["abapconf/web/abapconf/controller/BaseController","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(e,t,a){"use strict";return e.extend("abapconf.web.abapconf.controller.speakers.SpeakersTable",{onInit:function(){},openSpeakerDetail:function(e){console.log("openSpeakerDetail");var t=e.getParameter("listItem");var a=t.getBindingContextPath();var n=this.getModel("speakers").getProperty(a+"/id");this.getRouter().navTo("SpeakerDetail",{id:n})},doSearch:function(e){console.log("doSearch");var n=e.getParameter("query");var r=this.byId("tblSpeaker");var o=[];if(n){o.push(new t({filters:[new t("shortBio",a.Contains,n),new t("firstname",a.Contains,n),new t("lastname",a.Contains,n),new t("sessions/0/title",a.Contains,n)],and:false}))}var i=r.getBinding("items");i.filter(o)}})});