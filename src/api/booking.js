// /lib/api/authorized.js
const { default: authInstance } = require("./authInstance");


module.exports.getBookings = async (params) => {
  const res = await authInstance.get("/bookings", { params });
  return res.data;
};

module.exports.getBookingById = async (bookingId) => {
    return authInstance.get(`/booking/id?_id=${bookingId}`);
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

module.exports.startBooking = function (params) {
    return authInstance.post("/booking/start", params);
};

module.exports.completeBooking = function (params) {
    return authInstance.post("/booking/complete", params);
};