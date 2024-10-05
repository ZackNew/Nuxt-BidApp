import jwt from "jsonwebtoken";

export default defineEventHandler((event) => {
  try {
    deleteCookie(event, "access_token");
  } catch (error: any) {
    console.error("Error during logout:", error);

    throw Error("Error occured when logging out");
  }
});
