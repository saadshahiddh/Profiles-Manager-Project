import { Profile } from "./profile.types";

export interface CoverLetter {
    _id?: string;
    description?: string;
    profileId?: Profile['_id'];
}