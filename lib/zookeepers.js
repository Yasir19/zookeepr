const fs = require("fs");
const path = require("path");

const filterByQuery = (query, zookeepers) => {
  let filteredResult = zookeepers;
  if (query.age) {
    filteredResult = filteredResult.filter(
      // Since our form data will be coming in as strings, and our JSON is storing
      // age as a number, we must convert the query string to a number to
      // perform a comparison:
      (zookeeper) => zookeeper.age === Number(query.age)
    );
  }
  if (query.favoriteAnimal) {
    filteredResult = filteredResult.filter(
      (zookeeper) => zookeeper.favoriteAnimal === query.favoriteAnimal
    );
  }
  if (query.anme) {
    filteredResult = filteredResult.filter(
      (zookeeper) => zookeeper.name === query.name
    );
  }
  return filteredResult;
};
const findById = (id, zookeepers) => {
  const result = zookeepers.filter((zookeeper) => zookeeper.id === id)[0];
  return result;
};
const createNewZookeeper = (body, zookeepers) => {
  const zookeeper = body;
  zookeepers.push(zookeeper);
  fs.writeFileSync(
    path.join(__dirname, "../data/zookeepers.json"),
    JSON.stringify({ zookeepers }, null, 2)
  );
  return zookeeper;
};
const validateZookeeper = (zookeeper) => {
  if (!zookeeper.name || typeof zookeeper.name !== "string") {
    return false;
  }
  if (!zookeeper.age || typeof zookeeper.age !== "number") {
    return false;
  }
  if (
    !zookeeper.favoriteAnimal ||
    typeof zookeeper.favoriteAnimal !== "string"
  ) {
    return false;
  }
  return true;
};

module.exports = {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper,
};
