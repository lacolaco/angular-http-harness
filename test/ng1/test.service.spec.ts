import {TestModel} from "../test.model";
import {Ng1TestService} from "./test.service";

import assert = require("power-assert");

describe("Angular 1 TestService", () => {

    beforeEach(() => {
        angular.mock.module("ngMock", "app");
    });

    it("can instantiate", done => {
        inject((testService: Ng1TestService) => {
            assert(!!testService);
            done();
        });
    });

    it("get(id) should return mocked TestModel", done => {
        inject(($httpBackend: angular.IHttpBackendService, testService: Ng1TestService) => {
            $httpBackend.expectGET("").respond(200, <TestModel>{text: "mocked!"});
            testService.get("test").subscribe(
                resp => {
                    assert(resp.text === "mocked!");
                    done();
                }, error => {
                    console.error(error);
                    done();
                });
            $httpBackend.flush();
        });
    });
});