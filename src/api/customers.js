// /lib/api/authorized.js
const { default: authInstance } = require("./authInstance");


module.exports.getCustomers = async (params) => {
  const res = await authInstance.get("/customers", { params });
  return res.data;
};

module.exports.getCustomersWithBalance = async (params) => {
  const res = await authInstance.get("/customers/balances", { params });
  return res.data;
};

module.exports.settleCustomerBalance = function (params) {
    return authInstance.post("/drivers/customer/settlement", params);
};