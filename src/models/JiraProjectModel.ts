export class JiraProjectInfo {
    private _id: string;
    private _key: string;
    private _name: string;
    private _last_modified: string;
    private _url: string;
    private _number_of_issues: string;

    constructor(id: string, key: string, name: string, last_modified: string, number_of_issues: string, url: string,) {
        this._id = id;
        this._key = key;
        this._name = name;
        this._last_modified = last_modified;
        this._number_of_issues = number_of_issues;
        this._url = url;
    }

    get id() { return this._id; }
    get name() { return this._name; }
    get last_modified() { return this._last_modified; }
    get url() { return this._url; }
    get number_of_issues() { return this._number_of_issues; } 
    get key() {return this._key}

}