"use strict";

var _app = _interopRequireDefault(require("./app"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const PORT = 4000;
const handleListening = () => {
  console.log(`connect to port ${PORT}`);
};
_app.default.listen(PORT, handleListening);
//# sourceMappingURL=init.js.map