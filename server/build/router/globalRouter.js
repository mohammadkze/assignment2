"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _routes = _interopRequireDefault(require("../routes"));
var _personController = _interopRequireDefault(require("../controller/personController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const globalRouter = _express.default.Router();
globalRouter.get(_routes.default.home, (req, res) => {
  res.send("home");
});
globalRouter.post(_routes.default.addPerson, _personController.default.addPerson);
globalRouter.get(_routes.default.getAllPersons, _personController.default.getPersons);
globalRouter.get(_routes.default.getPersonById, _personController.default.getPersonById);
globalRouter.delete(_routes.default.deletePersonById, _personController.default.deletePersonById);
var _default = globalRouter;
exports.default = _default;
//# sourceMappingURL=globalRouter.js.map