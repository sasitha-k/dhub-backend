import authInstance from "./authInstance";

/**
 * Upload a file to /upload and return the resulting URL.
 * @param {File} file - The file to upload
 * @returns {Promise<string>} The URL returned by the API
 */
export async function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await authInstance.post("/upload", formData);
  const data = res.data;
  const url = typeof data === "string" ? data : data?.url ?? data?.data?.url;
  if (!url) {
    throw new Error("Upload response did not contain a URL");
  }
  return url;
}
