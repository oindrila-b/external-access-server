"use strict";
/***
 * This class defines the structure for holding Information about a Github Repository that has been Starred by the user
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubStarredRepo = void 0;
class GithubStarredRepo {
    /**
     * @constructor
     * @param id {string} The id of the repository
     * @param owner {string} The owner of the repository
     * @param name {string} The name of the repository
     * @param url {string} The url of the repository
     */
    constructor(id, owner, name, url) {
        this._id = id;
        this._owner = owner;
        this._name = name;
        this._url = url;
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
    /**
    * Returns the owner of the repository
    */
    get owner() { return this._owner; }
}
exports.GithubStarredRepo = GithubStarredRepo;
