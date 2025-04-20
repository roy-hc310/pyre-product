import { Env } from "../utils/env";
import { Client } from "@elastic/elasticsearch";

export class ElasticSearchInfrastructure {
    client: Client
    constructor() {
        this.client = new Client({ 
            node: 'http://localhost:9200',
            auth: {
                username: 'elastic',
                password: 'rackal',
            },
        })
    }

}