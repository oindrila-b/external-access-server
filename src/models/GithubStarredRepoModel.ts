export class GithubStarredRepo {
    private _id: string;
    private _owner: string;
    private _name: string;
    private _url: string;
     
     constructor(id: string, owner: string, name: string, url: string) {
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