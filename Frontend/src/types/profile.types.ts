import { CoverLetter } from "./cover-letter.types";
import { Faq } from "./faq.types";
import { User } from "./user.types";

export interface Profile {
    _id?: string;
    name?: string;
    stack?: string;
    type?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ProfileDetail extends Profile {
    coverLetters: CoverLetter[];
    faqs: Faq[];
}

export interface ProfileFormData {
    userId: User['_id'],
    profile: Profile;
    coverLetters: CoverLetter[];
    faqs: Faq[];
}