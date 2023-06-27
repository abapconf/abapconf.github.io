sap.ui.define([
	"abapconf/2023/org/controller/BaseController"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (BaseController) {
		"use strict";

		return BaseController.extend("abapconf.2023.org.controller.orga.OrgaTeam", {
			onInit: function () {
				window.addEventListener('hashchange', function() {
					_paq.push(['setCustomUrl', '/#/orga' + window.location.hash.substr(1)]);
					_paq.push(['setDocumentTitle', 'OrgaTeam']);
					_paq.push(['trackPageView']);
				});
			}
		});
	});
