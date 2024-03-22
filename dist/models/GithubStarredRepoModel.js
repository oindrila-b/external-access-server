"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubStarredRepo = void 0;
class GithubStarredRepo {
    constructor(id, owner, name, url) {
        this._id = id;
        this._owner = owner;
        this._name = name;
        this._url = url;
    }
    get id() { return this._id; }
    get name() { return this._name; }
    get url() { return this._url; }
    get owner() { return this._owner; }
}
exports.GithubStarredRepo = GithubStarredRepo;
