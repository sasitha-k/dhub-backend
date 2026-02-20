// /lib/api/authorized.js
const { default: authInstance } = require("./authInstance");


module.exports.getDrivers = async (params) => {
  const res = await authInstance.get("/drivers", { params });
  return res.data;
};

module.exports.getDriverBalances = async (params) => {
  const res = await authInstance.get("/drivers/balances", { params });
  return res.data;
};

module.exports.getDriverLeaves = async (params) => {
  const res = await authInstance.get("/drivers/leaves", { params });
  return res.data;
};
