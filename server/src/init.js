import app from "./app";
import fs from "fs";

function makeRandomData(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const randomdata = makeRandomData(1024);
// const cs = checksum(randomdata);
// console.log("cs : ", cs);
// console.log("cs : ", __dirname + "/../serverdata/cs.txt");

const PORT = process.env.PORT | 4000;
const handleListening = () => {
  console.log(`connect to port ${PORT}`);
  // try {
  //   fs.writeFileSync(__dirname + "/../serverdata/cs.txt", randomdata);
  //   // file written successfully
  // } catch (err) {
  //   console.error(err);
  // }
};

app.listen(PORT, handleListening);
