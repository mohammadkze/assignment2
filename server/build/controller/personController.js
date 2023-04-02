"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _personModel = _interopRequireDefault(require("../models/personModel"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const addPerson = async (req, res) => {
  console.log(req.body.firstName);
  if (!req.body.firstName || !req.body.lastName) {
    res.status(400).send("first name and last name is require");
  } else {
    try {
      const person = new _personModel.default({
        name: req.body.firstName,
        family: req.body.lastName
      });
      await person.save();
      res.send("person add ");
    } catch (error) {
      console.log("error", error);
      res.status(500).send("bad request");
    }
  }
};
const getPersons = async (req, res) => {
  try {
    const all = await _personModel.default.find({});
    res.send(all);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("bad request");
  }
};
const deletePersonById = async (req, res) => {
  try {
    if (req.body.personId) {
      let personId = req.body.personId;
      await _personModel.default.deleteOne({
        personId: personId
      });
      res.send(`person with id ${personId} is deleted`);
    } else {
      res.status(400).send("personId is require");
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).send("bad request");
  }
};
const getPersonById = async (req, res) => {
  try {
    if (req.body.personId) {
      let personId = req.body.personId;
      let onePerson = await _personModel.default.findOne({
        personId: personId
      });
      res.send(onePerson);
    } else {
      res.status(400).send("personId is require");
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).send("bad request");
  }
};
const personControler = {
  addPerson,
  getPersons,
  deletePersonById,
  getPersonById
};
var _default = personControler;
exports.default = _default;
//# sourceMappingURL=personController.js.map