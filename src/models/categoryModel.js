const store = require("../data/store");

function getAll() {
  return store.categories;
}

function findById(id) {
  return store.categories.find(
    category => category.id === id
  );
}

function create(data) {
  const category = {
    id: String(Date.now()) + String(Math.floor(Math.random() * 1000)),
    ...data
  };

  store.categories.push(category);
  return category;
}

function update(id, data) {
  const index = store.categories.findIndex(
    category => category.id === id
  );

  if (index === -1) return null;

  store.categories[index] = {
    ...store.categories[index],
    ...data
  };

  return store.categories[index];
}

function remove(id) {
  const index = store.categories.findIndex(
    category => category.id === id
  );

  if (index === -1) return false;

  store.categories.splice(index, 1);
  return true;
}

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove
};