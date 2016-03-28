import {resetBaseTestProviders, getTestInjector} from "angular2-testing-micro/core";
import {inject} from "angular2-testing-micro/framework/mocha";
import {BaseRequestOptions, Http, ResponseOptions, Response} from "angular2/http";
import {MockBackend, MockConnection} from "angular2/http/testing";
import {provide} from "angular2/core";
import {Ng2TestService} from "./test.service";
import {TestModel} from "../test.model";
import {TestService} from "../test.service";

import assert = require("power-assert");

describe("Angular 2 TestService", () => {

    beforeEach(() => {
        resetBaseTestProviders();
        getTestInjector().addProviders([
            BaseRequestOptions,
            MockBackend,
            provide(Http, {
                useFactory: (backend: MockBackend, options: BaseRequestOptions) => {
                    return new Http(backend, options);
                }, deps: [MockBackend, BaseRequestOptions]
            }),
            provide(TestService, {useClass: Ng2TestService})
        ]);
    });

    it("can instantiate", inject([TestService], (service: TestService) => {
        assert(!!service);
    }));

    it("get(id) should return mocked TestModel", done => {
        inject([MockBackend, TestService], (backend: MockBackend, service: TestService) => {
            backend.connections.subscribe((c: MockConnection) => {
                let resp = <TestModel>{text: "mocked!"};
                c.mockRespond(
                    new Response(new ResponseOptions({
                        status: 200,
                        body: resp
                    }))
                );
            });
            service.get("test").subscribe(
                resp => {
                    assert(!!resp);
                    assert(resp.text === "mocked!");
                    done();
                },
                error => {
                    assert(!error);
                    done();
                });
        })(); // execute
    });

    it("post(data) should return mocked TestModel", done => {
        inject([MockBackend, TestService], (backend: MockBackend, service: TestService) => {
            backend.connections.subscribe((c: MockConnection) => {
                c.mockRespond(
                    new Response(new ResponseOptions({
                        status: 200,
                        body: c.request.text(),
                    }))
                );
            });
            service.post({text: "mocked!"}).subscribe(
                resp => {
                    assert(!!resp);
                    assert(resp.text === "mocked!");
                    done();
                },
                error => {
                    assert(!error);
                    done();
                });
        })(); // execute
    });
});