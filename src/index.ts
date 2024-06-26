import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { getCommitsForRepository, getGithubRepositories, getJiraIssues, getJiraProjects, getStarredRepositories } from './services/globalService';

dotenv.config()

/**
 * @type {Express}
 */
const app = express();

/**
 * @type {number}
 */
const PORT = process.env.PORT 

app.use(cors());


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})


app.get('/', async (req, res) => {
    res.status(200)
    res.send("EXTERNAL SERVER ACCESS")
})


app.get('/list/:integration?/:entity?', async (req, res) => {
    const integration = req.params.integration;
    const entity = req.params.entity;

    if (integration === 'github') {
        switch (entity) {
            case 'repository':
                const repos = await getGithubRepositories();
                if (repos !== null || repos !== undefined) {
                    res.status(200)
                   // console.log(repos)
                    res.json(repos)
                } else {
                    res.status(404)
                    res.send(`Cannot fetch data for ${entity}`)
                }
                break;
            case 'starred':
                const starred = await getStarredRepositories();
                if (starred !== null || starred !== undefined) {
                    res.status(200)
                    res.json(starred)
                } else {
                    res.status(404)
                    res.send(`Cannot fetch data for ${entity}`)
                }
                break;
        }
    }
    else if (integration === 'jira') {
        switch (entity) {
            case 'issues':
                const issues = await getJiraIssues();
                if (issues !== null || issues !== undefined) {
                    res.status(200)
                    console.log(issues)
                    res.json(issues)
                } else {
                    res.status(404)
                    res.send(`Cannot fetch data for ${entity}`)
                }
                break;
            case 'projects':
                const projects = await getJiraProjects();
                if (projects !== null || projects !== undefined) {
                    res.status(200)
                    res.json(projects)
                } else {
                    res.status(404)
                    res.send(`Cannot fetch data for ${entity}`)
                }
                break;
        }
    }
    else {
        res.status(404)
        res.send(`${integration?.toUpperCase()} - This integration is not supported at the moment.`)
    }
})

app.get('/commits/:repository', async (req, res) => {
    console.log(req.params.repository)
    const data = await getCommitsForRepository(req.params.repository);
    console.log(data)
    if(data.length === 0) {
        res.status(404)
        res.json('Repository not found')
    } else{
        res.status(200)
        res.json(data)
    }
})