const express = require("express");
const app = express();
const port = 3000;

const { saveCommentsToDb } = require("./util/save.comments");
const { readFromApi, downloadAndReadCsvFile } = require("./util/read.from.api");
const { searchComments } = require("./util/search.comments");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); //

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/populate", async (req, res) => {
  try {
    const task1 = readFromApi();
    const task2 = downloadAndReadCsvFile();

    let results = await Promise.all([task1, task2]);
    let apiData = results[0];
    let csvData = results[1];

    let totalItems = [...apiData, ...csvData];
    await saveCommentsToDb(totalItems);

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ success: false, err: err.msg });
  }
});

app.post("/search", async (req, res) => {
  try {
    const searchParams = req.body;
    const queryParams = req.query;

    let list = await searchComments(searchParams, queryParams);

    res.json({ success: true, data: list });
  } catch (err) {
    console.error(err);
    res.json({ success: false, err: err.msg });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
