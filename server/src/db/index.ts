import { connect } from 'mongoose';

async function setupDatabase(MONGODB_URI: string) {
    // Connection à MongoDB
    await connect(MONGODB_URI);
}

export default setupDatabase;
