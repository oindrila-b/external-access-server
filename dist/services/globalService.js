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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommitsForRepository = exports.getJiraProjects = exports.getJiraIssues = exports.getStarredRepositories = exports.getGithubRepositories = void 0;
const node_1 = require("@nangohq/node");
const dotenv = __importStar(require("dotenv"));
const GithubRepositoryInfoModel_1 = require("../models/GithubRepositoryInfoModel");
const GithubStarredRepoModel_1 = require("../models/GithubStarredRepoModel");
const types_1 = require("../entity_enum/types");
const JiraIssueModel_1 = require("../models/JiraIssueModel");
const JiraProjectModel_1 = require("../models/JiraProjectModel");
const CommitModel_1 = require("../models/CommitModel");
dotenv.config();
/**
 * @type {string}
 */
const SECRET_KEY = process.env.SECRET_KEY;
/**
 * @type {Nango}
 */
const nango = new node_1.Nango({ secretKey: SECRET_KEY });
/**
 * @type {string}
 */
const INTEGRATION_ID_GITHUB = process.env.INTEGRATION_ID_GITHUB;
/**
 * @type {string}
 */
const CONNECTION_ID_GITHUB = process.env.CONNECTION_ID_GITHUB;
/**
 * @type {string}
 */
const INTEGRATION_ID_JIRA = process.env.INTEGRATION_ID_JIRA;
/**
 * @type {string}
 */
const CONNECTION_ID_JIRA = process.env.CONNECTION_ID_JIRA;
/**
 * @type {any}
 */
let token;
/**
 * @type {string}
 */
let githubUser = '';
/**
 * @type {string}
 */
let COMMIT_REQUEST_ENDPOINT = `https://api.github.com/repos/`;
/**
 * Function to fetch all the repositories belonging to the authenticated user
 * @returns Promise<GithubRepoInfo[]>
 */
async function getGithubRepositories() {
    console.log(token);
    let repoInfo = [];
    const response = await nango.triggerAction(INTEGRATION_ID_GITHUB, CONNECTION_ID_GITHUB, 'github-fetch-repos');
    const parsedResponse = JSON.parse(JSON.stringify(response));
    populateGithubData(parsedResponse, repoInfo, types_1.Types.GithubRepoInfo);
    console.log(repoInfo);
    return repoInfo;
}
exports.getGithubRepositories = getGithubRepositories;
/**
 * Function to fetch all the repositories the authenticated user has starred
 * @returns Promise<GithubStarredRepo[]>
 */
async function getStarredRepositories() {
    token = await nango.getToken(INTEGRATION_ID_GITHUB, CONNECTION_ID_GITHUB);
    console.log(token);
    let starredRepos = [];
    const response = await nango.triggerAction(INTEGRATION_ID_GITHUB, CONNECTION_ID_GITHUB, 'github-fetch-starred');
    const parsedResponse = JSON.parse(JSON.stringify(response));
    populateGithubData(parsedResponse, starredRepos, types_1.Types.GithubStarredRepo);
    console.log(starredRepos);
    return starredRepos;
}
exports.getStarredRepositories = getStarredRepositories;
/**
 * Function to fetch all the issues the authenticated user has
 * @returns JiraIssues[]
 */
async function getJiraIssues() {
    let jiraIssues = [];
    const response = await nango.triggerAction(INTEGRATION_ID_JIRA, CONNECTION_ID_JIRA, 'jira-fetch-issues');
    const parsedResponse = JSON.parse(JSON.stringify(response));
    console.log(parsedResponse);
    populateJiraData(parsedResponse.issueArray, jiraIssues, types_1.Types.JiraIssue);
    //  console.log(jiraIssues)
    return jiraIssues;
}
exports.getJiraIssues = getJiraIssues;
/**
 * Function to fetch all the projects the authenticated user has
 * @returns JiraProjectInfo[]
 */
async function getJiraProjects() {
    let jiraProjects = [];
    const response = await nango.triggerAction(INTEGRATION_ID_JIRA, CONNECTION_ID_JIRA, 'jira-fetch-projects');
    const parsedResponse = JSON.parse(JSON.stringify(response));
    //console.log(parsedResponse)
    populateJiraData(parsedResponse.projectsArray, jiraProjects, types_1.Types.JiraProject);
    // console.log(jiraProjects)
    return jiraProjects;
}
exports.getJiraProjects = getJiraProjects;
/**
 * Method to fetch the commits of a specific repository of the authenticated user
 * @param repositoryName Represents the name of the repository whose commits we want to get
 * @returns CommitModel[]
 */
async function getCommitsForRepository(repositoryName) {
    let commits = [];
    token = await nango.getToken(INTEGRATION_ID_GITHUB, CONNECTION_ID_GITHUB);
    let repos = await getGithubRepositories();
    githubUser = repos[0].owner;
    if (repositoryName === '' || githubUser === '' || token === undefined) {
        return "Required information missing";
    }
    const fetchedCommits = await fetch(`${COMMIT_REQUEST_ENDPOINT}${githubUser}/${repositoryName}/commits`, {
        method: 'GET',
        headers: {
            'Accept': 'application/vnd.github+json',
            'Authorization': `Bearer ${token}`,
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });
    const data = await fetchedCommits.json();
    console.log(data);
    populateCommitModels(data, commits);
    console.log(commits);
    return commits;
}
exports.getCommitsForRepository = getCommitsForRepository;
/**
 *
 * @param parsedResponse {any} - Response from the fetched data in json object format
 * @param repositoriesArray {any[]} - Array of Type which will be populated
 * @param types {Types} - Enum that determines which class' objects will be created
 */
function populateGithubData(parsedResponse, repositoriesArray, types) {
    parsedResponse.repos.forEach((repo) => {
        let repositoryInfo = (types === types_1.Types.GithubRepoInfo) ?
            new GithubRepositoryInfoModel_1.GithubRepoInfo(repo.id, repo.name, repo.url, repo.owner) :
            new GithubStarredRepoModel_1.GithubStarredRepo(repo.id, repo.owner, repo.name, repo.url);
        repositoriesArray.push(repositoryInfo);
    });
}
/**
 *
 * @param parsedResponse {any} - Response from the fetched data in json object format
 * @param repositoriesArray {any[]} - Array of Type which will be populated
 * @param types {Types} - Enum that determines which class' objects will be created
 */
function populateJiraData(parsedResponse, repositoriesArray, types) {
    parsedResponse.forEach((response) => {
        let repositoryInfo = (types === types_1.Types.JiraProject) ?
            new JiraProjectModel_1.JiraProjectInfo(response.id, response.key, response.name, response.last_modified, response.number_of_issues, response.url) :
            new JiraIssueModel_1.JiraIssueInfo(response.id, response.key, response.summary, response.issueType, response.status, response.url, response.projectName);
        repositoriesArray.push(repositoryInfo);
    });
}
function populateCommitModels(parsedResponse, commitsArray) {
    parsedResponse.forEach((response) => {
        let commit = new CommitModel_1.CommitModel(response.commit.message, response.author.login, response.html_url);
        console.log(commit);
        commitsArray.push(commit);
    });
}
