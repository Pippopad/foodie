import * as crypto from "crypto";

const API_LINK = "http://localhost:3000/api";

export const md5 = (contents: string) =>
  crypto.createHash("md5").update(contents).digest("hex");

export const makeApiRequest = async (
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: {}
): Promise<any> => {
  const res = await fetch(`${API_LINK}${endpoint}`, {
    method,
    body: JSON.stringify(data),
  });
  return await res.json();
};
