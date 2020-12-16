export default class Common {
  static MODULE = {
    name: 'not-inform',
    label: 'Управление заказами'
  };
  static DEFAULT_REDIRECT_TIMEOUT = 5000;
  static CLASS_OK = 'is-success';
  static CLASS_ERR = 'is-danger';
  static isError(e) {
    return e instanceof Error;
  }
  static getDefaultRule() {
    return {
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
      rules: {

      }
    };
  }
};
