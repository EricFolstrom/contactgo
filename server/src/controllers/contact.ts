import { ContactFactory, IContact } from '@/db/Contact';
import {
    DocumentNotFoundError,
    RequestParamEmptyError,
    RequestParamNotProvidedError,
    UniqueContraintError,
} from '@/helpers/errors';
import validateContactInfo from '@/helpers/validate-contact-params';

// @createContact
export const createContact = async ({
    params: { nom, prenom, email, telephone },
    contactFactory,
}: {
    params: IContact;
    contactFactory: ContactFactory;
}) => {
    const { nomValid, prenomValid, telephoneValid, emailValid } = validateContactInfo({
        nom,
        prenom,
        email,
        telephone,
    });

    const oldContact = await contactFactory.findContactByEmail({ email: emailValid });

    if (oldContact) {
        throw new UniqueContraintError('email');
    }

    const contact = await contactFactory.addContact({
        nom: nomValid,
        prenom: prenomValid,
        telephone: telephoneValid,
        email: emailValid,
    });

    return contact;
};

// @getContacts
export const getContacts = async ({
    limit,
    page,
    contactFactory,
}: {
    limit: number;
    page: number;
    contactFactory: ContactFactory;
}) => {
    const { contacts, totalPages, currentPage } = await contactFactory.findContacts({
        limit,
        page,
    });

    return {
        contacts,
        totalPages,
        currentPage,
    };
};

// @getContact
export const getContact = async ({
    contactId,
    contactFactory,
}: {
    contactId: string;
    contactFactory: ContactFactory;
}) => {
    const contact = await contactFactory.findContactById({ id: contactId });

    return contact;
};

// @updateContact
export const updateContact = async ({
    params: { nom, prenom, email, telephone },
    contactId,
    contactFactory,
}: {
    params: IContact;
    contactId: string;
    contactFactory: ContactFactory;
}) => {
    const { nomValid, prenomValid, telephoneValid, emailValid } = validateContactInfo({
        nom,
        prenom,
        email,
        telephone,
    });

    const oldContact = await contactFactory.findContactById({ id: contactId });

    if (!oldContact) {
        throw new DocumentNotFoundError('contact');
    }

    const contact = await contactFactory.updateContact({
        params: {
            nom: nomValid,
            prenom: prenomValid,
            telephone: telephoneValid,
            email: emailValid,
        },
        contactId,
    });

    return contact;
};

// @deleteContacts
export const deleteContacts = async ({
    contactIds,
    contactFactory,
}: {
    contactIds: Array<string>;
    contactFactory: ContactFactory;
}) => {
    if (!contactIds) {
        throw new RequestParamNotProvidedError('contactIds');
    } else if (contactIds.length == 0) {
        throw new RequestParamEmptyError('contactIds');
    }

    await contactFactory.deleteContacts({
        idArray: contactIds,
    });
};
