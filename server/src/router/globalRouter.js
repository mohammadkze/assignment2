import express from "express";
import routes from "../routes";
import personControler from "../controller/personController";
const globalRouter = express.Router();

globalRouter.get(routes.home, (req, res) => {
  res.send("home");
});

globalRouter.post(routes.addPerson, personControler.addPerson);

globalRouter.get(routes.getAllPersons, personControler.getPersons);
globalRouter.post(routes.getPersonById, personControler.getPersonById);

globalRouter.delete(routes.deletePersonById, personControler.deletePersonById);

globalRouter.get(routes.randomString, personControler.getRandomString);

export default globalRouter;
