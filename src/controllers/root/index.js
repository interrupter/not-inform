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
                    priority: 10,
                    title: `${MODULE_NAME}:menuTitleOptions`,
                    href: `/${MODULE_NAME}/inform`,
                },
                {
                    id: "inform.exportToJSON",
                    section: "inform",
                    priority: 9,
                    title: `${MODULE_NAME}:menuTitleExportToJSON`,
                    href: `/${MODULE_NAME}/inform/exportToJSON`,
                },
                {
                    id: "inform.importFromJSON",
                    section: "inform",
                    priority: 8,
                    title: `${MODULE_NAME}:menuTitleImportFromJSON`,
                    href: `/${MODULE_NAME}/inform/importFromJSON`,
                },
            ],
        },
    },
};

export { ncInform, manifest };
