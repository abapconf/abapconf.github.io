import Event from "sap/ui/base/Event";
import BaseController from "./BaseController";
import Dialog from "sap/m/Dialog";
import GroupHeaderListItem, { $GroupHeaderListItemSettings } from "sap/m/GroupHeaderListItem";
import Filter from "sap/ui/model/Filter";
import Context from "sap/ui/model/Context";
import Control from "sap/ui/core/Control";
import Binding from "sap/ui/model/Binding";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import Models from "../model/models";

interface groupHeaderEvent {
    key: string;
}

/**
 * @namespace org.abapconf.legends.controller
 */
export default class Main extends BaseController {

	private dialog : Dialog;

    public onInit(): void {
        const router = this.getOwnerComponent().getRouter();
		router.getRoute("main").attachPatternMatched(this.onObjectMatched, this);
    }


    public async onObjectMatched(event: Event) {
        // get number of speakers and add as parameter to description
        const speakers = this.getModel().getProperty("/");
        const i18nModel: ResourceBundle = await this.getResourceBundle();
        const text = i18nModel.getText("legendsNumber", speakers.length);

        // set main view
        const mainView = await Models.createMainViewModel();
        mainView.setProperty("/legendsNumber", text);
        this.setModel(mainView, "mainView");
	}
    

	async openSpeakerDetail(event: Event): Promise<void> {

        // get path to clicked speaker
        const control: Control = event.getSource();
        const ctx: Context = control.getBindingContext();
        const path = ctx.getPath();

        //const path: string = event.getSource().getBindingContext().getPath() as string;

		// load fragment if not already done
        this.dialog ??= await <Promise<Dialog>> this.loadFragment({
             name: "org.abapconf.legends.view.fragment.SpeakerDialog",
        });

        // bind to speaker
		this.dialog.bindElement(path);

        this.dialog.open();
    }

	onCloseDialog(): void {
        // note: We don't need to chain to the pDialog promise, since this event-handler
        // is only called from within the loaded dialog itself.
        (<Dialog> this.byId("speakerDialog"))?.close();
    }

    /**
     * Format the provided event name from the speakers model into a human readable text
     * @param eventid 
     * @returns 
     */
    getEventName(eventid: groupHeaderEvent): GroupHeaderListItem {

        // use event id to get text from i18n
        const bundle = this.geti18nModel();
        const eventName: string = bundle.getText(eventid.key);

        // build group header with name from i18n
        const settings = {
            title: eventName,
            uppercase: false
        } as $GroupHeaderListItemSettings;

        return new GroupHeaderListItem(
            settings
        );
    }

    /**
     * Filter grid by event
     * @param event 
     */
    doFilterByABAPConf(event: string): void {
        const control: Control = this.byId("gridSpeakers") as Control;
        const binding: Binding = control.getBinding("content");

        if (event === "all") {
            binding.filter([]);
        } else {
            const filter: Filter = this.createFilter(event);
            binding.filter([filter]);
        }
        
    }

    /**
     * Create filter based on event
     * @param event 
     * @returns 
     */
    private createFilter(event: string): Filter {
        //console.log("createFilter for %s", event);
        
        const filter = new Filter(
            {
                path: 'events',
                test: function(aValue: string[]) {
                    const result: string[] = aValue.filter( (item) => item === event);
                    return result.length > 0 ? true : false;
                }
            });
        return filter;
    }

}
