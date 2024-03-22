"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubRepoInfo = void 0;
class GithubRepoInfo {
    constructor(id, name, url) {
        this._id = id;
        this._name = name;
        this._url = url;
    }
    get id() { return this._id; }
    get name() { return this._name; }
    get url() { return this._url; }
}
exports.GithubRepoInfo = GithubRepoInfo;
