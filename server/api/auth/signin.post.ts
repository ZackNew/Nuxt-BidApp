import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password } = body;

  try {
    const data: User[] = await $fetch(
      `http://localhost:3001/users?username=${username}`
    );

    if (data?.length == 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "User doen't exists",
      });
    }

    if (data[0]?.password !== password) {
      throw createError({
        statusCode: 400,
        statusMessage: "Wrong credentials",
      });
    }

    const token = jwt.sign(
      { id: data[0].id, username: data[0].username },
      "your-secret-key"
    );

    setCookie(event, "access_token", token);

    return {
      user: data[0],
    };
  } catch (error: any) {
    console.error("Error during login:", error);

    if (!error.statusCode) {
      throw createError({
        statusCode: 500,
        statusMessage: "Error during registration",
      });
    }

    throw error;
  }
});
