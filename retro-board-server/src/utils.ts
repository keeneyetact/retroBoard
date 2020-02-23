import { Request } from "express";
import { User } from "retro-board-common";

export function getUser(request: Request): User | null {
    if (request.session?.passport?.user) {
        return request.session.passport.user;
    }

    return null;
}