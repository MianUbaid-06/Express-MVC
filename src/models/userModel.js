const store = require("../data/store");

function findByEmail(email) {
  return store.users.find(
    user => user.email === email.toLowerCase()
  );
}

function create(user) {
  store.users.push(user);
  return user;
}

module.exports = {
  findByEmail,
  create
};