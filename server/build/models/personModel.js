"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Schema = _mongoose.default.Schema;

/* mongodb generate id for each record   but 
if you want generate your id for each person 
uncomment the code below */

var PersonModelSchema = new Schema({
  personId: {
    type: _mongoose.default.Types.ObjectId,
    default: () => new ObjectId(),
    unique: true,
    index: true,
    required: true,
    auto: true
  },
  name: {
    type: String
  },
  family: {
    type: String
  }
});
const personSchema = _mongoose.default.model("personSchema", PersonModelSchema);
var _default = personSchema;
exports.default = _default;
//# sourceMappingURL=personModel.js.map