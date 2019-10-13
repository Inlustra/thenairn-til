import { connect } from "mongoose";

async function setupDatabase(dbHost: string) {
  const mongoose = await connect(dbHost);
  await new Promise((resolve, reject) => {
    const onConnect = () => resolve();
    const onError = (error: any) => reject(error);
    try {
      mongoose.connection.once("open", onConnect);
      mongoose.connection.once("error", onError);
    } finally {
      mongoose.connection.removeListener("error", onError);
      mongoose.connection.removeListener("open", onConnect);
    }
  });
  return mongoose;
}

export default setupDatabase;
