import {Injectable} from "angular2/core";
import {Http} from "angular2/http";
import {HttpHarness} from "../../index";
import {fromNg2} from "../../ng2";
import {TestService} from "../test.service";
import {Observable} from "rxjs/Observable";
import {TestModel} from "../test.model";

@Injectable()
export class Ng2TestService extends TestService {

    constructor(_http: Http) {
        super(new HttpHarness(fromNg2(_http)));
    }

    get(id: string): Observable<TestModel> {
        return super.get(id).map(resp => resp.json());
    }

    post(data: TestModel): Observable<TestModel> {
        return super.post(data).map(resp => resp.json());
    }
}