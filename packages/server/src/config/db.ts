import mongoose from 'mongoose';
import chalk from 'chalk';

const connectDB = async (MONGO_URI: string) => {
  const conn = await mongoose.connect(`${MONGO_URI}/core-vitals-book`);

  console.log(
    chalk.cyan(`✅ MongoDB connected: ${chalk.yellow(conn.connection.host)}`)
  );
};

export { connectDB };
