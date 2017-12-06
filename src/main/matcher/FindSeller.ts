import {Seller} from "../users/Seller";

import {User} from "../users/User";
import {FindUser} from "./FindUser";
import {ProfileCache} from "../database/ConversationCache";

export interface FindSeller extends FindUser {
    find(user : User) : Seller;
}

export class FindSellerConc implements FindSeller {

    find(user : User) : Seller {
        // simple
        ProfileCache.getPreferences(user.get)
        return null;
    }
}