// /lib/api/authorized.js
const { default: authInstance } = require("./authInstance");


module.exports.getCustomers = async (params) => {
  const res = await authInstance.get("/customers", { params });
  return res.data;
};

module.exports.getCustomerBalances = async (params) => {
  const res = await authInstance.get("/customers/balances", { params });
  return res.data;
};

module.exports.getCustomerBookingHistory = async (customerId) => {
  const res = await authInstance.get(`/customer/booking-history?customerId=${customerId}`);
  return res.data;
};

module.exports.settleCustomerCredit = async (customerId, amount) => {
  const res = await authInstance.post("/drivers/customer/settlement", {
    customerId,
    amount: amount.toString()
  });
  return res.data;
};
