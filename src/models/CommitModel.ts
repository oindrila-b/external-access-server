export class CommitModel {
    private _message: string;
    private _committer: string;
    private _commitURL: string;
    private _id: string;

    constructor(message: string, committer: string, commitURL: string, id: string) {
        this._message = message;
        this._committer = committer;
        this._commitURL = commitURL;
        this._id = id;
    }

    get commitURL(): string {return this._commitURL}
    get message(): string {return this._message}
    get committer(): string {return this._committer}
    get id(): string {return this._id}
}