// /lib/api/authorized.js
const { default: authInstance } = require("./authInstance");


module.exports.getDrivers = async (params) => {
  const res = await authInstance.get("/drivers", { params });
  return res.data;
};

module.exports.getDriversWithBalance = async (params) => {
  const res = await authInstance.get("/drivers/balances", { params });
  return res.data;
};

module.exports.getDriverById = async (id) => {
  const res = await authInstance.get(`/driver/${id}`);
  return res.data;
};

module.exports.settleDriverBalance = function (params) {
    return authInstance.post("/drivers/balance/settlement", params);
};
