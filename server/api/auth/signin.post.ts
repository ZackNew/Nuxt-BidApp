import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password } = body;

  const dbUrl = useRuntimeConfig().DATA_STORAGE_API;
  const jwtSecretKey = useRuntimeConfig().JWT_SECRET_KET;

  try {
    const data: User[] = await $fetch(`${dbUrl}/users?username=${username}`);

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
      jwtSecretKey
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
