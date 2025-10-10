// /lib/api/authorized.js
const { default: authInstance } = require("./authInstance");

module.exports.getPackages = async (params) => {
  const res = await authInstance.get("/packages", { params });
  return res.data;
};


module.exports.createPackage = function (params) {
    return authInstance.post("/package", params);
};


module.exports.updatePackage = function (params) {
  return authInstance.put(`/package`, params);
};
