// /lib/api/authorized.js
const { default: authInstance } = require("./authInstance");


module.exports.getCustomers = async (params) => {
  const res = await authInstance.get("/customers", { params });
  return res.data;
};

