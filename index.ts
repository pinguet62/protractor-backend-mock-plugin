import * as cors from "cors";
import * as express from "express";
import * as proxy from "express-http-proxy";
import {json, urlencoded} from "body-parser";
import {ProtractorPlugin} from "protractor";
import {Server} from "http";

let server: Server;

const backendMockPlugin: ProtractorPlugin = {
    setup() {
        if (!this.config) {
            throw new Error("Missing config");
        }

        const [fakePort = 8081, fakeHost = "localhost"] = this.config.fake;
        const [backendPort = 8080, backendHost = "localhost"] = this.config.backend;

        const app = express();
        app.use(cors()); // different port
        app.use(urlencoded({extended: false})); // form data
        app.use(json()); // body
        app.use("/", proxy(`http://${fakeHost}:${fakePort}`));
        server = app.listen(backendPort, backendHost);
    },
    teardown() {
        server.close();
    },
};

module.exports = backendMockPlugin;
