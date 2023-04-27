const { MongoClient } = require("mongodb");

const { readFromApi } = require("./read.from.api");

const dbName = "assignments";
const commentCollection = "comments";
const uri = "mongodb://localhost:27017";

const saveOneCommentsToDb = async (items) => {
  const client = new MongoClient(uri);
  try {
    let comments = client.db(dbName).collection(commentCollection);

    const docs = [
      {
        postId: 1,
        id: 1,
        name: "id labore ex et quam laborum",
        email: "Eliseo@gardner.biz",
        body: `laudantium enim quasi est quidem magnam voluptate ipsam eos
        tempora quo necessitatibus
        dolor quam autem quasi
        reiciendis et nam sapiente accusantium`,
      },
    ];

    const options = { ordered: true };
    const result = await comments.insertMany(docs, options);
    console.log(result);
  } catch (err) {
    console.err(err);
  } finally {
    await client.close();
  }
};

const raedFromApiAndSavetoDb = async () => {
  const client = new MongoClient(uri);
  try {
    let items = await readFromApi();

    let comments = client.db(dbName).collection(commentCollection);

    const options = { ordered: true };
    const result = await comments.insertMany(items, options);
    console.log(result);
  } catch (err) {
    console.err(err);
  } finally {
    await client.close();
  }
};

const saveCommentsToDb = async (items) => {
  const client = new MongoClient(uri);
  try {
    let comments = client.db(dbName).collection(commentCollection);

    const options = { ordered: true };
    const result = await comments.insertMany(items, options);
    console.log(result);
  } catch (err) {
    console.err(err);
  } finally {
    await client.close();
  }
};

// raedFromApiAndSavetoDb();

module.exports = { raedFromApiAndSavetoDb, saveCommentsToDb };
