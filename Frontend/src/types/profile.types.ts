import { CoverLetter } from "./cover-letter.types";
import { Faq } from "./faq.types";

export interface Profile {
    _id?: string,
    name?: string,
    stack?: string,
    type?: string,
    createdAt?: Date,
    updatedAt?: Date,
}

export interface ProfileDetail {
    profile: Profile,
    coverLetters: CoverLetter[],
    faqs: Faq[],
}