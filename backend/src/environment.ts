export interface Environment {
  port: string;
  jwtSecretKey: string;
  cookieSecretKeys: string[];
  dbHost: string;
}

const getEnvironment = async (): Promise<Environment> => {
  const port = process.env.PORT;
  if (!port) {
    throw new Error("Environment variable not defined: PORT");
  }
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  if (!jwtSecretKey) {
    throw new Error("Environment variable not defined: JWT_SECRET_KEY");
  }
  const dbHost = process.env.DB_HOST;
  if (!dbHost) {
    throw new Error("Environment variable not defined: DB_HOST");
  }

  const cookieSecretKeyString = process.env.COOKIE_SECRET_KEYS;
  if (!cookieSecretKeyString) {
    throw new Error("Environment variable not defined: COOKIE_SECRET_KEYS");
  }
  const cookieSecretKeys = cookieSecretKeyString.split(',')
  
  return {
    jwtSecretKey,
    cookieSecretKeys,
    port,
    dbHost
  };
};

export default getEnvironment;
