// /lib/api/authorized.js
const { default: authInstance } = require("./authInstance");


module.exports.getBookings = async (params) => {
  const res = await authInstance.get("/bookings", { params });
  return res.data;
};

module.exports.createBooking = function (params) {
    return authInstance.post("/booking", params);
};

module.exports.updateBooking = function (params) {
  return authInstance.put(`/booking`, params);
};

module.exports.deleteBooking = function (params) {
  return authInstance.delete(`/booking`, params);
};