import {User} from "../users/User";

export interface FindUser {
    find(user : User) : User;
}