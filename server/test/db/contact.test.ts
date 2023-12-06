import mongoose from 'mongoose';
import Contact from '@/db/Contact';
import { setupDb, dropDatabase } from '@test/db/setup';

const contactData = {
    nom: 'Doe',
    prenom: 'John',
    telephone: '+228 99 99 99 99',
    email: 'john.doe@gmail.com',
};

beforeAll(async () => {
    await setupDb();
});

afterAll(async () => {
    await dropDatabase();
});

describe('Contact model', () => {
    it('create and save contact successfully', async () => {
        const contact = new Contact(contactData);
        await contact.save();

        expect(contact._id).toBeDefined();
        expect(contact.nom).toBe(contactData.nom);
        expect(contact.prenom).toBe(contactData.prenom);
        expect(contact.telephone).toBe(contactData.telephone);
        expect(contact.email).toBe(contactData.email);
    });

    it('create contact without all the params ', async () => {
        const contact = new Contact({
            nom: 'Jules',
        });

        let err: any;
        try {
            await contact.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.email).toBeDefined();
    });

    it('update a contact successfully', async () => {
        const contact = await Contact.findOneAndUpdate(
            { email: contactData.email },
            { email: 'johnatan.doe@gmail.com' },
            { new: true },
        );

        expect(contact?._id).toBeDefined();
        expect(contact?.nom).toBe(contactData.nom);
        expect(contact?.prenom).toBe(contactData.prenom);
        expect(contact?.telephone).toBe(contactData.telephone);
        expect(contact?.email).toBe('johnatan.doe@gmail.com');
    });
});
