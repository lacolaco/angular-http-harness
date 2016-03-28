import {Observable} from "rxjs/Observable";
import {ObservableHttp} from "../harness";

/**
 * angular2/http mock
 */

export declare class Http implements ObservableHttp {
    
    get(url: string, options?: RequestOptionsArgs): Observable<Response>;

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response>;

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response>;

    delete(url: string, options?: RequestOptionsArgs): Observable<Response>;
}

export declare class RequestOptionsArgs {
}

export declare class Response {
    constructor(options: ResponseOptions);
    json(): any;
}

export declare class ResponseOptions {
    constructor(optionArgs: any);
}

export declare class Headers {
    constructor(ng1Headers?: angular.IHttpHeadersGetter);
}