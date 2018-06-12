declare module "express-http-proxy" {

    import * as express from "express";

    function ExpressHttpProxy(host: string): express.RequestHandler;

    export = ExpressHttpProxy;

}
