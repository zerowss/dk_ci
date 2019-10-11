/* eslint valid-jsdoc: "off" */

'use strict';
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1568689226920_1792';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  const mongoose = {
    client: {
      url: 'mongodb://root:123456@app-mongo:27017/dk?authSource=admin',
      options: {
        useUnifiedTopology:true,
        useNewUrlParser: true,
        useFindAndModify: false
      }
    }
  }
  const jwt = {
    secret: 'wangss87kk'
  }

  return {
    ...config,
    ...userConfig,
    mongoose,
    jwt,
    security:{
      csrf:{
        enable:false
      }
    }
  };
};
