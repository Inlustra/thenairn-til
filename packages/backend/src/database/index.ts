import { connect } from "mongoose";

async function setupDatabase(dbHost: string) {
  const mongoose = await connect(
    dbHost,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
  return mongoose;
}

export default setupDatabase;
