"use strict";
/***
 * This class defines the structure for holding Information about a Github Repository
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubRepoInfo = void 0;
class GithubRepoInfo {
    /**
     * @constructor
     * @param id {string} - Represents the id of the repository
     * @param name {string} - Represents the name of the repository
     * @param url {string} - Represents the url of the repository
     * @param owner {string} - Represents the owner of the repository
     */
    constructor(id, name, url, owner) {
        this._id = id;
        this._name = name;
        this._url = url;
        this._owner = owner;
    }
    /**
     * Returns the id of the repository
     */
    get id() { return this._id; }
    /**
     * Returns the name of the repository
     */
    get name() { return this._name; }
    /**
     * Returns the url of the repository
     */
    get url() { return this._url; }
    get owner() { return this._owner; }
}
exports.GithubRepoInfo = GithubRepoInfo;
