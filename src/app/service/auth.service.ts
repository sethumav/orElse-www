import { Injectable } from '@angular/core';

export class User {
    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
    username: string;
    password: string;
}
@Injectable()
export class AuthService {
    user: User;
    constructor() {
        this.user = new User('', '');
    }
    // should return a promise to the UI for auth result, for now just return a boolean
    authenticate(user: User): boolean {
        this.user = user;
        return true;
    }
}