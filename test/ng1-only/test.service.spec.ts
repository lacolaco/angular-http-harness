import {TestModel} from "../test.model.ts";
import {TestService} from "./test.service.ts";

import assert = require("power-assert");

describe("Angular 1 TestService", () => {

    beforeEach(() => {
        angular.mock.module("ngMock", "app");
    });

    it("can instantiate", done => {
        inject((testService: TestService) => {
            assert(!!testService);
            done();
        });
    });

    it("get(id) should return mocked TestModel", done => {
        inject(($httpBackend: angular.IHttpBackendService, testService: TestService) => {
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