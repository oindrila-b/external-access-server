export class GithubRepoInfo {
   private _id: string;
   private _name: string;
   private _url: string;
    
    constructor(id: string, name: string, url: string) {
        this._id = id;
        this._name = name;
        this._url = url;
    }

    get id() { return this._id; }
    get name() { return this._name; }
    get url() { return this._url; }
}