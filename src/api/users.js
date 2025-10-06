// /lib/api/authorized.js
const { default: authInstance } = require("./authInstance");


module.exports.getUsers = async (params) => {
  const res = await authInstance.get("/users", { params });
  return res.data;
};

module.exports.createUser = function (params) {
    return authInstance.post("/createUser", params);
};

module.exports.updateUser = function (params) {
  return authInstance.put(`/updateUser`, params);
};

module.exports.deleteUser = function (params) {
  return authInstance.delete(`/deleteUser`, params);
};