"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStarredRepositories = exports.getGithubRepositories = void 0;
const node_1 = require("@nangohq/node");
const dotenv = __importStar(require("dotenv"));
const GithubRepositoryInfoModel_1 = require("../models/GithubRepositoryInfoModel");
const GithubStarredRepoModel_1 = require("../models/GithubStarredRepoModel");
const types_1 = require("../entity_enum/types");
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const nango = new node_1.Nango({ secretKey: SECRET_KEY });
const INTEGRATION_ID = process.env.INTEGRATION_ID;
const CONNECTION_ID = process.env.CONNECTION_ID;
function getGithubRepositories() {
    return __awaiter(this, void 0, void 0, function* () {
        let repoInfo = [];
        const response = yield nango.triggerAction(INTEGRATION_ID, CONNECTION_ID, 'github-fetch-repos');
        const parsedResponse = JSON.parse(JSON.stringify(response));
        populateGithubData(parsedResponse, repoInfo, types_1.Types.GithubRepoInfo);
        console.log(repoInfo);
        return repoInfo;
    });
}
exports.getGithubRepositories = getGithubRepositories;
function getStarredRepositories() {
    return __awaiter(this, void 0, void 0, function* () {
        let starredRepos = [];
        const response = yield nango.triggerAction(INTEGRATION_ID, CONNECTION_ID, 'github-fetch-starred');
        const parsedResponse = JSON.parse(JSON.stringify(response));
        populateGithubData(parsedResponse, starredRepos, types_1.Types.GithubStarredRepo);
        console.log(starredRepos);
        return starredRepos;
    });
}
exports.getStarredRepositories = getStarredRepositories;
function populateGithubData(parsedResponse, repositoriesArray, types) {
    parsedResponse.repos.forEach((repo) => {
        let repositoryInfo = (types === types_1.Types.GithubRepoInfo) ?
            new GithubRepositoryInfoModel_1.GithubRepoInfo(repo.id, repo.name, repo.url) :
            new GithubStarredRepoModel_1.GithubStarredRepo(repo.id, repo.owner, repo.name, repo.url);
        repositoriesArray.push(repositoryInfo);
    });
}
