import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { getGithubRepositories, getStarredRepositories } from './services/globalService';

dotenv.config()

/**
 * @type {Express}
 */
const app = express();

/**
 * @type {number}
 */
const PORT = process.env.PORT || 5000

app.use(cors());


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})


app.get('/', async (req, res) => {
    res.status(200)
    res.send("EXTERNAL SERVER ACCESS")

})


app.get('/list/:integration?/:entity?', async (req, res) => {
    console.log("HELLO")
    const integration = req.params.integration;
    const entity = req.params.entity;

    if (integration === 'github') {
        switch (entity) {
            case 'repository':
                const repos = await getGithubRepositories();
                if (repos !== null || repos !== undefined) {
                    res.status(200)
                    console.log(repos)
                    res.json(repos)
                } else {
                    res.send(`Cannot fetch data for ${entity}`)
                }
                break;
            case 'starred':
                const starred = await getStarredRepositories();
                if (starred !== null || starred !== undefined) {
                    res.status(200)
                    res.json(starred)
                } else {
                    res.send(`Cannot fetch data for ${entity}`)
                }
                break;
        }
    }
    else if (integration === 'jira') {

    }
    else {
        res.send(`${integration?.toUpperCase()} - This integration is not supported at the moment.`)
    }
})

