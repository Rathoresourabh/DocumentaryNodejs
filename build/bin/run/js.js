"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

var _jsReplaceStream = _interopRequireDefault(require("../../lib/js-replace-stream"));

var _catcher = _interopRequireDefault(require("../catcher"));

var _whichStream = _interopRequireDefault(require("./which-stream"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Process a JavaScript file to include `@typedef`s found with the `/* documentary types.xml *\/` marker.
 * @param {Config} config Configuration Object.
 * @param {string} config.source Path to the source JavaScript file.
 * @param {string} [config.output] Path to the source JavaScript file.
 */
async function runJs(config) {
  const {
    source,
    generateTo = source,
    stream: st
  } = config;

  try {
    if (!source && !st) {
      console.log('Please specify a JavaScript file or a pass a stream.');
      process.exit(1);
    }

    const s = (0, _fs.createReadStream)(source);
    const rs = (0, _jsReplaceStream.default)();
    s.pipe(rs);
    const {
      p
    } = (0, _whichStream.default)(rs, st, generateTo);
    await p;
    console.error(...(source == generateTo ? ['Updated %s to include types.', source] : ['Saved output to %s', generateTo]));
  } catch (err) {
    (0, _catcher.default)(err);
  }
}
/**
 * @typedef {Object} Config
 * @prop {string} source Path to the source JavaScript file.
 * @prop {string} [output] Path to the source JavaScript file.
 */


var _default = runJs;
exports.default = _default;
//# sourceMappingURL=js.js.map