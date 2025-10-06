// /lib/api/authorized.js
const { default: authInstance } = require("./authInstance");


module.exports.getDrivers = async (params) => {
  const res = await authInstance.get("/drivers", { params });
  return res.data;
};
