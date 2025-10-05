// /lib/api/authorized.js
const { default: authInstance } = require("./authInstance");


module.exports.getDrivers = async (params) => {
  const res = await authInstance.get("/drivers", { params });
  return res.data;
};

module.exports.createDrivers = function (params) {
    return authInstance.post("/driver", params);
};

module.exports.updateDrivers = function (params) {
  return authInstance.put(`/driver`, params);
};

module.exports.deleteDrivers = function (params) {
  return authInstance.delete(`/driver`, params);
};