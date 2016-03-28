import {TestService} from "../test.service.ts";
import {HttpHarness} from "../../src/harness";

export class Ng1TestService extends TestService {

    constructor($http: angular.IHttpService) {
        super(HttpHarness.fromNg1($http));
    }
}

angular.module("app").service("testService", ["$http", Ng1TestService]);