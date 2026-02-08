import { MODULE_NAME } from "../../../../const";
import notCommon from "../../../../../../not-bulma/src/frame/common";
import UIInformOptionsUpdate from "./inform.options.update.svelte";
import CRUDActionUpdate from "not-bulma/src/frame/crud/actions/update";
import { UIAdapterSvelte } from "not-bulma/src/frame";

const DATA_MODEL_NAME = "options";

class ncaInformUpdate extends CRUDActionUpdate {
    /**
     * @static {object} UIConstructor    constructor of UI component
     */
    static get UIConstructor() {
        return UIInformOptionsUpdate;
    }

    static async loadData(controller, params) {
        return await controller
            .getModel(DATA_MODEL_NAME, {
                moduleName: MODULE_NAME,
            })
            .$getForModule();
    }

    /**
     * Creates object with all options needed to initialize UI component
     * @param {object} controller   instance of controller
     * @param {object} response     API reponse object
     * @returns {object}    ui options object
     */
    static prepareUIOptions(controller, response) {
        return {
            title: "Настройки информера",
            subtitle: "шлюзы для отправки сообщений и правила фильтрации сообщений",
            options: this.TRANSFORMER(
                notCommon.stripProxy(response.result)
            ) || {},
        };
    }

    static buildUI(controller, options){
        this.setUI(controller, new UIAdapterSvelte(this.UIConstructor, controller.getContainerInnerElement(), options));
    }

    /**
     * Binds events to action UI
     * @param {object} controller   instance of controller
     * @param {string[]} params     list of route params
     * @param {object} response     API response
     */
    static bindUIEvents(controller, params, response) {
        if (notCommon.isFunc(controller.goBack)) {
            this.bindUIEvent(controller, "onreject", () =>
                this.goBack(controller)
            );
        }

        this.bindUIEvent(controller, "onsubmit", async (ev) => {
            const success = await this.saveToServer(controller, ev);
            if (success) {
                this.goBackAfterDelay(controller);
            }
        });

        this.bindUIEvent(controller, "onExportToJSON", async (ev) => {
            controller.goAfterDelay(controller.getModelActionURL("", "exportToJSON"), 0);
        });

        this.bindUIEvent(controller, "onImportFromJSON", async (ev) => {
            controller.goAfterDelay(controller.getModelActionURL("", "importFromJSON"), 0);
        });
    }

    static async saveToServer(controller, options) {
        try {
            if (controller.ui.message) {
                controller.ui.message.$destroy();
            }
            let res = await controller
                .getModel(DATA_MODEL_NAME, {
                    moduleName: MODULE_NAME,
                    options,
                })
                .$updateForModule();
            if (res.status === "ok") {
                controller.showSuccessMessage("Настройки сохранены", "");
            } else {
                ncaInformUpdate.setUIError(
                    controller,
                    res.error ? res.error : "Произошла ошибка"
                );
            }
            return true;
        } catch (e) {
            ncaInformUpdate.setUIError(
                controller,
                e.message ? e.message : e.name
            );
            controller.error(e);
            controller.report(e);
            return false;
        }
    }
}

export default ncaInformUpdate;
