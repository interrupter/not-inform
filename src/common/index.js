export default class Common {
  static MODULE = {
    name: 'not-inform',
    label: 'Информер'
  };
  static DEFAULT_REDIRECT_TIMEOUT = 5000;
  static CLASS_OK = 'is-success';
  static CLASS_ERR = 'is-danger';
  static isError(e) {
    return e instanceof Error;
  }
  static getDefaultRule() {
    return {
      id: 'new-rule',
      _id: Math.random().toString().slice(3, 10),
      "type": "tag",
      "tags": [],
      "data": {
        "from": "",
        "templates": {
          "subject": "",
          "text": "",
          "html": ""
        }
      }
    };
  }
  static getDefaultSink() {
    return {
      id: 'new-sink',
      _id: Math.random().toString().slice(3, 10),
      type: 'email',
      account: {
        host: '',
        port: 465,
        secure: true,
        auth: {
          user: '',
          pass: ''
        }
      },
      meet: 'any',
      rules: {}
    };
  }
};
