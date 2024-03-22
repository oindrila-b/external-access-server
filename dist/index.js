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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const globalService_1 = require("./services/globalService");
dotenv.config();
/**
 * @type {Express}
 */
const app = (0, express_1.default)();
/**
 * @type {number}
 */
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200);
    res.send("EXTERNAL SERVER ACCESS");
}));
app.get('/list/:integration?/:entity?', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("HELLO");
    const integration = req.params.integration;
    const entity = req.params.entity;
    if (integration === 'github') {
        switch (entity) {
            case 'repository':
                const repos = yield (0, globalService_1.getGithubRepositories)();
                if (repos !== null || repos !== undefined) {
                    res.status(200);
                    console.log(repos);
                    res.json(repos);
                }
                else {
                    res.send(`Cannot fetch data for ${entity}`);
                }
                break;
            case 'starred':
                const starred = yield (0, globalService_1.getStarredRepositories)();
                if (starred !== null || starred !== undefined) {
                    res.status(200);
                    res.json(starred);
                }
                else {
                    res.send(`Cannot fetch data for ${entity}`);
                }
                break;
        }
    }
    else if (integration === 'jira') {
        switch (entity) {
            case 'issues':
                const issues = yield (0, globalService_1.getJiraIssues)();
                if (issues !== null || issues !== undefined) {
                    res.status(200);
                    console.log(issues);
                    res.json(issues);
                }
                else {
                    res.send(`Cannot fetch data for ${entity}`);
                }
                break;
            case 'projects':
                const projects = yield (0, globalService_1.getJiraProjects)();
                if (projects !== null || projects !== undefined) {
                    res.status(200);
                    res.json(projects);
                }
                else {
                    res.send(`Cannot fetch data for ${entity}`);
                }
                break;
        }
    }
    else {
        res.send(`${integration === null || integration === void 0 ? void 0 : integration.toUpperCase()} - This integration is not supported at the moment.`);
    }
}));
