// /lib/api/authorized.js
const { default: authInstance } = require("./authInstance");


module.exports.getCustomers = async (params) => {
  const res = await authInstance.get("/customers", { params });
  return res.data;
};

module.exports.createCustomer = function (params) {
    return authInstance.post("/customer", params);
};

module.exports.updateCustomer = function (params) {
  return authInstance.put(`/customer`, params);
};

module.exports.deleteCustomer = function (params) {
  return authInstance.delete(`/customer`, params);
};