const axios = require("axios");
const fs = require("fs");
const fsPromises = require("fs/promises");

let localFilePath = "/Users/research/Desktop/csvdata.csv";

const readFromApi = async () => {
  const url = "https://jsonplaceholder.typicode.com/comments";
  const results = await axios.get(url);

  return results.data;
};

const downloadCsvFile = async () => {
  const url = "http://console.mbwebportal.com/deepak/csvdata.csv";
  let response = await axios({
    method: "get",
    url,
    responseType: "stream",
  });

  response.data.pipe(fs.createWriteStream(localFilePath));
};

const downloadAndReadCsvFile = async () => {
  await downloadCsvFile();

  const fileData = await fsPromises.readFile(localFilePath, {
    encoding: "utf-8",
  });

  const lineArray = fileData.split("\n");
  lineArray.shift();

  const list = lineArray
    .map((item) => {
      const lineItemArr = item.split(",");

      if (lineItemArr.length == 5) {
        return {
          postId: lineItemArr[0],
          id: lineItemArr[1],
          name: lineItemArr[2],
          email: lineItemArr[3],
          body: lineItemArr[4],
        };
      }
    })
    .filter((item) => item);

  return list;
};

// downloadAndReadCsvFile();

module.exports = { readFromApi, downloadAndReadCsvFile };
