export class JiraIssueInfo {
    private _id: string;
    private _key: string;
    private _summary: string;
    private _issueType: string;
    private _status: string;
    private _url: string;
    private _projectName: string;

    constructor(id: string, key:string, summary: string, issueType: string, status: string, url: string, projectName: string) {
        this._id = id;
        this._key = key;
        this._summary = summary;
        this._issueType = issueType;
        this._status = status;
        this._url = url;
        this._projectName = projectName;
    }

    get id() { return this._id; }
    get summary() { return this._summary; }
    get issueType() { return this._issueType; }
    get status() { return this._status; }
    get url() { return this._url; }
    get projectName() { return this._projectName; }
    get key() { return this._key; }
}