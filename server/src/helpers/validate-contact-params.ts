import { IContact } from '@/db/Contact';
import { InvalidPropertyError, RequiredParameterError } from './errors';
import isValideEmail from './is-valid-email';

export default function validateContactInfo({ nom, prenom, email, telephone }: IContact) {
    if (!nom || (nom && nom.trim().length < 2)) {
        throw new InvalidPropertyError(`A contact last name must be at least 2 caracters long`);
    }

    if (!prenom || (prenom && prenom.trim().length < 2)) {
        throw new InvalidPropertyError(`A contact first name must be at least 2 caracters long`);
    }

    if (!telephone || (telephone && telephone.trim().length == 0)) {
        throw new RequiredParameterError(`telephone`);
    }

    if (telephone && telephone.trim().length < 8) {
        throw new InvalidPropertyError(`The telephone must be at least 8 caracters long`);
    }

    if (!email || (email && email.trim().length == 0)) {
        throw new RequiredParameterError(`email`);
    }

    if (email && !isValideEmail(email.trim())) {
        throw new InvalidPropertyError(`The contact email must be valid`);
    }

    return {
        nomValid: nom.trim(),
        prenomValid: prenom.trim(),
        telephoneValid: telephone.trim(),
        emailValid: email.trim(),
    };
}
