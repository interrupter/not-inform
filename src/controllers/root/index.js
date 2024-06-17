import ncInform from "../../common/ncInform.js";
import { MODULE_NAME } from "../../const.js";

let manifest = {
    router: {
        manifest: [ncInform.getRoutes()],
    },
    menu: {
        side: {
            sections: [
                {
                    id: "inform",
                    title: `${MODULE_NAME}:menuTitle`,
                    place: "end",
                },
            ],
            items: [
                {
                    id: "inform.options",
                    section: "inform",
                    priority: 1,
                    title: `${MODULE_NAME}:menuTitleOptions`,
                    url: `/${MODULE_NAME}/inform`,
                },
                {
                    id: "inform.exportToJSON",
                    section: "inform",
                    priority: 2,
                    title: `${MODULE_NAME}:menuTitleExportToJSON`,
                    url: `/${MODULE_NAME}/inform/exportToJSON`,
                },
                {
                    id: "inform.importFromJSON",
                    section: "inform",
                    priority: 1,
                    title: `${MODULE_NAME}:menuTitleImportFromJSON`,
                    url: `/${MODULE_NAME}/inform/importFromJSON`,
                },
            ],
        },
    },
};

export { ncInform, manifest };
