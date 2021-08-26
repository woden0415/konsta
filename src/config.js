const configExtend = require('./config/config-extend.js');
const extendTheme = require('./config/extend-theme.js');
const extendVariants = require('./config/extend-variants.js');

const pluginBase = require('./config/plugin-base.js');
const pluginPreloader = require('./config/plugin-preloader.js');
const pluginHairlines = require('./config/plugin-hairlines.js');
const pluginTouchRipple = require('./config/plugin-touch-ripple.js');
const pluginIosMaterial = require('./config/plugin-ios-material.js');
const pluginLineClamp = require('./config/plugin-line-clamp.js');
const pluginSafeAreas = require('./config/plugin-safe-areas.js');
const pluginDarkMode = require('./config/plugin-dark-mode.js');
const pluginTranslucent = require('./config/plugin-translucent.js');
const pluginRange = require('./config/plugin-range.js');

const config = (userConfig = {}) => {
  return configExtend(
    {},
    {
      theme: {
        extend: extendTheme(),
      },
      variants: {
        extend: extendVariants(),
      },
      plugins: [
        pluginBase(),
        pluginPreloader(),
        pluginIosMaterial(),
        pluginHairlines(),
        pluginTouchRipple(),
        pluginLineClamp(),
        pluginSafeAreas(),
        pluginDarkMode(),
        pluginTranslucent(),
        pluginRange(),
      ],
    },
    userConfig
  );
};
module.exports = config;
