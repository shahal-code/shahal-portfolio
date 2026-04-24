import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const listCollections = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('Connected to:', mongoose.connection.name);

    const collections = await mongoose.connection.db?.listCollections().toArray();
    console.log('--- Collections ---');
    collections?.forEach(c => console.log(`- ${c.name}`));

    if (collections && collections.length > 0) {
        for (const col of collections) {
            const count = await mongoose.connection.db?.collection(col.name).countDocuments();
            console.log(`  Count for ${col.name}: ${count}`);
        }
    }

    await mongoose.disconnect();
  } catch (err) {
    console.error('Error listing collections:', err);
  }
};

listCollections();
