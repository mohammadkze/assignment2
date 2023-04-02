import personSchema from "../models/personModel";
import fs from "fs";
import dataUtil from "../utils/randomData";
import checksum from "checksum";
import md5 from "md5";

const addPerson = async (req, res) => {
  console.log(req.body.firstName);
  if (!req.body.firstName || !req.body.lastName) {
    res.status(400).send("first name and last name is require");
  } else {
    try {
      const person = new personSchema({
        name: req.body.firstName,
        family: req.body.lastName,
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
    const all = await personSchema.find({});
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
      let person = await personSchema.deleteOne({ personId: personId });
      if (person.deletedCount !== 0) {
        res.send(`person with id ${req.body.personId} is deleted`);
      } else {
        res.send("person with this id not found");
      }
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
      let onePerson = await personSchema.findOne({ personId: personId });
      res.send(onePerson);
    } else {
      res.status(400).send("personId is require");
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).send("bad request");
  }
};

const getRandomString = (req, res) => {
  let randomTextFileRoute = __dirname + "/../../serverdata/random.txt";
  try {
    let fileExist = fs.existsSync(randomTextFileRoute);
    console.log("fileExist", fileExist);
    if (fileExist) {
      let readRandomData = fs.readFileSync(randomTextFileRoute, "utf8");
      const cs = md5(readRandomData);
      res.send({ randomData: readRandomData, cs });
    } else {
      let randomData = dataUtil.makeRandomData(1024);
      const cs = md5(randomData);
      fs.writeFileSync(randomTextFileRoute, randomData);
      res.send({ randomData, cs });
    }
    // file written successfully
  } catch (err) {
    console.error(err);
  }
};

const personControler = {
  addPerson,
  getPersons,
  deletePersonById,
  getPersonById,
  getRandomString,
};

export default personControler;
