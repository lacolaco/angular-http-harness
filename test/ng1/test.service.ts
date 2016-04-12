import {Observable} from "rxjs/Observable";
import {HttpHarness} from "../../index";
import {fromNg1} from "../../ng1";
import {TestService} from "../test.service";
import {TestModel} from "../test.model";

export class Ng1TestService extends TestService {

    constructor($http: angular.IHttpService) {
        super(new HttpHarness(fromNg1($http)));
    }
    
    get(id: string): Observable<TestModel> {
        return super.get(id).map(resp => resp.data);
    }

    post(data: TestModel): Observable<TestModel> {
        return super.post(data).map(resp => resp.data);
    }
}

angular.module("app").service("testService", ["$http", Ng1TestService]);