"use strict";

// es6 shim
import "core-js/shim";

// ng2 deps
import "angular";
import "angular-mocks";

// ng2 deps
import "reflect-metadata";
import "rxjs/Rx";
import "zone.js/dist/zone";
import "zone.js/dist/long-stack-trace-zone";

// test
angular.module("app", []);
import "./ng1/test.service"
import "./ng1/test.service.spec";

import "./ng2/test.service.spec";

import "./ng1-only/test.service.spec";