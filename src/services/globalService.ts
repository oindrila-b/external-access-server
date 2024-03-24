import { Nango } from '@nangohq/node';
import * as dotenv from 'dotenv';
import {GithubRepoInfo} from '../models/GithubRepositoryInfoModel';
import { GithubStarredRepo } from '../models/GithubStarredRepoModel';
import { Types } from '../entity_enum/types';
import { JiraIssueInfo } from '../models/JiraIssueModel';
import { JiraProjectInfo } from '../models/JiraProjectModel';
import { CommitModel } from '../models/CommitModel';

dotenv.config()


/**
 * @type {string}
 */
const SECRET_KEY:string =process.env.SECRET_KEY as string;

/**
 * @type {Nango}
 */
const nango:Nango = new Nango({ secretKey: SECRET_KEY});

/**
 * @type {string}
 */
const INTEGRATION_ID_GITHUB:string = process.env.INTEGRATION_ID_GITHUB as string;
/**
 * @type {string}
 */
const CONNECTION_ID_GITHUB:string = process.env.CONNECTION_ID_GITHUB as string;
/**
 * @type {string}
 */
const INTEGRATION_ID_JIRA:string = process.env.INTEGRATION_ID_JIRA as string;
/**
 * @type {string}
 */
const CONNECTION_ID_JIRA:string = process.env.CONNECTION_ID_JIRA as string;


/**
 * @type {any} 
 */
let token:any;

/**
 * @type {string}
 */
let githubUser: string = '';

/**
 * @type {string}
 */
let COMMIT_REQUEST_ENDPOINT: string = `https://api.github.com/repos/`;

/**
 * Function to fetch all the repositories belonging to the authenticated user
 * @returns Promise<GithubRepoInfo[]> 
 */
export async function getGithubRepositories(): Promise<GithubRepoInfo[]>  {

    console.log(token);

    let repoInfo : GithubRepoInfo[] = [];
    const response: object = await nango.triggerAction(
        INTEGRATION_ID_GITHUB,
        CONNECTION_ID_GITHUB,
        'github-fetch-repos',
        
    );

    const parsedResponse = JSON.parse(JSON.stringify(response))

    populateGithubData(parsedResponse, repoInfo, Types.GithubRepoInfo);
    console.log(repoInfo)

    return repoInfo;
    
}

/**
 * Function to fetch all the repositories the authenticated user has starred
 * @returns Promise<GithubStarredRepo[]> 
 */
export async function getStarredRepositories() : Promise<GithubStarredRepo[]> {

    token = await nango.getToken(INTEGRATION_ID_GITHUB, CONNECTION_ID_GITHUB)
    console.log(token);

    let starredRepos : GithubStarredRepo[] = [];
    const response: object = await nango.triggerAction(
        INTEGRATION_ID_GITHUB,
        CONNECTION_ID_GITHUB,
        'github-fetch-starred',
        
    );

    const parsedResponse = JSON.parse(JSON.stringify(response))

    populateGithubData(parsedResponse, starredRepos, Types.GithubStarredRepo);
    console.log(starredRepos)

    return starredRepos;
}

/**
 * Function to fetch all the issues the authenticated user has 
 * @returns JiraIssues[]
 */
export async function getJiraIssues() : Promise<JiraIssueInfo[]> {

    let jiraIssues : JiraIssueInfo[] = [];
    const response: object = await nango.triggerAction(
        INTEGRATION_ID_JIRA,
        CONNECTION_ID_JIRA,
        'jira-fetch-issues',
        
    );

    const parsedResponse = JSON.parse(JSON.stringify(response))
    console.log(parsedResponse)

    populateJiraData(parsedResponse.issueArray, jiraIssues, Types.JiraIssue);
  //  console.log(jiraIssues)
  
    return jiraIssues;
}

/**
 * Function to fetch all the projects the authenticated user has 
 * @returns JiraProjectInfo[]
 */
export async function getJiraProjects() : Promise<JiraProjectInfo[]> {

    let jiraProjects : JiraProjectInfo[] = [];

    const response: object = await nango.triggerAction(
        INTEGRATION_ID_JIRA,
        CONNECTION_ID_JIRA,
        'jira-fetch-projects',
        
    );

    const parsedResponse = JSON.parse(JSON.stringify(response))
    //console.log(parsedResponse)

    populateJiraData(parsedResponse.projectsArray, jiraProjects, Types.JiraProject);
   // console.log(jiraProjects)
  
    return jiraProjects;
}

/**
 * Method to fetch the commits of a specific repository of the authenticated user
 * @param repositoryName Represents the name of the repository whose commits we want to get
 * @returns CommitModel[]
 */

export async function getCommitsForRepository(repositoryName:string): Promise<string | CommitModel[]> {

    let commits: CommitModel[] = [];

    token = await nango.getToken(INTEGRATION_ID_GITHUB, CONNECTION_ID_GITHUB);

    let repos = await getGithubRepositories();
    githubUser = repos[0].owner as string;

    if(repositoryName === '' || githubUser === '' ||token === undefined) {
        return "Required information missing"
    }

    const fetchedCommits = await fetch(`${COMMIT_REQUEST_ENDPOINT}${githubUser}/${repositoryName}/commits`, {
        method: 'GET',
        headers:{
            'Accept': 'application/vnd.github+json',
            'Authorization': `Bearer ${token}`,
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })


    const data = await fetchedCommits.json();

   if(data.message){
    console.log(data.message);
    return "No Repository Found"
   } else {

    console.log(data)

    populateCommitModels(data, commits)
    console.log(commits)
    return commits;
   }

}


/**
 * 
 * @param parsedResponse {any} - Response from the fetched data in json object format
 * @param repositoriesArray {any[]} - Array of Type which will be populated
 * @param types {Types} - Enum that determines which class' objects will be created 
 */

function populateGithubData(parsedResponse:any, repositoriesArray:any[], types: Types) {
    parsedResponse.repos.forEach((repo: any) => {
        let repositoryInfo = (types === Types.GithubRepoInfo) ? 
        new GithubRepoInfo(repo.id, repo.name, repo.url, repo.owner) :
         new GithubStarredRepo(repo.id, repo.owner, repo.name, repo.url)
        repositoriesArray.push(repositoryInfo)
    });
}

/**
 * 
 * @param parsedResponse {any} - Response from the fetched data in json object format
 * @param repositoriesArray {any[]} - Array of Type which will be populated
 * @param types {Types} - Enum that determines which class' objects will be created 
 */

function populateJiraData(parsedResponse:any, repositoriesArray:any[], types: Types) {
    parsedResponse.forEach((response: any) => {
        let repositoryInfo = (types === Types.JiraProject) ? 
        new JiraProjectInfo(response.id, response.key, response.name, response.last_modified, response.number_of_issues, response.url) :
         new JiraIssueInfo(response.id, response.key,response.summary,response.issueType,response.status, response.url, response.projectName)
        repositoriesArray.push(repositoryInfo)
    });
}


function populateCommitModels(parsedResponse:any, commitsArray:any[]) {
    parsedResponse.forEach((response: any) => {
        let commit = new CommitModel(response.commit.message, response.author.login, response.html_url, response.sha)
        console.log(commit)
        commitsArray.push(commit)
    })
}