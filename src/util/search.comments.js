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

    // query on different fields
    let queryRef = {};
    if (searchParams.name) {
      queryRef["name"] = searchParams.name;
    }

    if (searchParams.email) {
      queryRef["email"] = searchParams.email;
    }

    // we should text / regex here. :: TODO
    if (searchParams.body) {
      queryRef["body"] = searchParams.body;
    }

    let cursor = comments.find(queryRef).sort(sortRef).limit(limit);

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
