import { Nango } from '@nangohq/node';
import * as dotenv from 'dotenv';
import {GithubRepoInfo} from '../models/GithubRepositoryInfoModel';
import { GithubStarredRepo } from '../models/GithubStarredRepoModel';
import { Types } from '../entity_enum/types';

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
const INTEGRATION_ID:string = process.env.INTEGRATION_ID as string;
/**
 * @type {string}
 */
const CONNECTION_ID:string = process.env.CONNECTION_ID as string;


/**
 * Function to fetch all the repositories belonging to the authenticated user
 * @returns Promise<GithubRepoInfo[]> 
 */
export async function getGithubRepositories(): Promise<GithubRepoInfo[]>  {

    let repoInfo : GithubRepoInfo[] = [];
    const response: object = await nango.triggerAction(
        INTEGRATION_ID,
        CONNECTION_ID,
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

    let starredRepos : GithubStarredRepo[] = [];
    const response: object = await nango.triggerAction(
        INTEGRATION_ID,
        CONNECTION_ID,
        'github-fetch-starred',
        
    );

    const parsedResponse = JSON.parse(JSON.stringify(response))

    populateGithubData(parsedResponse, starredRepos, Types.GithubStarredRepo);
    console.log(starredRepos)

    return starredRepos;
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
        new GithubRepoInfo(repo.id, repo.name, repo.url) :
         new GithubStarredRepo(repo.id, repo.owner, repo.name, repo.url)
        repositoriesArray.push(repositoryInfo)
    });
}