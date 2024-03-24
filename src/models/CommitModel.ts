export class CommitModel {
    private _message: string;
    private _committer: string;
    private _commitURL: string;

    constructor(message: string, committer: string, commitURL: string) {
        this._message = message;
        this._committer = committer;
        this._commitURL = commitURL;
    }

    get commitURL(): string {return this._commitURL}
    get message(): string {return this._message}
    get committer(): string {return this._committer}
}