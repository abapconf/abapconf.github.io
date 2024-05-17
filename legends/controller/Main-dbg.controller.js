"use strict";

sap.ui.define(["./BaseController", "sap/m/GroupHeaderListItem", "sap/ui/model/Filter"], function (__BaseController, GroupHeaderListItem, Filter) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const BaseController = _interopRequireDefault(__BaseController);
  /**
   * @namespace org.abapconf.legends.controller
   */
  const Main = BaseController.extend("org.abapconf.legends.controller.Main", {
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
      console.log("createFilter for %s", event);
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
