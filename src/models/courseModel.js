const store = require("../data/store");

function getAll() {
  return store.courses;
}

function findById(id) {
  return store.courses.find(
    course => course.id === id
  );
}

function create(data) {
  const course = {
    id: String(Date.now()) + String(Math.floor(Math.random() * 1000)),
    ...data
  };

  store.courses.push(course);
  return course;
}

function update(id, data) {
  const index = store.courses.findIndex(
    course => course.id === id
  );

  if (index === -1) return null;

  store.courses[index] = {
    ...store.courses[index],
    ...data
  };

  return store.courses[index];
}

function remove(id) {
  const index = store.courses.findIndex(
    course => course.id === id
  );

  if (index === -1) return false;

  store.courses.splice(index, 1);
  return true;
}

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove
};