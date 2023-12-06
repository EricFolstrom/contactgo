import 'module-alias/register';
import express from 'express';
import { createContactEndpoints } from '@/routes';
import { PORT } from '@/config';
import setupDatabase from '@/db';
import { contactFactory } from '@/db/Contact';
import http from 'http';
import { MONGODB_URI } from '@/config';

async function start() {
    // instancier l'application
    const app = express();
    // configurer express pour analyse les requêtes reçues sous le format JSON
    app.use(express.json());

    // utiliser le routeur de contact
    app.use('/contacts/', createContactEndpoints(contactFactory));

    // demarer l'application sur un port donné
    const server = http.createServer(app);
    if (process.env.NODE_ENV !== 'test') {
        // Connection a la base de données
        await setupDatabase(MONGODB_URI);
    }
    server.listen(PORT, () => {
        console.log(`listening on port ${3002}`);
    });

    return { app, server };
}

if (process.env.NODE_ENV !== 'test') {
    start()
        .then((resutlt) => resutlt)
        .catch((err) => console.log(err));
}

export default start;
