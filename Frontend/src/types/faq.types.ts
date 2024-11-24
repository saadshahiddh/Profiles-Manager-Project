import { Profile } from "./profile.types";

export interface Faq {
    _id?: string;
    answer?: string;
    profileId?: Profile['_id'];
    question?: string;
    createdAt?: Date;
    updatedAt?: Date;
}