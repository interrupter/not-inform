
module.exports = {
  name: 'not-inform',
  Inform: require('./inform.js'),
  Supply: require('./supply.js'),
  Sink: require('./sink.js'),
  Rule: require('./rule.js'),
  paths: {
    controllers:  __dirname + '/controllers',
    locales:  __dirname + '/locales'
  }
};
