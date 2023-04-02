"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _helmet = _interopRequireDefault(require("helmet"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _globalRouter = _interopRequireDefault(require("./router/globalRouter"));
var _routes = _interopRequireDefault(require("./routes"));
require("./utils/db");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = (0, _express.default)();

//middleware
app.use((0, _helmet.default)());
app.use((0, _cookieParser.default)());
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use((0, _morgan.default)("dev"));

//routes
app.use(_routes.default.home, _globalRouter.default);

// 404
app.get("*", (req, res) => {
  res.status(404).send("api not found");
});
var _default = app;
exports.default = _default;
//# sourceMappingURL=app.js.map