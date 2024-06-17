function getDefaultRule() {
    return {
        id: "new-rule",
        _id: Math.random().toString().slice(3, 10),
        type: "tag",
        tags: [],
        data: {
            from: "",
            templates: {
                subject: "",
                text: "",
                html: "",
            },
        },
    };
}

function getDefaultSink() {
    return {
        id: "new-sink",
        _id: Math.random().toString().slice(3, 10),
        type: "email",
        account: {
            host: "",
            port: 465,
            secure: true,
            auth: {
                user: "",
                pass: "",
            },
        },
        meet: "any",
        rules: {},
    };
}

export default {
    getDefaultRule,
    getDefaultSink,
};
