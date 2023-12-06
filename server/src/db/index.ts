import { connect } from 'mongoose';
import { MONGODB_URI } from '@/config';

async function setupDatabase() {
    // Connection à MongoDB
    await connect(MONGODB_URI);
}

export default setupDatabase;