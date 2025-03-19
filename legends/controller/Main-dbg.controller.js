"use strict";

sap.ui.define(["./BaseController", "sap/m/GroupHeaderListItem", "sap/ui/model/Filter", "../model/models"], function (__BaseController, GroupHeaderListItem, Filter, __Models) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const BaseController = _interopRequireDefault(__BaseController);
  const Models = _interopRequireDefault(__Models);
  /**
   * @namespace org.abapconf.legends.controller
   */
  const Main = BaseController.extend("org.abapconf.legends.controller.Main", {
    onInit: function _onInit() {
      const router = this.getOwnerComponent().getRouter();
      router.getRoute("main").attachPatternMatched(this.onObjectMatched, this);
    },
    onObjectMatched: async function _onObjectMatched(event) {
      // get number of speakers and add as parameter to description
      const speakers = this.getModel().getProperty("/");
      const i18nModel = await this.getResourceBundle();
      const text = i18nModel.getText("legendsNumber", speakers.length);

      // set main view
      const mainView = await Models.createMainViewModel();
      mainView.setProperty("/legendsNumber", text);
      this.setModel(mainView, "mainView");
    },
    openSpeakerDetail: async function _openSpeakerDetail(event) {
      // get path to clicked speaker
      const control = event.getSource();
      const ctx = control.getBindingContext();
      const path = ctx.getPath();

      //const path: string = event.getSource().getBindingContext().getPath() as string;

      // load fragment if not already done
      this.dialog ??= await this.loadFragment({
        name: "org.abapconf.legends.view.fragment.SpeakerDialog"
      });

      // bind to speaker
      this.dialog.bindElement(path);
      this.dialog.open();
    },
    onCloseDialog: function _onCloseDialog() {
      // note: We don't need to chain to the pDialog promise, since this event-handler
      // is only called from within the loaded dialog itself.
      this.byId("speakerDialog")?.close();
    },
    /**
     * Format the provided event name from the speakers model into a human readable text
     * @param eventid 
     * @returns 
     */
    getEventName: function _getEventName(eventid) {
      // use event id to get text from i18n
      const bundle = this.geti18nModel();
      const eventName = bundle.getText(eventid.key);

      // build group header with name from i18n
      const settings = {
        title: eventName,
        uppercase: false
      };
      return new GroupHeaderListItem(settings);
    },
    /**
     * Filter grid by event
     * @param event 
     */
    doFilterByABAPConf: function _doFilterByABAPConf(event) {
      const control = this.byId("gridSpeakers");
      const binding = control.getBinding("content");
      if (event === "all") {
        binding.filter([]);
      } else {
        const filter = this.createFilter(event);
        binding.filter([filter]);
      }
    },
    /**
     * Create filter based on event
     * @param event 
     * @returns 
     */
    createFilter: function _createFilter(event) {
      //console.log("createFilter for %s", event);

      const filter = new Filter({
        path: 'events',
        test: function (aValue) {
          const result = aValue.filter(item => item === event);
          return result.length > 0 ? true : false;
        }
      });
      return filter;
    }
  });
  return Main;
});
//# sourceMappingURL=Main-dbg.controller.js.map
