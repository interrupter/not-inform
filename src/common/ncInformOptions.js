import CommonLocal from "./index.js";
import Validators from "./validators.js";

import { Frame, Elements } from "not-bulma";

const { notBreadcrumbs, notController } = Frame;

const { UIError, UISuccess } = Elements.Notifications;

import UIInformOptions from "./options.details.svelte";

const LABELS = {
    plural: "Настройки",
    single: "Настройка",
};

const MODEL = "options";
const BREADCRUMBS = [];

class ncInformOptions extends notController {
    static MODULE_NAME = "inform";
    static MODEL_NAME = "options";
    constructor(app, params, schemes) {
        super(app, MODEL);
        this.ui = {};
        this.els = {};
        this.setModuleName(CommonLocal.MODULE.name);
        this.setModelName(MODEL);
        this.setOptions("names", LABELS);
        this.setOptions("Validators", Validators);
        this.setOptions("params", params);
        this.setOptions("role", "root");
        this.setOptions("urlSchemes", schemes);
        this.setOptions(
            "containerSelector",
            this.app.getOptions("crud.containerSelector")
        );
        this.render();
        this.start(params);
    }

    render() {
        this.buildFrame();
    }

    buildFrame() {
        let el = document.querySelector(
            this.app.getOptions("crud.containerSelector", "body")
        );
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
        this.els.top = document.createElement("div");
        this.els.top.id = "crud-top";
        this.els.top.classList.add("box");
        el.appendChild(this.els.top);
        this.els.main = document.createElement("div");
        this.els.main.id = "crud-main";
        this.els.main.classList.add("box");
        el.appendChild(this.els.main);
        this.els.bottom = document.createElement("div");
        this.els.bottom.id = "crud-bottom";
        this.els.bottom.classList.add("box");
        el.appendChild(this.els.bottom);
    }

    setBreadcrumbs(tail) {
        notBreadcrumbs.setTail(tail).update();
    }

    start() {
        BREADCRUMBS.splice(
            0,
            BREADCRUMBS.length,
            {
                title: CommonLocal.MODULE.label,
                url: false,
            },
            {
                title: this.getOptions("names.plural"),
                url: this.getModelURL(),
            }
        );
        notBreadcrumbs.setHead(BREADCRUMBS).render({
            root: "",
            target: this.els.top,
            navigate: (url) => this.app.getWorking("router").navigate(url),
        });
        this.route(this.getOptions("params"));
    }

    createDefault() {
        let newRecord = this.getModel({
            _id: null,
            title: this.getOptions("names.single"),
            products: [],
        });
        return newRecord;
    }

    async route() {
        try {
            this.getModel({
                moduleName: CommonLocal.MODULE.name.toLowerCase(),
            })
                .$getForModule()
                .then((res) => {
                    if (res.status === "ok") {
                        this.ui.details = new UIInformOptions({
                            target: this.els.main,
                            props: {
                                title: "Настройки информера",
                                subtitle:
                                    "шлюзы для отправки сообщений и правила фильтрации сообщений",
                                options: res.result,
                            },
                        });
                        this.ui.details.$on("save", (e) =>
                            this.saveToServer(e.detail)
                        );
                    } else {
                        this.error(res);
                        this.ui.message = new UIError({
                            target: this.els.bottom,
                            props: {
                                title: "Произошла ошибка",
                                message: res.error
                                    ? res.error
                                    : CommonLocal.ERROR_DEFAULT,
                            },
                        });
                    }
                })
                .catch((e) => this.report(e));
        } catch (e) {
            this.error(e);
            this.report(e);
        }
    }

    saveToServer(options) {
        try {
            if (this.ui.message) {
                this.ui.message.$destroy();
            }
            this.getModel({
                moduleName: CommonLocal.MODULE.name.toLowerCase(),
                options,
            })
                .$updateForModule()
                .then((res) => {
                    if (res.status === "ok") {
                        this.ui.message = new UISuccess({
                            target: this.els.bottom,
                            props: {
                                title: "Настройки сохранены",
                                message: "",
                            },
                        });
                    } else {
                        this.error(res);
                        this.ui.message = new UIError({
                            target: this.els.bottom,
                            props: {
                                title: "Произошла ошибка",
                                message: res.error
                                    ? res.error
                                    : CommonLocal.ERROR_DEFAULT,
                            },
                        });
                    }
                })
                .catch((e) => this.report(e));
        } catch (e) {
            this.error(e);
            this.report(e);
        }
    }
}

export default ncInformOptions;
