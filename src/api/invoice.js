import authInstance from "./authInstance";

export const createConsolidatedInvoice = async (bookingIds, previousAmount = 0) => {
  const res = await authInstance.post("/invoice/consolidated", {
    bookingIds,
    previousAmount,
  });
  return res.data;
};
