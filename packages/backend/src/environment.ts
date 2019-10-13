interface Environment {
  port: string;
  jwtSecretKey: string;
  dbHost: string;
}

const getEnvironment = async (): Promise<Environment> => {
  const port = process.env.PORt;
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
  return {
    jwtSecretKey,
    port,
    dbHost
  };
};
