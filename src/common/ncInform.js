import { MODULE_NAME } from "../const.js";
import Validators from "./validators.js";
import { Frame } from "not-bulma";

import ncaExportToJSON from "not-options/src/controllers/common/actions/json.import.export/export.to.json";
import ncaImportFromJSON from "not-options/src/controllers/common/actions/json.import.export/import.from.json";

import ncaImportUpdate from "../controllers/root/actions/update/inform.options.update.js";

const { notCRUD } = Frame;

const MODEL_NAME = "inform";

const LABELS = {
    plural: `${MODULE_NAME}:${MODEL_NAME}_label_plural`,
    single: `${MODULE_NAME}:${MODEL_NAME}_label_single`,
};

class ncInformCommon extends notCRUD {
    static MODULE_NAME = MODULE_NAME;
    static MODEL_NAME = MODEL_NAME;
    constructor(app, params) {
        super(app, `${MODULE_NAME}.${MODEL_NAME}`, {
            actions: {
                exportToJSON: ncaExportToJSON,
                importFromJSON: ncaImportFromJSON,
                list: ncaImportUpdate,
                details: null,
                update: null,
                delete: null,
            },
        });
        this.setModuleName(MODULE_NAME);
        this.setModelName(MODEL_NAME);
        this.setOptions("names", LABELS);
        this.setOptions("Validators", Validators);
        this.setOptions("params", params);
        this.start();
        return this;
    }
}

export default ncInformCommon;
