const { MongoClient } = require("mongodb");

const dbName = "assignments";
const commentCollection = "comments";
const uri = "mongodb://localhost:27017";

const searchComments = async (searchParams, queryParams) => {
  const client = new MongoClient(uri);
  try {
    let comments = client.db(dbName).collection(commentCollection);

    // add pagination
    let { limit, sort } = queryParams;
    limit = parseInt(limit) || 10;

    // sort key
    let sortRef = {};
    sort = sort || "name"; // default by name
    sortRef[sort] = 1;

    let cursor = comments.find({}).sort(sortRef).limit(limit);

    let list = [];
    await cursor.forEach((doc) => {
      list.push(doc);
    });

    return list;
  } catch (err) {
    console.err(err);
  } finally {
    await client.close();
  }
};

// searchComments();

module.exports = { searchComments };
