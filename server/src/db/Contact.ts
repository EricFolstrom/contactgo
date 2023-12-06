import { Document, ObjectId, Schema, Types, model } from 'mongoose';

// interface représentant un document de contact
export interface IContact {
    nom: string;
    prenom: string;
    telephone: string;
    email: string;
}

// créer un schéma correspondant à l'interface du document.
const contactSchema = new Schema<IContact>({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    telephone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
});

const Contact = model<IContact>("Contact", contactSchema);

export default Contact;

// type représentant les parametres de la fonction findContacts
type findParams = {
    limit: number;
    page: number;
}

// type ContactFactory
export type ContactFactory = {
    findContactById: ({ id }: { id: string }) => Promise<{ 
        contact: (Document<unknown, {}, IContact> & IContact & { 
            _id: Types.ObjectId; }) | null; }>,
    findContactByEmail: ({ email }: { email: string }) => Promise<{ 
        contact: (Document<unknown, {}, IContact> & IContact & { 
            _id: Types.ObjectId; }) | null; }>,
    findContacts: ({ limit, page }: findParams) => Promise<{
        contacts: (Document<unknown, {}, IContact> & IContact & {
            _id: Types.ObjectId;
        })[];
        totalPages: number;
        currentPage: number;
    }>,
    addContact: ({ nom, prenom, telephone, email }: IContact) => Promise<IContact>,
    updateContact: ({params: { nom, prenom, telephone, email }, contactId}: {params: IContact, contactId: string}) => Promise<IContact>,
    deleteContacts: ({ idArray }: { idArray: Array<string> }) => void
};

// objet qui expose les methodes "CRUD"
export const contactFactory : ContactFactory = {
    findContactById: async ({ id }) => {

        const contact : any = await Contact.findOne({ _id: id })

        return contact
    },
    findContactByEmail: async ({ email }) => {

        const contact : any = await Contact.findOne({ email })

        return contact
    },
    findContacts: async ({ limit, page }) => {

        const contacts = await Contact.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        // get total documents in the Contact collection 
        const count = await Contact.countDocuments();

        return {
            contacts,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        }
    },
    addContact: async ({ nom, prenom, telephone, email }) => {

        const contact = new Contact({
            nom,
            prenom,
            telephone,
            email
        });

        await contact.save();

        return contact;
    },
    updateContact: async ({params: { nom, prenom, telephone, email }, contactId}) => {

        let contact : any = await Contact.findByIdAndUpdate({ _id: contactId }, {
            nom,
            prenom,
            telephone,
            email
        }, {
            new: true
        });

        return contact;
    },
    deleteContacts: async ({ idArray }) => {

        await Contact.deleteMany({
            _id: {
                $in: idArray
            }
        });
    }
}