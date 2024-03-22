import { Nango } from '@nangohq/node';
import * as dotenv from 'dotenv';
import {GithubRepoInfo} from '../models/GithubRepositoryInfoModel';
import { GithubStarredRepo } from '../models/GithubStarredRepoModel';
import { Types } from '../entity_enum/types';

dotenv.config()


const SECRET_KEY=process.env.SECRET_KEY
const nango = new Nango({ secretKey: SECRET_KEY as string});

const INTEGRATION_ID = process.env.INTEGRATION_ID as string;
const CONNECTION_ID = process.env.CONNECTION_ID as string;


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



function populateGithubData(parsedResponse:any, repositoriesArray:any[], types: Types) {
    parsedResponse.repos.forEach((repo: any) => {
        let repositoryInfo = (types === Types.GithubRepoInfo) ? 
        new GithubRepoInfo(repo.id, repo.name, repo.url) :
         new GithubStarredRepo(repo.id, repo.owner, repo.name, repo.url)
        repositoriesArray.push(repositoryInfo)
    });
}