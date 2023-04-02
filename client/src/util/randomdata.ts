import fs from "vite-plugin-fs/browser";
// import { saveAs, encodeBase64 } from "@progress/kendo-file-saver";
import md5 from "md5";
import axios from "axios";
// import data from "./clientdata/cs.json";
// import * as fs from "fs-web";
// import write from "write-file-utf8";
// import * as fs from "fs";
// import jsonfile from "jsonfile";
// const jsonfile = require("jsonfile");
var randomTextFileRoute = "./clientdata/random.txt";
var randomTextCSFileRoute = "./clientdata/cs.txt";
console.log("randomTextFileRoute", randomTextFileRoute);
async function csTest(random: String | any, csData: String | any) {
  try {
    const fileData = await fetch(randomTextFileRoute);
    // let jsonFileData = await fileData.json();
    console.log("fileData", await fileData.text());
    // let readRandomData = await fs.readFile(randomTextFileRoute);
    let readRandomData;
    await fetch(randomTextFileRoute, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Response-Type": "blob",
      },
    }).then(async (res) => {
      let output = await res.text();
      console.log("output: ", output);
      // saveAs(JSON.stringify(output), "downloaded-file.txt");
      readRandomData = output;
    });

    console.log("fileExsssist", readRandomData);
    if (readRandomData != "") {
      console.log("cs");
      let generatecs = md5(random);
      console.log("after cs", generatecs);
      if (csData == generatecs || readRandomData == random) {
        return "true";
      } else {
        return "false";
      }
    } else {
      let csDataCreate = md5(random);
      console.log("dddddddddddddd", csDataCreate);
      // await fetch(`${randomTextFileRoute}?cmd?=writeFile`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/plain",
      //   },
      //   body: random,
      // });
      await fetch(`clientdata/cs.txt?cmd=writeFile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/plain",
          "Access-Control-Allow-Origin": "*",
        },
        body: csDataCreate,
      }).then((res) => {
        console.log(res);
      });
      // const dataURI = "data:text/plain;base64," + encodeBase64(csDataCreate);
      // saveAs(dataURI, "test.txt");
      // await axios.post("/clientdata/cs.txt?cmd=writeFile", {
      //   data: csDataCreate,
      // });
      // await axios
      //   .post("http://localhost:7070/clientdata/cs.txt?cmd=writeFile", {
      //     data: random,
      //   })
      //   .then((res) => {
      //     console.log("i am here", res, "\n here \n", random);
      //   });
      // fs.writeFile("../../clientdata/random.txt", random)
      //   .then(function () {
      //     return fs.readdir("../../clientdata");
      //   })
      //   .then(function (files: any) {
      //     files; // -> [ {some-file.txt} ]
      //     console.log(files);
      //   });
      // fs.writeFile("clientdata/random.txt", "fbuibiufui");

      // fs.writeFile("clientdata/random.txt", "foo")
      //   .then(function () {
      //     return fs.readdir("clientdata");
      //   })
      //   .then(function (files: any) {
      //     files; // -> [ {some-file.txt} ]
      //   });
      // await write("clientdata/random.txt", random);
      // fs.writeFile(randomTextCSFileRoute, csDataCreate);
      // jsonfile.readFile("clientdata/random.txt");
      // data.value.randomData = random;
      return "write";
    }
    // file written successfully
  } catch (err) {
    console.error("error", err);
    return "error";
  }
}

const utilTest = {
  csTest,
};
export default utilTest;
