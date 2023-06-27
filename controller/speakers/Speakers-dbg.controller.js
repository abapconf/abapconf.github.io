sap.ui.define([
	"abapconf/2023/org/controller/BaseController"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (BaseController) {
		"use strict";

		return BaseController.extend("abapconf.2023.org.controller.speakers.Speakers", {
			onInit: function () {
				window.addEventListener('hashchange', function() {
					_paq.push(['setCustomUrl', '/#/speakers' + window.location.hash.substr(1)]);
					_paq.push(['setDocumentTitle', 'Speakers']);
					_paq.push(['trackPageView']);
				});
			}
		});
	});
