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

module.exports.addDriverExpense = async (driverId, amount, note) => {
  const res = await authInstance.post("/drivers/expenses", {
    driverId,
    amount: Number(amount),
    note: note || "",
  });
  return res.data;
};

module.exports.getDriverExpenses = async (driverId) => {
  const res = await authInstance.get("/drivers/expenses", {
    params: { driverId },
  });
  return res.data;
};

module.exports.getDriverBookingHistory = async (driverId) => {
  const res = await authInstance.get(`/driver/booking-history?driverId=${driverId}`);
  return res.data;
};

module.exports.getDriverHistory = async (driverId) => {
  const res = await authInstance.get("/driver/history", {
    params: { driverId },
  });
  return res.data;
};
