(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/_directives/alert.component.html":
/*!**************************************************!*\
  !*** ./src/app/_directives/alert.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"message\"\n     [ngClass]=\"{ 'alert': message, 'alert-success': message.type === 'success', 'alert-danger': message.type === 'error' }\">\n  {{message.text}}\n</div>\n"

/***/ }),

/***/ "./src/app/_directives/alert.component.ts":
/*!************************************************!*\
  !*** ./src/app/_directives/alert.component.ts ***!
  \************************************************/
/*! exports provided: AlertComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlertComponent", function() { return AlertComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_services */ "./src/app/_services/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AlertComponent = /** @class */ (function () {
    function AlertComponent(alertService) {
        this.alertService = alertService;
    }
    AlertComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.alertService.getMessage().subscribe(function (message) {
            _this.message = message;
        });
    };
    AlertComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    AlertComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'alert',
            template: __webpack_require__(/*! ./alert.component.html */ "./src/app/_directives/alert.component.html")
        }),
        __metadata("design:paramtypes", [_services__WEBPACK_IMPORTED_MODULE_1__["AlertService"]])
    ], AlertComponent);
    return AlertComponent;
}());



/***/ }),

/***/ "./src/app/_directives/index.ts":
/*!**************************************!*\
  !*** ./src/app/_directives/index.ts ***!
  \**************************************/
/*! exports provided: AlertComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _alert_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./alert.component */ "./src/app/_directives/alert.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AlertComponent", function() { return _alert_component__WEBPACK_IMPORTED_MODULE_0__["AlertComponent"]; });




/***/ }),

/***/ "./src/app/_guards/auth.guard.ts":
/*!***************************************!*\
  !*** ./src/app/_guards/auth.guard.ts ***!
  \***************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthGuard = /** @class */ (function () {
    function AuthGuard(router) {
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    };
    AuthGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "./src/app/_guards/index.ts":
/*!**********************************!*\
  !*** ./src/app/_guards/index.ts ***!
  \**********************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.guard */ "./src/app/_guards/auth.guard.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return _auth_guard__WEBPACK_IMPORTED_MODULE_0__["AuthGuard"]; });




/***/ }),

/***/ "./src/app/_helpers/error.interceptor.ts":
/*!***********************************************!*\
  !*** ./src/app/_helpers/error.interceptor.ts ***!
  \***********************************************/
/*! exports provided: ErrorInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorInterceptor", function() { return ErrorInterceptor; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_services */ "./src/app/_services/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ErrorInterceptor = /** @class */ (function () {
    function ErrorInterceptor(authenticationService) {
        this.authenticationService = authenticationService;
    }
    ErrorInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        return next.handle(request).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(function (err) {
            if (err.status !== 200) {
                // auto logout if 401 response returned from api
                // location.reload(true);
                _this.showNotification('top', 'center', err.error.resMessage);
            }
            var error = err.error.resMessage || err.statusText;
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])(error);
        }));
    };
    ErrorInterceptor.prototype.showNotification = function (from, align, msg) {
        $.notify({
            icon: 'ti-info-alt',
            message: msg
        }, {
            type: 'danger',
            timer: 4000,
            placement: {
                from: from,
                align: align
            }
        });
    };
    ErrorInterceptor = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_services__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"]])
    ], ErrorInterceptor);
    return ErrorInterceptor;
}());



/***/ }),

/***/ "./src/app/_helpers/index.ts":
/*!***********************************!*\
  !*** ./src/app/_helpers/index.ts ***!
  \***********************************/
/*! exports provided: ErrorInterceptor, JwtInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _error_interceptor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./error.interceptor */ "./src/app/_helpers/error.interceptor.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ErrorInterceptor", function() { return _error_interceptor__WEBPACK_IMPORTED_MODULE_0__["ErrorInterceptor"]; });

/* harmony import */ var _jwt_interceptor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./jwt.interceptor */ "./src/app/_helpers/jwt.interceptor.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JwtInterceptor", function() { return _jwt_interceptor__WEBPACK_IMPORTED_MODULE_1__["JwtInterceptor"]; });





/***/ }),

/***/ "./src/app/_helpers/jwt.interceptor.ts":
/*!*********************************************!*\
  !*** ./src/app/_helpers/jwt.interceptor.ts ***!
  \*********************************************/
/*! exports provided: JwtInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JwtInterceptor", function() { return JwtInterceptor; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var JwtInterceptor = /** @class */ (function () {
    function JwtInterceptor() {
    }
    JwtInterceptor.prototype.intercept = function (request, next) {
        // add authorization header with jwt token if available
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.accessToken) {
            request = request.clone({
                setHeaders: {
                    'dc-access-token': currentUser.accessToken,
                    'dc-user-id': currentUser.user._id,
                    'dc-user-name': currentUser.user.username,
                }
            });
        }
        return next.handle(request);
    };
    JwtInterceptor = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], JwtInterceptor);
    return JwtInterceptor;
}());



/***/ }),

/***/ "./src/app/_models/index.ts":
/*!**********************************!*\
  !*** ./src/app/_models/index.ts ***!
  \**********************************/
/*! exports provided: User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user */ "./src/app/_models/user.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "User", function() { return _user__WEBPACK_IMPORTED_MODULE_0__["User"]; });




/***/ }),

/***/ "./src/app/_models/user.ts":
/*!*********************************!*\
  !*** ./src/app/_models/user.ts ***!
  \*********************************/
/*! exports provided: User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());



/***/ }),

/***/ "./src/app/_services/alert.service.ts":
/*!********************************************!*\
  !*** ./src/app/_services/alert.service.ts ***!
  \********************************************/
/*! exports provided: AlertService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlertService", function() { return AlertService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AlertService = /** @class */ (function () {
    function AlertService(router) {
        var _this = this;
        this.router = router;
        this.subject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.keepAfterNavigationChange = false;
        // clear alert message on route change
        router.events.subscribe(function (event) {
            if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationStart"]) {
                if (_this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    _this.keepAfterNavigationChange = false;
                }
                else {
                    // clear alert
                    _this.subject.next();
                }
            }
        });
    }
    AlertService.prototype.success = function (message, keepAfterNavigationChange) {
        if (keepAfterNavigationChange === void 0) { keepAfterNavigationChange = false; }
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'success', text: message });
    };
    AlertService.prototype.error = function (message, keepAfterNavigationChange) {
        if (keepAfterNavigationChange === void 0) { keepAfterNavigationChange = false; }
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'error', text: message });
    };
    AlertService.prototype.getMessage = function () {
        return this.subject.asObservable();
    };
    AlertService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], AlertService);
    return AlertService;
}());



/***/ }),

/***/ "./src/app/_services/authentication.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/_services/authentication.service.ts ***!
  \*****************************************************/
/*! exports provided: AuthenticationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthenticationService", function() { return AuthenticationService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var ts_md5__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ts-md5 */ "./node_modules/ts-md5/dist/md5.js");
/* harmony import */ var ts_md5__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ts_md5__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http) {
        this.http = http;
    }
    AuthenticationService.prototype.login = function (username, password) {
        return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apiUrl + "/api/authen", {
            username: username,
            pwd: ts_md5__WEBPACK_IMPORTED_MODULE_3__["Md5"].hashStr(password),
            channel: 'web'
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) {
            // login successful if there's a jwt token in the response
            if (res.data && res.data.accessToken) {
                // store user details and token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(res.data));
            }
            return res.data;
        }));
    };
    AuthenticationService.prototype.logout = function () {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    };
    AuthenticationService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], AuthenticationService);
    return AuthenticationService;
}());



/***/ }),

/***/ "./src/app/_services/index.ts":
/*!************************************!*\
  !*** ./src/app/_services/index.ts ***!
  \************************************/
/*! exports provided: AlertService, AuthenticationService, UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _alert_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./alert.service */ "./src/app/_services/alert.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AlertService", function() { return _alert_service__WEBPACK_IMPORTED_MODULE_0__["AlertService"]; });

/* harmony import */ var _authentication_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./authentication.service */ "./src/app/_services/authentication.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthenticationService", function() { return _authentication_service__WEBPACK_IMPORTED_MODULE_1__["AuthenticationService"]; });

/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user.service */ "./src/app/_services/user.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return _user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"]; });






/***/ }),

/***/ "./src/app/_services/user.service.ts":
/*!*******************************************!*\
  !*** ./src/app/_services/user.service.ts ***!
  \*******************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var ts_md5__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ts-md5 */ "./node_modules/ts-md5/dist/md5.js");
/* harmony import */ var ts_md5__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ts_md5__WEBPACK_IMPORTED_MODULE_4__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
    }
    UserService.prototype.getAll = function () {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].apiUrl + "/api/user").pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) {
            return res.data;
        }));
    };
    UserService.prototype.getById = function (id) {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].apiUrl + "/api/user/" + id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) {
            return res.data;
        }));
    };
    UserService.prototype.register = function (user) {
        user.status = 'ACTIVE';
        user.role = 'USER';
        user.password = ts_md5__WEBPACK_IMPORTED_MODULE_4__["Md5"].hashStr(user.password).toString();
        return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].apiUrl + "/api/user", user);
    };
    UserService.prototype.update = function (id, user) {
        return this.http.put(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].apiUrl + "/api/user/" + id, user);
    };
    UserService.prototype.delete = function (id) {
        return this.http.delete(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].apiUrl + "/api/user/" + id);
    };
    UserService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], UserService);
    return UserService;
}());



/***/ }),

/***/ "./src/app/add-user/add-user.component.html":
/*!**************************************************!*\
  !*** ./src/app/add-user/add-user.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"sidebar\" data-background-color=\"white\" data-active-color=\"danger\">\n  <app-sidebar></app-sidebar>\n</div>\n<div class=\"main-panel\">\n  <app-navbar></app-navbar>\n  <div class=\"content\">\n\n    <div class=\"container-fluid\">\n      <div class=\"row\">\n        <div class=\"col-lg-8 col-md-7\">\n          <div class=\"card\">\n            <div class=\"header\">\n              <h4 class=\"title\">Add Profile</h4>\n            </div>\n            <div class=\"content\">\n              <form [formGroup]=\"userForm\" (ngSubmit)=\"onSubmit()\">\n                <div class=\"row\">\n                  <div class=\"col-md-6\">\n                    <div class=\"form-group\">\n                      <label>Username</label>\n                      <input type=\"text\" formControlName=\"username\" class=\"form-control border-input\"\n                             placeholder=\"Username\" [ngClass]=\"{ 'is-invalid': submitted && f.username.errors }\">\n                      <div *ngIf=\"submitted && f.username.errors\" class=\"invalid-feedback text-danger\">\n                        <div *ngIf=\"f.username.errors.required\">Username is required</div>\n                      </div>\n                    </div>\n                  </div>\n                  <div class=\"col-md-6\">\n                    <div class=\"form-group\">\n                      <label>Password</label>\n                      <input type=\"password\" formControlName=\"password\" maxlength=\"20\" class=\"form-control border-input\"\n                             placeholder=\"Password\" [ngClass]=\"{ 'is-invalid': submitted && f.password.errors }\">\n                      <div *ngIf=\"submitted && f.password.errors\" class=\"invalid-feedback text-danger\">\n                        <div *ngIf=\"f.password.errors.required\">Password is required</div>\n                        <div *ngIf=\"f.password.errors.minlength\">Password must be at least 8 characters</div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n\n\n                <div class=\"row\">\n                  <div class=\"col-md-6\">\n                    <div class=\"form-group\">\n                      <label>Email address</label>\n                      <input type=\"email\" formControlName=\"email\" class=\"form-control border-input\" placeholder=\"Email\">\n                    </div>\n                  </div>\n                  <div class=\"col-md-6\">\n                    <div class=\"form-group\">\n                      <label>Phone</label>\n                      <input type=\"text\" formControlName=\"phone\" class=\"form-control border-input\" placeholder=\"Phone\"\n                             maxlength=\"10\">\n                    </div>\n                  </div>\n                </div>\n\n\n                <div class=\"row\">\n                  <div class=\"col-md-6\">\n                    <div class=\"form-group\">\n                      <label>First Name</label>\n                      <input type=\"text\" formControlName=\"firstName\" class=\"form-control border-input\"\n                             placeholder=\"First Name\">\n                    </div>\n                  </div>\n                  <div class=\"col-md-6\">\n                    <div class=\"form-group\">\n                      <label>Last Name</label>\n                      <input type=\"text\" formControlName=\"lastName\" class=\"form-control border-input\"\n                             placeholder=\"Last Name\">\n                    </div>\n                  </div>\n                </div>\n\n                <div class=\"row\">\n                  <div class=\"col-md-12\">\n                    <div class=\"form-group\">\n                      <label>Address</label>\n                      <input type=\"text\" class=\"form-control border-input\" placeholder=\"Home Address\">\n                    </div>\n                  </div>\n                </div>\n\n                <div class=\"row\">\n                  <div class=\"col-md-4\">\n                    <div class=\"form-group\">\n                      <label>City</label>\n                      <input type=\"text\" class=\"form-control border-input\" placeholder=\"City\">\n                    </div>\n                  </div>\n                  <div class=\"col-md-4\">\n                    <div class=\"form-group\">\n                      <label>Country</label>\n                      <input type=\"text\" class=\"form-control border-input\" placeholder=\"Country\">\n                    </div>\n                  </div>\n                  <div class=\"col-md-4\">\n                    <div class=\"form-group\">\n                      <label>Postal Code</label>\n                      <input type=\"number\" class=\"form-control border-input\" placeholder=\"ZIP Code\">\n                    </div>\n                  </div>\n                </div>\n\n                <div class=\"row\">\n                  <div class=\"col-md-12\">\n                    <div class=\"form-group\">\n                      <label>About Me</label>\n                      <textarea rows=\"5\" class=\"form-control border-input\"\n                                placeholder=\"Here can be your description\"></textarea>\n                    </div>\n                  </div>\n                </div>\n                <div class=\"text-center\">\n                  <button type=\"submit\" class=\"btn btn-info btn-fill btn-wd\">Add User</button>\n                </div>\n                <div class=\"clearfix\"></div>\n              </form>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n  </div>\n  <footer-cmp></footer-cmp>\n</div>\n"

/***/ }),

/***/ "./src/app/add-user/add-user.component.ts":
/*!************************************************!*\
  !*** ./src/app/add-user/add-user.component.ts ***!
  \************************************************/
/*! exports provided: AddUserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddUserComponent", function() { return AddUserComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_services */ "./src/app/_services/index.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AddUserComponent = /** @class */ (function () {
    function AddUserComponent(route, userService, router, formBuilder) {
        this.route = route;
        this.userService = userService;
        this.router = router;
        this.formBuilder = formBuilder;
        this.submitted = false;
        this.userForm = this.formBuilder.group({
            firstName: [''],
            lastName: [''],
            username: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            password: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(8)]],
            email: [''],
            phone: ['']
        });
    }
    AddUserComponent.prototype.ngOnInit = function () {
    };
    Object.defineProperty(AddUserComponent.prototype, "f", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: true,
        configurable: true
    });
    AddUserComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        // stop here if form is invalid
        if (this.userForm.invalid) {
            return;
        }
        this.userService.register(this.userForm.value)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["first"])())
            .subscribe(function (data) {
            _this.router.navigate(['/table']);
        }, function (error) {
        });
    };
    AddUserComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./add-user.component.html */ "./src/app/add-user/add-user.component.html")
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _services__WEBPACK_IMPORTED_MODULE_3__["UserService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"]])
    ], AddUserComponent);
    return AddUserComponent;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- main app container -->\n<ng-progress #progressBar></ng-progress>\n<div class=\"wrapper\">\n  <router-outlet></router-outlet>\n</div>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = /** @class */ (function () {
    function AppComponent(router) {
        this.router = router;
    }
    AppComponent.prototype.isVisible = function () {
        return this.router.url === '/';
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html")
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_helpers */ "./src/app/_helpers/index.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _app_routing__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.routing */ "./src/app/app.routing.ts");
/* harmony import */ var _directives__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./_directives */ "./src/app/_directives/index.ts");
/* harmony import */ var _guards__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./_guards */ "./src/app/_guards/index.ts");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./_services */ "./src/app/_services/index.ts");
/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./login */ "./src/app/login/index.ts");
/* harmony import */ var _register__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./register */ "./src/app/register/index.ts");
/* harmony import */ var _sidebar_sidebar_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./sidebar/sidebar.module */ "./src/app/sidebar/sidebar.module.ts");
/* harmony import */ var _shared_navbar_navbar_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./shared/navbar/navbar.module */ "./src/app/shared/navbar/navbar.module.ts");
/* harmony import */ var _shared_footer_footer_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./shared/footer/footer.module */ "./src/app/shared/footer/footer.module.ts");
/* harmony import */ var _shared_fixedplugin_fixedplugin_module__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./shared/fixedplugin/fixedplugin.module */ "./src/app/shared/fixedplugin/fixedplugin.module.ts");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "./src/app/dashboard/dashboard.component.ts");
/* harmony import */ var _user_user_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./user/user.component */ "./src/app/user/user.component.ts");
/* harmony import */ var _add_user_add_user_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./add-user/add-user.component */ "./src/app/add-user/add-user.component.ts");
/* harmony import */ var _table_table_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./table/table.component */ "./src/app/table/table.component.ts");
/* harmony import */ var _typography_typography_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./typography/typography.component */ "./src/app/typography/typography.component.ts");
/* harmony import */ var _icons_icons_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./icons/icons.component */ "./src/app/icons/icons.component.ts");
/* harmony import */ var _maps_maps_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./maps/maps.component */ "./src/app/maps/maps.component.ts");
/* harmony import */ var _notifications_notifications_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./notifications/notifications.component */ "./src/app/notifications/notifications.component.ts");
/* harmony import */ var _ngui_map__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @ngui/map */ "./node_modules/@ngui/map/esm5/ngui-map.js");
/* harmony import */ var _ngx_progressbar_http__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @ngx-progressbar/http */ "./node_modules/@ngx-progressbar/http/fesm5/ngx-progressbar-http.js");
/* harmony import */ var _ngx_progressbar_core__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @ngx-progressbar/core */ "./node_modules/@ngx-progressbar/core/fesm5/ngx-progressbar-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                _sidebar_sidebar_module__WEBPACK_IMPORTED_MODULE_12__["SidebarModule"],
                _shared_navbar_navbar_module__WEBPACK_IMPORTED_MODULE_13__["NavbarModule"],
                _shared_footer_footer_module__WEBPACK_IMPORTED_MODULE_14__["FooterModule"],
                _shared_fixedplugin_fixedplugin_module__WEBPACK_IMPORTED_MODULE_15__["FixedPluginModule"],
                _app_routing__WEBPACK_IMPORTED_MODULE_6__["routing"],
                _ngx_progressbar_core__WEBPACK_IMPORTED_MODULE_26__["NgProgressModule"].forRoot({
                    spinner: false,
                    thick: true
                }),
                _ngx_progressbar_http__WEBPACK_IMPORTED_MODULE_25__["NgProgressHttpModule"],
                _ngui_map__WEBPACK_IMPORTED_MODULE_24__["NguiMapModule"].forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyAcieSFNf-cUF-nzgoQIBwxVWep-VrGE80' })
            ],
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
                _directives__WEBPACK_IMPORTED_MODULE_7__["AlertComponent"],
                _login__WEBPACK_IMPORTED_MODULE_10__["LoginComponent"],
                _register__WEBPACK_IMPORTED_MODULE_11__["RegisterComponent"],
                _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_16__["DashboardComponent"],
                _add_user_add_user_component__WEBPACK_IMPORTED_MODULE_18__["AddUserComponent"],
                _user_user_component__WEBPACK_IMPORTED_MODULE_17__["UserComponent"],
                _table_table_component__WEBPACK_IMPORTED_MODULE_19__["TableComponent"],
                _typography_typography_component__WEBPACK_IMPORTED_MODULE_20__["TypographyComponent"],
                _icons_icons_component__WEBPACK_IMPORTED_MODULE_21__["IconsComponent"],
                _maps_maps_component__WEBPACK_IMPORTED_MODULE_22__["MapsComponent"],
                _notifications_notifications_component__WEBPACK_IMPORTED_MODULE_23__["NotificationsComponent"],
            ],
            providers: [
                _guards__WEBPACK_IMPORTED_MODULE_8__["AuthGuard"],
                _services__WEBPACK_IMPORTED_MODULE_9__["AlertService"],
                _services__WEBPACK_IMPORTED_MODULE_9__["AuthenticationService"],
                _services__WEBPACK_IMPORTED_MODULE_9__["UserService"],
                { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HTTP_INTERCEPTORS"], useClass: _helpers__WEBPACK_IMPORTED_MODULE_4__["JwtInterceptor"], multi: true },
                { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HTTP_INTERCEPTORS"], useClass: _helpers__WEBPACK_IMPORTED_MODULE_4__["ErrorInterceptor"], multi: true },
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.routing.ts":
/*!********************************!*\
  !*** ./src/app/app.routing.ts ***!
  \********************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login */ "./src/app/login/index.ts");
/* harmony import */ var _register__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./register */ "./src/app/register/index.ts");
/* harmony import */ var _guards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_guards */ "./src/app/_guards/index.ts");
/* harmony import */ var _user_user_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./user/user.component */ "./src/app/user/user.component.ts");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "./src/app/dashboard/dashboard.component.ts");
/* harmony import */ var _table_table_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./table/table.component */ "./src/app/table/table.component.ts");
/* harmony import */ var _typography_typography_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./typography/typography.component */ "./src/app/typography/typography.component.ts");
/* harmony import */ var _icons_icons_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./icons/icons.component */ "./src/app/icons/icons.component.ts");
/* harmony import */ var _maps_maps_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./maps/maps.component */ "./src/app/maps/maps.component.ts");
/* harmony import */ var _notifications_notifications_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./notifications/notifications.component */ "./src/app/notifications/notifications.component.ts");
/* harmony import */ var _add_user_add_user_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./add-user/add-user.component */ "./src/app/add-user/add-user.component.ts");












var appRoutes = [
    { path: '', component: _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_5__["DashboardComponent"], canActivate: [_guards__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'login', component: _login__WEBPACK_IMPORTED_MODULE_1__["LoginComponent"] },
    { path: 'register', component: _register__WEBPACK_IMPORTED_MODULE_2__["RegisterComponent"] },
    { path: 'dashboard', component: _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_5__["DashboardComponent"], canActivate: [_guards__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'add-user', component: _add_user_add_user_component__WEBPACK_IMPORTED_MODULE_11__["AddUserComponent"], canActivate: [_guards__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'user', component: _user_user_component__WEBPACK_IMPORTED_MODULE_4__["UserComponent"], canActivate: [_guards__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'user/:userId', component: _user_user_component__WEBPACK_IMPORTED_MODULE_4__["UserComponent"], canActivate: [_guards__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'table', component: _table_table_component__WEBPACK_IMPORTED_MODULE_6__["TableComponent"], canActivate: [_guards__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'typography', component: _typography_typography_component__WEBPACK_IMPORTED_MODULE_7__["TypographyComponent"], canActivate: [_guards__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'icons', component: _icons_icons_component__WEBPACK_IMPORTED_MODULE_8__["IconsComponent"], canActivate: [_guards__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'maps', component: _maps_maps_component__WEBPACK_IMPORTED_MODULE_9__["MapsComponent"], canActivate: [_guards__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'notifications', component: _notifications_notifications_component__WEBPACK_IMPORTED_MODULE_10__["NotificationsComponent"], canActivate: [_guards__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(appRoutes);


/***/ }),

/***/ "./src/app/dashboard/dashboard.component.html":
/*!****************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"sidebar\" data-background-color=\"white\" data-active-color=\"danger\">\n  <app-sidebar></app-sidebar>\n</div>\n<div class=\"main-panel\">\n  <app-navbar></app-navbar>\n  <div class=\"content\">\n    <!--content-->\n    <div class=\"container-fluid\">\n      <div class=\"row\">\n        <div class=\"col-lg-3 col-sm-6\">\n          <div class=\"card\">\n            <div class=\"content\">\n              <div class=\"row\">\n                <div class=\"col-xs-5\">\n                  <div class=\"icon-big icon-warning text-center\">\n                    <i class=\"ti-server\"></i>\n                  </div>\n                </div>\n                <div class=\"col-xs-7\">\n                  <div class=\"numbers\">\n                    <p>Capacity</p>\n                    105GB\n                  </div>\n                </div>\n              </div>\n              <div class=\"footer\">\n                <hr/>\n                <div class=\"stats\">\n                  <i class=\"ti-reload\"></i> Updated now\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-lg-3 col-sm-6\">\n          <div class=\"card\">\n            <div class=\"content\">\n              <div class=\"row\">\n                <div class=\"col-xs-5\">\n                  <div class=\"icon-big icon-success text-center\">\n                    <i class=\"ti-wallet\"></i>\n                  </div>\n                </div>\n                <div class=\"col-xs-7\">\n                  <div class=\"numbers\">\n                    <p>Revenue</p>\n                    $1,345\n                  </div>\n                </div>\n              </div>\n              <div class=\"footer\">\n                <hr/>\n                <div class=\"stats\">\n                  <i class=\"ti-calendar\"></i> Last day\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-lg-3 col-sm-6\">\n          <div class=\"card\">\n            <div class=\"content\">\n              <div class=\"row\">\n                <div class=\"col-xs-5\">\n                  <div class=\"icon-big icon-danger text-center\">\n                    <i class=\"ti-pulse\"></i>\n                  </div>\n                </div>\n                <div class=\"col-xs-7\">\n                  <div class=\"numbers\">\n                    <p>Errors</p>\n                    23\n                  </div>\n                </div>\n              </div>\n              <div class=\"footer\">\n                <hr/>\n                <div class=\"stats\">\n                  <i class=\"ti-timer\"></i> In the last hour\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-lg-3 col-sm-6\">\n          <div class=\"card\">\n            <div class=\"content\">\n              <div class=\"row\">\n                <div class=\"col-xs-5\">\n                  <div class=\"icon-big icon-info text-center\">\n                    <i class=\"ti-twitter-alt\"></i>\n                  </div>\n                </div>\n                <div class=\"col-xs-7\">\n                  <div class=\"numbers\">\n                    <p>Followers</p>\n                    +45\n                  </div>\n                </div>\n              </div>\n              <div class=\"footer\">\n                <hr/>\n                <div class=\"stats\">\n                  <i class=\"ti-reload\"></i> Updated now\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n\n        <div class=\"col-md-12\">\n          <div class=\"card\">\n            <div class=\"header\">\n              <h4 class=\"title\">Users Behavior</h4>\n              <p class=\"category\">24 Hours performance</p>\n            </div>\n            <div class=\"content\">\n              <div id=\"chartHours\" class=\"ct-chart\"></div>\n              <div class=\"footer\">\n                <div class=\"chart-legend\">\n                  <i class=\"fa fa-circle text-info\"></i> Open\n                  <i class=\"fa fa-circle text-danger\"></i> Click\n                  <i class=\"fa fa-circle text-warning\"></i> Click Second Time\n                </div>\n                <hr>\n                <div class=\"stats\">\n                  <i class=\"ti-reload\"></i> Updated 3 minutes ago\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-md-6\">\n          <div class=\"card\">\n            <div class=\"header\">\n              <h4 class=\"title\">Email Statistics</h4>\n              <p class=\"category\">Last Campaign Performance</p>\n            </div>\n            <div class=\"content\">\n              <div id=\"chartPreferences\" class=\"ct-chart ct-perfect-fourth\"></div>\n\n              <div class=\"footer\">\n                <div class=\"chart-legend\">\n                  <i class=\"fa fa-circle text-info\"></i> Open\n                  <i class=\"fa fa-circle text-danger\"></i> Bounce\n                  <i class=\"fa fa-circle text-warning\"></i> Unsubscribe\n                </div>\n                <hr>\n                <div class=\"stats\">\n                  <i class=\"ti-timer\"></i> Campaign sent 2 days ago\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-6\">\n          <div class=\"card \">\n            <div class=\"header\">\n              <h4 class=\"title\">2015 Sales</h4>\n              <p class=\"category\">All products including Taxes</p>\n            </div>\n            <div class=\"content\">\n              <div id=\"chartActivity\" class=\"ct-chart\"></div>\n\n              <div class=\"footer\">\n                <div class=\"chart-legend\">\n                  <i class=\"fa fa-circle text-info\"></i> Tesla Model S\n                  <i class=\"fa fa-circle text-warning\"></i> BMW 5 Series\n                </div>\n                <hr>\n                <div class=\"stats\">\n                  <i class=\"ti-check\"></i> Data information certified\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n  </div>\n  <footer-cmp></footer-cmp>\n</div>\n"

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.ts":
/*!**************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.ts ***!
  \**************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var chartist__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! chartist */ "./node_modules/chartist/dist/chartist.js");
/* harmony import */ var chartist__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(chartist__WEBPACK_IMPORTED_MODULE_1__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var DashboardComponent = /** @class */ (function () {
    function DashboardComponent() {
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var dataSales = {
            labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
            series: [
                [287, 385, 490, 562, 594, 626, 698, 895, 952],
                [67, 152, 193, 240, 387, 435, 535, 642, 744],
                [23, 113, 67, 108, 190, 239, 307, 410, 410]
            ]
        };
        var optionsSales = {
            low: 0,
            high: 1000,
            showArea: true,
            height: '245px',
            axisX: {
                showGrid: false,
            },
            lineSmooth: chartist__WEBPACK_IMPORTED_MODULE_1__["Interpolation"].simple({
                divisor: 3
            }),
            showLine: true,
            showPoint: false,
        };
        var responsiveSales = [
            ['screen and (max-width: 640px)', {
                    axisX: {
                        labelInterpolationFnc: function (value) {
                            return value[0];
                        }
                    }
                }]
        ];
        new chartist__WEBPACK_IMPORTED_MODULE_1__["Line"]('#chartHours', dataSales, optionsSales, responsiveSales);
        var data = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [
                [542, 543, 520, 680, 653, 753, 326, 434, 568, 610, 756, 895],
                [230, 293, 380, 480, 503, 553, 600, 664, 698, 710, 736, 795]
            ]
        };
        var options = {
            seriesBarDistance: 10,
            axisX: {
                showGrid: false
            },
            height: '245px'
        };
        var responsiveOptions = [
            ['screen and (max-width: 640px)', {
                    seriesBarDistance: 5,
                    axisX: {
                        labelInterpolationFnc: function (value) {
                            return value[0];
                        }
                    }
                }]
        ];
        new chartist__WEBPACK_IMPORTED_MODULE_1__["Line"]('#chartActivity', data, options, responsiveOptions);
        var dataPreferences = {
            series: [
                [25, 30, 20, 25]
            ]
        };
        var optionsPreferences = {
            donut: true,
            donutWidth: 40,
            startAngle: 0,
            total: 100,
            showLabel: false,
            axisX: {
                showGrid: false
            }
        };
        new chartist__WEBPACK_IMPORTED_MODULE_1__["Pie"]('#chartPreferences', dataPreferences, optionsPreferences);
        new chartist__WEBPACK_IMPORTED_MODULE_1__["Pie"]('#chartPreferences', {
            labels: ['62%', '32%', '6%'],
            series: [62, 32, 6]
        });
    };
    DashboardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dashboard-cmp',
            template: __webpack_require__(/*! ./dashboard.component.html */ "./src/app/dashboard/dashboard.component.html")
        })
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/icons/icons.component.html":
/*!********************************************!*\
  !*** ./src/app/icons/icons.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"sidebar\" data-background-color=\"white\" data-active-color=\"danger\">\n  <app-sidebar></app-sidebar>\n</div>\n<div class=\"main-panel\">\n  <app-navbar></app-navbar>\n  <div class=\"content\">\n\n    <div class=\"container-fluid\">\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n          <div class=\"card\">\n            <div class=\"header\">\n              <h4 class=\"title\">320+ Themify Icons</h4>\n              <p class=\"category\">Handcrafted by our friends from <a target=\"_blank\"\n                                                                     href=\"https://themify.me/\">Themify</a>.\n              </p>\n            </div>\n            <div class=\"content all-icons\">\n\n              <div class=\"icon-section\">\n                <h3>Arrows &amp; Direction Icons </h3>\n\n                <div class=\"icon-container\">\n                  <span class=\"ti-arrow-up\"></span><span class=\"icon-name\"> ti-arrow-up</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-arrow-right\"></span><span class=\"icon-name\"> ti-arrow-right</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-arrow-left\"></span><span class=\"icon-name\"> ti-arrow-left</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-arrow-down\"></span><span class=\"icon-name\"> ti-arrow-down</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-arrows-vertical\"></span><span class=\"icon-name\"> ti-arrows-vertical</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-arrows-horizontal\"></span><span class=\"icon-name\"> ti-arrows-horizontal</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-angle-up\"></span><span class=\"icon-name\"> ti-angle-up</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-angle-right\"></span><span class=\"icon-name\"> ti-angle-right</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-angle-left\"></span><span class=\"icon-name\"> ti-angle-left</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-angle-down\"></span><span class=\"icon-name\"> ti-angle-down</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-angle-double-up\"></span><span class=\"icon-name\"> ti-angle-double-up</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-angle-double-right\"></span><span class=\"icon-name\"> ti-angle-double-right</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-angle-double-left\"></span><span class=\"icon-name\"> ti-angle-double-left</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-angle-double-down\"></span><span class=\"icon-name\"> ti-angle-double-down</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-move\"></span><span class=\"icon-name\"> ti-move</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-fullscreen\"></span><span class=\"icon-name\"> ti-fullscreen</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-arrow-top-right\"></span><span class=\"icon-name\"> ti-arrow-top-right</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-arrow-top-left\"></span><span class=\"icon-name\"> ti-arrow-top-left</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-arrow-circle-up\"></span><span class=\"icon-name\"> ti-arrow-circle-up</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-arrow-circle-right\"></span><span class=\"icon-name\"> ti-arrow-circle-right</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-arrow-circle-left\"></span><span class=\"icon-name\"> ti-arrow-circle-left</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-arrow-circle-down\"></span><span class=\"icon-name\"> ti-arrow-circle-down</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-arrows-corner\"></span><span class=\"icon-name\"> ti-arrows-corner</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-split-v\"></span><span class=\"icon-name\"> ti-split-v</span>\n                </div>\n\n                <div class=\"icon-container\">\n                  <span class=\"ti-split-v-alt\"></span><span class=\"icon-name\"> ti-split-v-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-split-h\"></span><span class=\"icon-name\"> ti-split-h</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-hand-point-up\"></span><span class=\"icon-name\"> ti-hand-point-up</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-hand-point-right\"></span><span class=\"icon-name\"> ti-hand-point-right</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-hand-point-left\"></span><span class=\"icon-name\"> ti-hand-point-left</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-hand-point-down\"></span><span class=\"icon-name\"> ti-hand-point-down</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-back-right\"></span><span class=\"icon-name\"> ti-back-right</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-back-left\"></span><span class=\"icon-name\"> ti-back-left</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-exchange-vertical\"></span><span class=\"icon-name\"> ti-exchange-vertical</span>\n                </div>\n\n              </div> <!-- Arrows Icons -->\n\n\n              <h3>Web App Icons</h3>\n\n              <div class=\"icon-section\">\n\n                <div class=\"icon-container\">\n                  <span class=\"ti-wand\"></span><span class=\"icon-name\"> ti-wand</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-save\"></span><span class=\"icon-name\"> ti-save</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-save-alt\"></span><span class=\"icon-name\"> ti-save-alt</span>\n                </div>\n\n                <div class=\"icon-container\">\n                  <span class=\"ti-direction\"></span><span class=\"icon-name\"> ti-direction</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-direction-alt\"></span><span class=\"icon-name\"> ti-direction-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-user\"></span><span class=\"icon-name\"> ti-user</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-link\"></span><span class=\"icon-name\"> ti-link</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-unlink\"></span><span class=\"icon-name\"> ti-unlink</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-trash\"></span><span class=\"icon-name\"> ti-trash</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-target\"></span><span class=\"icon-name\"> ti-target</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-tag\"></span><span class=\"icon-name\"> ti-tag</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-desktop\"></span><span class=\"icon-name\"> ti-desktop</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-tablet\"></span><span class=\"icon-name\"> ti-tablet</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-mobile\"></span><span class=\"icon-name\"> ti-mobile</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-email\"></span><span class=\"icon-name\"> ti-email</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-star\"></span><span class=\"icon-name\"> ti-star</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-spray\"></span><span class=\"icon-name\"> ti-spray</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-signal\"></span><span class=\"icon-name\"> ti-signal</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-shopping-cart\"></span><span class=\"icon-name\"> ti-shopping-cart</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-shopping-cart-full\"></span><span class=\"icon-name\"> ti-shopping-cart-full</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-settings\"></span><span class=\"icon-name\"> ti-settings</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-search\"></span><span class=\"icon-name\"> ti-search</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-zoom-in\"></span><span class=\"icon-name\"> ti-zoom-in</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-zoom-out\"></span><span class=\"icon-name\"> ti-zoom-out</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-cut\"></span><span class=\"icon-name\"> ti-cut</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-ruler\"></span><span class=\"icon-name\"> ti-ruler</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-ruler-alt-2\"></span><span class=\"icon-name\"> ti-ruler-alt-2</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-ruler-pencil\"></span><span class=\"icon-name\"> ti-ruler-pencil</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-ruler-alt\"></span><span class=\"icon-name\"> ti-ruler-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-bookmark\"></span><span class=\"icon-name\"> ti-bookmark</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-bookmark-alt\"></span><span class=\"icon-name\"> ti-bookmark-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-reload\"></span><span class=\"icon-name\"> ti-reload</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-plus\"></span><span class=\"icon-name\"> ti-plus</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-minus\"></span><span class=\"icon-name\"> ti-minus</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-close\"></span><span class=\"icon-name\"> ti-close</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-pin\"></span><span class=\"icon-name\"> ti-pin</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-pencil\"></span><span class=\"icon-name\"> ti-pencil</span>\n                </div>\n\n                <div class=\"icon-container\">\n                  <span class=\"ti-pencil-alt\"></span><span class=\"icon-name\"> ti-pencil-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-paint-roller\"></span><span class=\"icon-name\"> ti-paint-roller</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-paint-bucket\"></span><span class=\"icon-name\"> ti-paint-bucket</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-na\"></span><span class=\"icon-name\"> ti-na</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-medall\"></span><span class=\"icon-name\"> ti-medall</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-medall-alt\"></span><span class=\"icon-name\"> ti-medall-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-marker\"></span><span class=\"icon-name\"> ti-marker</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-marker-alt\"></span><span class=\"icon-name\"> ti-marker-alt</span>\n                </div>\n\n                <div class=\"icon-container\">\n                  <span class=\"ti-lock\"></span><span class=\"icon-name\"> ti-lock</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-unlock\"></span><span class=\"icon-name\"> ti-unlock</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-location-arrow\"></span><span class=\"icon-name\"> ti-location-arrow</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout\"></span><span class=\"icon-name\"> ti-layout</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layers\"></span><span class=\"icon-name\"> ti-layers</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layers-alt\"></span><span class=\"icon-name\"> ti-layers-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-key\"></span><span class=\"icon-name\"> ti-key</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-image\"></span><span class=\"icon-name\"> ti-image</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-heart\"></span><span class=\"icon-name\"> ti-heart</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-heart-broken\"></span><span class=\"icon-name\"> ti-heart-broken</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-hand-stop\"></span><span class=\"icon-name\"> ti-hand-stop</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-hand-open\"></span><span class=\"icon-name\"> ti-hand-open</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-hand-drag\"></span><span class=\"icon-name\"> ti-hand-drag</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-flag\"></span><span class=\"icon-name\"> ti-flag</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-flag-alt\"></span><span class=\"icon-name\"> ti-flag-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-flag-alt-2\"></span><span class=\"icon-name\"> ti-flag-alt-2</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-eye\"></span><span class=\"icon-name\"> ti-eye</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-import\"></span><span class=\"icon-name\"> ti-import</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-export\"></span><span class=\"icon-name\"> ti-export</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-cup\"></span><span class=\"icon-name\"> ti-cup</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-crown\"></span><span class=\"icon-name\"> ti-crown</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-comments\"></span><span class=\"icon-name\"> ti-comments</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-comment\"></span><span class=\"icon-name\"> ti-comment</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-comment-alt\"></span><span class=\"icon-name\"> ti-comment-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-thought\"></span><span class=\"icon-name\"> ti-thought</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-clip\"></span><span class=\"icon-name\"> ti-clip</span>\n                </div>\n\n                <div class=\"icon-container\">\n                  <span class=\"ti-check\"></span><span class=\"icon-name\"> ti-check</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-check-box\"></span><span class=\"icon-name\"> ti-check-box</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-camera\"></span><span class=\"icon-name\"> ti-camera</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-announcement\"></span><span class=\"icon-name\"> ti-announcement</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-brush\"></span><span class=\"icon-name\"> ti-brush</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-brush-alt\"></span><span class=\"icon-name\"> ti-brush-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-palette\"></span><span class=\"icon-name\"> ti-palette</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-briefcase\"></span><span class=\"icon-name\"> ti-briefcase</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-bolt\"></span><span class=\"icon-name\"> ti-bolt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-bolt-alt\"></span><span class=\"icon-name\"> ti-bolt-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-blackboard\"></span><span class=\"icon-name\"> ti-blackboard</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-bag\"></span><span class=\"icon-name\"> ti-bag</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-world\"></span><span class=\"icon-name\"> ti-world</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-wheelchair\"></span><span class=\"icon-name\"> ti-wheelchair</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-car\"></span><span class=\"icon-name\"> ti-car</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-truck\"></span><span class=\"icon-name\"> ti-truck</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-timer\"></span><span class=\"icon-name\"> ti-timer</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-ticket\"></span><span class=\"icon-name\"> ti-ticket</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-thumb-up\"></span><span class=\"icon-name\"> ti-thumb-up</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-thumb-down\"></span><span class=\"icon-name\"> ti-thumb-down</span>\n                </div>\n\n                <div class=\"icon-container\">\n                  <span class=\"ti-stats-up\"></span><span class=\"icon-name\"> ti-stats-up</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-stats-down\"></span><span class=\"icon-name\"> ti-stats-down</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-shine\"></span><span class=\"icon-name\"> ti-shine</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-shift-right\"></span><span class=\"icon-name\"> ti-shift-right</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-shift-left\"></span><span class=\"icon-name\"> ti-shift-left</span>\n                </div>\n\n                <div class=\"icon-container\">\n                  <span class=\"ti-shift-right-alt\"></span><span class=\"icon-name\"> ti-shift-right-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-shift-left-alt\"></span><span class=\"icon-name\"> ti-shift-left-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-shield\"></span><span class=\"icon-name\"> ti-shield</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-notepad\"></span><span class=\"icon-name\"> ti-notepad</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-server\"></span><span class=\"icon-name\"> ti-server</span>\n                </div>\n\n                <div class=\"icon-container\">\n                  <span class=\"ti-pulse\"></span><span class=\"icon-name\"> ti-pulse</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-printer\"></span><span class=\"icon-name\"> ti-printer</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-power-off\"></span><span class=\"icon-name\"> ti-power-off</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-plug\"></span><span class=\"icon-name\"> ti-plug</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-pie-chart\"></span><span class=\"icon-name\"> ti-pie-chart</span>\n                </div>\n\n                <div class=\"icon-container\">\n                  <span class=\"ti-panel\"></span><span class=\"icon-name\"> ti-panel</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-package\"></span><span class=\"icon-name\"> ti-package</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-music\"></span><span class=\"icon-name\"> ti-music</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-music-alt\"></span><span class=\"icon-name\"> ti-music-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-mouse\"></span><span class=\"icon-name\"> ti-mouse</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-mouse-alt\"></span><span class=\"icon-name\"> ti-mouse-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-money\"></span><span class=\"icon-name\"> ti-money</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-microphone\"></span><span class=\"icon-name\"> ti-microphone</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-menu\"></span><span class=\"icon-name\"> ti-menu</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-menu-alt\"></span><span class=\"icon-name\"> ti-menu-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-map\"></span><span class=\"icon-name\"> ti-map</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-map-alt\"></span><span class=\"icon-name\"> ti-map-alt</span>\n                </div>\n\n                <div class=\"icon-container\">\n                  <span class=\"ti-location-pin\"></span><span class=\"icon-name\"> ti-location-pin</span>\n                </div>\n\n                <div class=\"icon-container\">\n                  <span class=\"ti-light-bulb\"></span><span class=\"icon-name\"> ti-light-bulb</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-info\"></span><span class=\"icon-name\"> ti-info</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-infinite\"></span><span class=\"icon-name\"> ti-infinite</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-id-badge\"></span><span class=\"icon-name\"> ti-id-badge</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-hummer\"></span><span class=\"icon-name\"> ti-hummer</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-home\"></span><span class=\"icon-name\"> ti-home</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-help\"></span><span class=\"icon-name\"> ti-help</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-headphone\"></span><span class=\"icon-name\"> ti-headphone</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-harddrives\"></span><span class=\"icon-name\"> ti-harddrives</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-harddrive\"></span><span class=\"icon-name\"> ti-harddrive</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-gift\"></span><span class=\"icon-name\"> ti-gift</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-game\"></span><span class=\"icon-name\"> ti-game</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-filter\"></span><span class=\"icon-name\"> ti-filter</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-files\"></span><span class=\"icon-name\"> ti-files</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-file\"></span><span class=\"icon-name\"> ti-file</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-zip\"></span><span class=\"icon-name\"> ti-zip</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-folder\"></span><span class=\"icon-name\"> ti-folder</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-envelope\"></span><span class=\"icon-name\"> ti-envelope</span>\n                </div>\n\n\n                <div class=\"icon-container\">\n                  <span class=\"ti-dashboard\"></span><span class=\"icon-name\"> ti-dashboard</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-cloud\"></span><span class=\"icon-name\"> ti-cloud</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-cloud-up\"></span><span class=\"icon-name\"> ti-cloud-up</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-cloud-down\"></span><span class=\"icon-name\"> ti-cloud-down</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-clipboard\"></span><span class=\"icon-name\"> ti-clipboard</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-calendar\"></span><span class=\"icon-name\"> ti-calendar</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-book\"></span><span class=\"icon-name\"> ti-book</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-bell\"></span><span class=\"icon-name\"> ti-bell</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-basketball\"></span><span class=\"icon-name\"> ti-basketball</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-bar-chart\"></span><span class=\"icon-name\"> ti-bar-chart</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-bar-chart-alt\"></span><span class=\"icon-name\"> ti-bar-chart-alt</span>\n                </div>\n\n\n                <div class=\"icon-container\">\n                  <span class=\"ti-archive\"></span><span class=\"icon-name\"> ti-archive</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-anchor\"></span><span class=\"icon-name\"> ti-anchor</span>\n                </div>\n\n                <div class=\"icon-container\">\n                  <span class=\"ti-alert\"></span><span class=\"icon-name\"> ti-alert</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-alarm-clock\"></span><span class=\"icon-name\"> ti-alarm-clock</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-agenda\"></span><span class=\"icon-name\"> ti-agenda</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-write\"></span><span class=\"icon-name\"> ti-write</span>\n                </div>\n\n                <div class=\"icon-container\">\n                  <span class=\"ti-wallet\"></span><span class=\"icon-name\"> ti-wallet</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-video-clapper\"></span><span class=\"icon-name\"> ti-video-clapper</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-video-camera\"></span><span class=\"icon-name\"> ti-video-camera</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-vector\"></span><span class=\"icon-name\"> ti-vector</span>\n                </div>\n\n                <div class=\"icon-container\">\n                  <span class=\"ti-support\"></span><span class=\"icon-name\"> ti-support</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-stamp\"></span><span class=\"icon-name\"> ti-stamp</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-slice\"></span><span class=\"icon-name\"> ti-slice</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-shortcode\"></span><span class=\"icon-name\"> ti-shortcode</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-receipt\"></span><span class=\"icon-name\"> ti-receipt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-pin2\"></span><span class=\"icon-name\"> ti-pin2</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-pin-alt\"></span><span class=\"icon-name\"> ti-pin-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-pencil-alt2\"></span><span class=\"icon-name\"> ti-pencil-alt2</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-eraser\"></span><span class=\"icon-name\"> ti-eraser</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-more\"></span><span class=\"icon-name\"> ti-more</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-more-alt\"></span><span class=\"icon-name\"> ti-more-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-microphone-alt\"></span><span class=\"icon-name\"> ti-microphone-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-magnet\"></span><span class=\"icon-name\"> ti-magnet</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-line-double\"></span><span class=\"icon-name\"> ti-line-double</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-line-dotted\"></span><span class=\"icon-name\"> ti-line-dotted</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-line-dashed\"></span><span class=\"icon-name\"> ti-line-dashed</span>\n                </div>\n\n                <div class=\"icon-container\">\n                  <span class=\"ti-ink-pen\"></span><span class=\"icon-name\"> ti-ink-pen</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-info-alt\"></span><span class=\"icon-name\"> ti-info-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-help-alt\"></span><span class=\"icon-name\"> ti-help-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-headphone-alt\"></span><span class=\"icon-name\"> ti-headphone-alt</span>\n                </div>\n\n                <div class=\"icon-container\">\n                  <span class=\"ti-gallery\"></span><span class=\"icon-name\"> ti-gallery</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-face-smile\"></span><span class=\"icon-name\"> ti-face-smile</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-face-sad\"></span><span class=\"icon-name\"> ti-face-sad</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-credit-card\"></span><span class=\"icon-name\"> ti-credit-card</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-comments-smiley\"></span><span class=\"icon-name\"> ti-comments-smiley</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-time\"></span><span class=\"icon-name\"> ti-time</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-share\"></span><span class=\"icon-name\"> ti-share</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-share-alt\"></span><span class=\"icon-name\"> ti-share-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-rocket\"></span><span class=\"icon-name\"> ti-rocket</span>\n                </div>\n\n                <div class=\"icon-container\">\n                  <span class=\"ti-new-window\"></span><span class=\"icon-name\"> ti-new-window</span>\n                </div>\n\n                <div class=\"icon-container\">\n                  <span class=\"ti-rss\"></span><span class=\"icon-name\"> ti-rss</span>\n                </div>\n\n                <div class=\"icon-container\">\n                  <span class=\"ti-rss-alt\"></span><span class=\"icon-name\"> ti-rss-alt</span>\n                </div>\n\n              </div><!-- Web App Icons -->\n\n\n              <div class=\"icon-section\">\n                <h3>Control Icons</h3>\n                <div class=\"icon-container\">\n                  <span class=\"ti-control-stop\"></span><span class=\"icon-name\"> ti-control-stop</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-control-shuffle\"></span><span class=\"icon-name\"> ti-control-shuffle</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-control-play\"></span><span class=\"icon-name\"> ti-control-play</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-control-pause\"></span><span class=\"icon-name\"> ti-control-pause</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-control-forward\"></span><span class=\"icon-name\"> ti-control-forward</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-control-backward\"></span><span class=\"icon-name\"> ti-control-backward</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-volume\"></span><span class=\"icon-name\"> ti-volume</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-control-skip-forward\"></span><span class=\"icon-name\"> ti-control-skip-forward</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-control-skip-backward\"></span><span class=\"icon-name\"> ti-control-skip-backward</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-control-record\"></span><span class=\"icon-name\"> ti-control-record</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-control-eject\"></span><span class=\"icon-name\"> ti-control-eject</span>\n                </div>\n              </div> <!-- Control Icons -->\n\n\n              <div class=\"icon-section\">\n                <h3>Text Editor</h3>\n\n                <div class=\"icon-container\">\n                  <span class=\"ti-paragraph\"></span><span class=\"icon-name\"> ti-paragraph</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-uppercase\"></span><span class=\"icon-name\"> ti-uppercase</span>\n                </div>\n\n                <div class=\"icon-container\">\n                  <span class=\"ti-underline\"></span><span class=\"icon-name\"> ti-underline</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-text\"></span><span class=\"icon-name\"> ti-text</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-Italic\"></span><span class=\"icon-name\"> ti-Italic</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-smallcap\"></span><span class=\"icon-name\"> ti-smallcap</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-list\"></span><span class=\"icon-name\"> ti-list</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-list-ol\"></span><span class=\"icon-name\"> ti-list-ol</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-align-right\"></span><span class=\"icon-name\"> ti-align-right</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-align-left\"></span><span class=\"icon-name\"> ti-align-left</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-align-justify\"></span><span class=\"icon-name\"> ti-align-justify</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-align-center\"></span><span class=\"icon-name\"> ti-align-center</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-quote-right\"></span><span class=\"icon-name\"> ti-quote-right</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-quote-left\"></span><span class=\"icon-name\"> ti-quote-left</span>\n                </div>\n\n              </div> <!-- Text Editor -->\n\n\n              <div class=\"icon-section\">\n                <h3>Layout Icons</h3>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-width-full\"></span><span class=\"icon-name\"> ti-layout-width-full</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-width-default\"></span><span class=\"icon-name\"> ti-layout-width-default</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-width-default-alt\"></span><span\n                  class=\"icon-name\"> ti-layout-width-default-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-tab\"></span><span class=\"icon-name\"> ti-layout-tab</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-tab-window\"></span><span class=\"icon-name\"> ti-layout-tab-window</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-tab-v\"></span><span class=\"icon-name\"> ti-layout-tab-v</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-tab-min\"></span><span class=\"icon-name\"> ti-layout-tab-min</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-slider\"></span><span class=\"icon-name\"> ti-layout-slider</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-slider-alt\"></span><span class=\"icon-name\"> ti-layout-slider-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-sidebar-right\"></span><span class=\"icon-name\"> ti-layout-sidebar-right</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-sidebar-none\"></span><span class=\"icon-name\"> ti-layout-sidebar-none</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-sidebar-left\"></span><span class=\"icon-name\"> ti-layout-sidebar-left</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-placeholder\"></span><span class=\"icon-name\"> ti-layout-placeholder</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-menu\"></span><span class=\"icon-name\"> ti-layout-menu</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-menu-v\"></span><span class=\"icon-name\"> ti-layout-menu-v</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-menu-separated\"></span><span class=\"icon-name\"> ti-layout-menu-separated</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-menu-full\"></span><span class=\"icon-name\"> ti-layout-menu-full</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-media-right\"></span><span class=\"icon-name\"> ti-layout-media-right</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-media-right-alt\"></span><span\n                  class=\"icon-name\"> ti-layout-media-right-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-media-overlay\"></span><span class=\"icon-name\"> ti-layout-media-overlay</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-media-overlay-alt\"></span><span\n                  class=\"icon-name\"> ti-layout-media-overlay-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-media-overlay-alt-2\"></span><span\n                  class=\"icon-name\"> ti-layout-media-overlay-alt-2</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-media-left\"></span><span class=\"icon-name\"> ti-layout-media-left</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-media-left-alt\"></span><span class=\"icon-name\"> ti-layout-media-left-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-media-center\"></span><span class=\"icon-name\"> ti-layout-media-center</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-media-center-alt\"></span><span\n                  class=\"icon-name\"> ti-layout-media-center-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-list-thumb\"></span><span class=\"icon-name\"> ti-layout-list-thumb</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-list-thumb-alt\"></span><span class=\"icon-name\"> ti-layout-list-thumb-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-list-post\"></span><span class=\"icon-name\"> ti-layout-list-post</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-list-large-image\"></span><span\n                  class=\"icon-name\"> ti-layout-list-large-image</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-line-solid\"></span><span class=\"icon-name\"> ti-layout-line-solid</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-grid4\"></span><span class=\"icon-name\"> ti-layout-grid4</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-grid3\"></span><span class=\"icon-name\"> ti-layout-grid3</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-grid2\"></span><span class=\"icon-name\"> ti-layout-grid2</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-grid2-thumb\"></span><span class=\"icon-name\"> ti-layout-grid2-thumb</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-cta-right\"></span><span class=\"icon-name\"> ti-layout-cta-right</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-cta-left\"></span><span class=\"icon-name\"> ti-layout-cta-left</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-cta-center\"></span><span class=\"icon-name\"> ti-layout-cta-center</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-cta-btn-right\"></span><span class=\"icon-name\"> ti-layout-cta-btn-right</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-cta-btn-left\"></span><span class=\"icon-name\"> ti-layout-cta-btn-left</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-column4\"></span><span class=\"icon-name\"> ti-layout-column4</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-column3\"></span><span class=\"icon-name\"> ti-layout-column3</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-column2\"></span><span class=\"icon-name\"> ti-layout-column2</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-accordion-separated\"></span><span\n                  class=\"icon-name\"> ti-layout-accordion-separated</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-accordion-merged\"></span><span\n                  class=\"icon-name\"> ti-layout-accordion-merged</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-accordion-list\"></span><span class=\"icon-name\"> ti-layout-accordion-list</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-widgetized\"></span><span class=\"icon-name\"> ti-widgetized</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-widget\"></span><span class=\"icon-name\"> ti-widget</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-widget-alt\"></span><span class=\"icon-name\"> ti-widget-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-view-list\"></span><span class=\"icon-name\"> ti-view-list</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-view-list-alt\"></span><span class=\"icon-name\"> ti-view-list-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-view-grid\"></span><span class=\"icon-name\"> ti-view-grid</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-upload\"></span><span class=\"icon-name\"> ti-upload</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-download\"></span><span class=\"icon-name\"> ti-download</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-loop\"></span><span class=\"icon-name\"> ti-loop</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-sidebar-2\"></span><span class=\"icon-name\"> ti-layout-sidebar-2</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-grid4-alt\"></span><span class=\"icon-name\"> ti-layout-grid4-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-grid3-alt\"></span><span class=\"icon-name\"> ti-layout-grid3-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-grid2-alt\"></span><span class=\"icon-name\"> ti-layout-grid2-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-column4-alt\"></span><span class=\"icon-name\"> ti-layout-column4-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-column3-alt\"></span><span class=\"icon-name\"> ti-layout-column3-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-layout-column2-alt\"></span><span class=\"icon-name\"> ti-layout-column2-alt</span>\n                </div>\n\n\n              </div> <!-- Layout Icons -->\n\n\n              <div class=\"icon-section\">\n                <h3>Brand Icons</h3>\n\n                <div class=\"icon-container\">\n                  <span class=\"ti-flickr\"></span><span class=\"icon-name\"> ti-flickr</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-flickr-alt\"></span><span class=\"icon-name\"> ti-flickr-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-instagram\"></span><span class=\"icon-name\"> ti-instagram</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-google\"></span><span class=\"icon-name\"> ti-google</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-github\"></span><span class=\"icon-name\"> ti-github</span>\n                </div>\n\n                <div class=\"icon-container\">\n                  <span class=\"ti-facebook\"></span><span class=\"icon-name\"> ti-facebook</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-dropbox\"></span><span class=\"icon-name\"> ti-dropbox</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-dropbox-alt\"></span><span class=\"icon-name\"> ti-dropbox-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-dribbble\"></span><span class=\"icon-name\"> ti-dribbble</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-apple\"></span><span class=\"icon-name\"> ti-apple</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-android\"></span><span class=\"icon-name\"> ti-android</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-yahoo\"></span><span class=\"icon-name\"> ti-yahoo</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-trello\"></span><span class=\"icon-name\"> ti-trello</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-stack-overflow\"></span><span class=\"icon-name\"> ti-stack-overflow</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-soundcloud\"></span><span class=\"icon-name\"> ti-soundcloud</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-sharethis\"></span><span class=\"icon-name\"> ti-sharethis</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-sharethis-alt\"></span><span class=\"icon-name\"> ti-sharethis-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-reddit\"></span><span class=\"icon-name\"> ti-reddit</span>\n                </div>\n\n                <div class=\"icon-container\">\n                  <span class=\"ti-microsoft\"></span><span class=\"icon-name\"> ti-microsoft</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-microsoft-alt\"></span><span class=\"icon-name\"> ti-microsoft-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-linux\"></span><span class=\"icon-name\"> ti-linux</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-jsfiddle\"></span><span class=\"icon-name\"> ti-jsfiddle</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-joomla\"></span><span class=\"icon-name\"> ti-joomla</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-html5\"></span><span class=\"icon-name\"> ti-html5</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-css3\"></span><span class=\"icon-name\"> ti-css3</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-drupal\"></span><span class=\"icon-name\"> ti-drupal</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-wordpress\"></span><span class=\"icon-name\"> ti-wordpress</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-tumblr\"></span><span class=\"icon-name\"> ti-tumblr</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-tumblr-alt\"></span><span class=\"icon-name\"> ti-tumblr-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-skype\"></span><span class=\"icon-name\"> ti-skype</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-youtube\"></span><span class=\"icon-name\"> ti-youtube</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-vimeo\"></span><span class=\"icon-name\"> ti-vimeo</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-vimeo-alt\"></span><span class=\"icon-name\"> ti-vimeo-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-twitter\"></span><span class=\"icon-name\"> ti-twitter</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-twitter-alt\"></span><span class=\"icon-name\"> ti-twitter-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-linkedin\"></span><span class=\"icon-name\"> ti-linkedin</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-pinterest\"></span><span class=\"icon-name\"> ti-pinterest</span>\n                </div>\n\n                <div class=\"icon-container\">\n                  <span class=\"ti-pinterest-alt\"></span><span class=\"icon-name\"> ti-pinterest-alt</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-themify-logo\"></span><span class=\"icon-name\"> ti-themify-logo</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-themify-favicon\"></span><span class=\"icon-name\"> ti-themify-favicon</span>\n                </div>\n                <div class=\"icon-container\">\n                  <span class=\"ti-themify-favicon-alt\"></span><span class=\"icon-name\"> ti-themify-favicon-alt</span>\n                </div>\n\n              </div> <!-- brand Icons -->\n\n            </div>\n          </div>\n        </div>\n\n      </div>\n    </div>\n\n  </div>\n  <footer-cmp></footer-cmp>\n</div>\n\n"

/***/ }),

/***/ "./src/app/icons/icons.component.ts":
/*!******************************************!*\
  !*** ./src/app/icons/icons.component.ts ***!
  \******************************************/
/*! exports provided: IconsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IconsComponent", function() { return IconsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var IconsComponent = /** @class */ (function () {
    function IconsComponent() {
    }
    IconsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'icons-cmp',
            template: __webpack_require__(/*! ./icons.component.html */ "./src/app/icons/icons.component.html")
        })
    ], IconsComponent);
    return IconsComponent;
}());



/***/ }),

/***/ "./src/app/login/index.ts":
/*!********************************!*\
  !*** ./src/app/login/index.ts ***!
  \********************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _login_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.component */ "./src/app/login/login.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return _login_component__WEBPACK_IMPORTED_MODULE_0__["LoginComponent"]; });




/***/ }),

/***/ "./src/app/login/login.component.html":
/*!********************************************!*\
  !*** ./src/app/login/login.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"card col-md-4 col-md-offset-4\">\n    <h2>Login</h2>\n    <form [formGroup]=\"loginForm\" (ngSubmit)=\"onSubmit()\">\n      <div class=\"form-group\">\n        <label for=\"username\">Username</label>\n        <input type=\"text\" formControlName=\"username\" class=\"form-control border-input\"\n               [ngClass]=\"{ 'is-invalid': submitted && f.username.errors }\"/>\n        <div *ngIf=\"submitted && f.username.errors\" class=\"invalid-feedback text-danger\">\n          <div *ngIf=\"f.username.errors.required\">Username is required</div>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"password\">Password</label>\n        <input type=\"password\" formControlName=\"password\" class=\"form-control border-input\"\n               [ngClass]=\"{ 'is-invalid': submitted && f.password.errors }\"/>\n        <div *ngIf=\"submitted && f.password.errors\" class=\"invalid-feedback text-danger\">\n          <div *ngIf=\"f.password.errors.required\">Password is required</div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-md-3\">\n          <div class=\"form-group\">\n            <button [disabled]=\"loading\" class=\"btn btn-primary\">Login</button>\n          </div>\n        </div>\n        <div class=\"col-md-4\">\n          <div class=\"form-group\">\n            <a [routerLink]=\"['/register']\" class=\"btn btn-link\">Register</a>\n          </div>\n        </div>\n      </div>\n    </form>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_services */ "./src/app/_services/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginComponent = /** @class */ (function () {
    function LoginComponent(formBuilder, route, router, authenticationService, alertService) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.alertService = alertService;
        this.loading = false;
        this.submitted = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.loginForm = this.formBuilder.group({
            username: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
        });
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    Object.defineProperty(LoginComponent.prototype, "f", {
        // convenience getter for easy access to form fields
        get: function () {
            return this.loginForm.controls;
        },
        enumerable: true,
        configurable: true
    });
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])())
            .subscribe(function (data) {
            _this.router.navigate([_this.returnUrl]);
        }, function (error) {
            _this.alertService.error(error);
            _this.loading = false;
        });
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({ template: __webpack_require__(/*! ./login.component.html */ "./src/app/login/login.component.html") }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services__WEBPACK_IMPORTED_MODULE_4__["AuthenticationService"],
            _services__WEBPACK_IMPORTED_MODULE_4__["AlertService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/maps/maps.component.html":
/*!******************************************!*\
  !*** ./src/app/maps/maps.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"sidebar\" data-background-color=\"white\" data-active-color=\"danger\">\n  <app-sidebar></app-sidebar>\n</div>\n<div class=\"main-panel\">\n  <app-navbar></app-navbar>\n  <div class=\"content\">\n\n    <div class=\"container-fluid\">\n      <div class=\"card card-map\">\n        <div class=\"header\">\n          <h4 class=\"title\">Google Maps</h4>\n        </div>\n        <ngui-map zoom=\"13\" center=\"40.748817,-73.985428\">\n          <marker [position]=\"[40.748817,-73.985428]\"></marker>\n          <map-circle\n            [center]=\"{lat: 40.748817, lng: -73.985428}\">\n          </map-circle>\n        </ngui-map>\n      </div>\n    </div>\n\n  </div>\n  <footer-cmp></footer-cmp>\n</div>\n\n"

/***/ }),

/***/ "./src/app/maps/maps.component.ts":
/*!****************************************!*\
  !*** ./src/app/maps/maps.component.ts ***!
  \****************************************/
/*! exports provided: MapsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapsComponent", function() { return MapsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var MapsComponent = /** @class */ (function () {
    function MapsComponent() {
    }
    MapsComponent.prototype.ngOnInit = function () {
    };
    MapsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./maps.component.html */ "./src/app/maps/maps.component.html")
        })
    ], MapsComponent);
    return MapsComponent;
}());



/***/ }),

/***/ "./src/app/notifications/notifications.component.html":
/*!************************************************************!*\
  !*** ./src/app/notifications/notifications.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"sidebar\" data-background-color=\"white\" data-active-color=\"danger\">\n  <app-sidebar></app-sidebar>\n</div>\n<div class=\"main-panel\">\n  <app-navbar></app-navbar>\n  <div class=\"content\">\n\n    <div class=\"container-fluid\">\n      <div class=\"card\">\n        <div class=\"header\">\n          <h4 class=\"title\">Notifications</h4>\n          <p class=\"category\">Handcrafted by our friend <a target=\"_blank\" href=\"https://github.com/mouse0270\">Robert\n            McIntosh</a>. Please checkout the <a href=\"http://bootstrap-notify.remabledesigns.com/\" target=\"_blank\">full\n            documentation.</a></p>\n\n        </div>\n        <div class=\"content\">\n          <div class=\"row\">\n            <div class=\"col-md-6\">\n              <h5>Notifications Style</h5>\n              <div class=\"alert alert-info\">\n                <span>This is a plain notification</span>\n              </div>\n              <div class=\"alert alert-info\">\n                <button type=\"button\" aria-hidden=\"true\" class=\"close\">×</button>\n                <span>This is a notification with close button.</span>\n              </div>\n              <div class=\"alert alert-info\" data-notify=\"container\">\n                <button type=\"button\" aria-hidden=\"true\" class=\"close\">×</button>\n                <span data-notify=\"icon\" class=\"ti-bell\"></span>\n                <span data-notify=\"message\">This is a notification with close button and icon.</span>\n              </div>\n              <div class=\"alert alert-info\" data-notify=\"container\">\n                <button type=\"button\" aria-hidden=\"true\" class=\"close\">×</button>\n                <span data-notify=\"icon\" class=\"ti-pie-chart\"></span>\n                <span data-notify=\"message\">This is a notification with close button and icon and have many lines. You can see that the icon and the close button are always vertically aligned. This is a beautiful notification. So you don't have to worry about the style.</span>\n              </div>\n            </div>\n            <div class=\"col-md-6\">\n              <h5>Notification states</h5>\n              <div class=\"alert alert-info\">\n                <button type=\"button\" aria-hidden=\"true\" class=\"close\">×</button>\n                <span><b> Info - </b> This is a regular notification made with \".alert-info\"</span>\n              </div>\n              <div class=\"alert alert-success\">\n                <button type=\"button\" aria-hidden=\"true\" class=\"close\">×</button>\n                <span><b> Success - </b> This is a regular notification made with \".alert-success\"</span>\n              </div>\n              <div class=\"alert alert-warning\">\n                <button type=\"button\" aria-hidden=\"true\" class=\"close\">×</button>\n                <span><b> Warning - </b> This is a regular notification made with \".alert-warning\"</span>\n              </div>\n              <div class=\"alert alert-danger\">\n                <button type=\"button\" aria-hidden=\"true\" class=\"close\">×</button>\n                <span><b> Danger - </b> This is a regular notification made with \".alert-danger\"</span>\n              </div>\n            </div>\n          </div>\n          <br>\n          <br>\n          <div class=\"places-buttons\">\n            <div class=\"row\">\n              <div class=\"col-md-9\">\n                <h5>Notifications Places\n                  <p class=\"category\">Click to view notifications</p>\n                </h5>\n              </div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-md-3\">\n                <button class=\"btn btn-default btn-block\" (click)=\"showNotification('top','left')\">Top Left</button>\n              </div>\n              <div class=\"col-md-3\">\n                <button class=\"btn btn-default btn-block\" (click)=\"showNotification('top','center')\">Top Center</button>\n              </div>\n              <div class=\"col-md-3\">\n                <button class=\"btn btn-default btn-block\" (click)=\"showNotification('top','right')\">Top Right</button>\n              </div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-md-3\">\n                <button class=\"btn btn-default btn-block\" (click)=\"showNotification('bottom','left')\">Bottom Left\n                </button>\n              </div>\n              <div class=\"col-md-3\">\n                <button class=\"btn btn-default btn-block\" (click)=\"showNotification('bottom','center')\">Bottom Center\n                </button>\n              </div>\n              <div class=\"col-md-3\">\n                <button class=\"btn btn-default btn-block\" (click)=\"showNotification('bottom','right')\">Bottom Right\n                </button>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n  </div>\n  <footer-cmp></footer-cmp>\n</div>\n\n"

/***/ }),

/***/ "./src/app/notifications/notifications.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/notifications/notifications.component.ts ***!
  \**********************************************************/
/*! exports provided: NotificationsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationsComponent", function() { return NotificationsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var NotificationsComponent = /** @class */ (function () {
    function NotificationsComponent() {
    }
    NotificationsComponent.prototype.showNotification = function (from, align) {
        var type = ['', 'info', 'success', 'warning', 'danger'];
        var color = Math.floor((Math.random() * 4) + 1);
        $.notify({
            icon: 'ti-gift',
            message: 'Welcome to <b>Paper Dashboard</b> - a beautiful freebie for every web developer.'
        }, {
            type: type[color],
            timer: 4000,
            placement: {
                from: from,
                align: align
            }
        });
    };
    NotificationsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./notifications.component.html */ "./src/app/notifications/notifications.component.html")
        })
    ], NotificationsComponent);
    return NotificationsComponent;
}());



/***/ }),

/***/ "./src/app/register/index.ts":
/*!***********************************!*\
  !*** ./src/app/register/index.ts ***!
  \***********************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _register_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./register.component */ "./src/app/register/register.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return _register_component__WEBPACK_IMPORTED_MODULE_0__["RegisterComponent"]; });




/***/ }),

/***/ "./src/app/register/register.component.html":
/*!**************************************************!*\
  !*** ./src/app/register/register.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"card col-md-4 col-md-offset-4\">\n    <h2>Register</h2>\n    <form [formGroup]=\"registerForm\" (ngSubmit)=\"onSubmit()\">\n      <div class=\"form-group\">\n        <label for=\"firstName\">First Name</label>\n        <input type=\"text\" formControlName=\"firstName\" class=\"form-control border-input\"\n               [ngClass]=\"{ 'is-invalid': submitted && f.firstName.errors }\"/>\n        <div *ngIf=\"submitted && f.firstName.errors\" class=\"invalid-feedback\">\n          <div *ngIf=\"f.firstName.errors.required\">First Name is required</div>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"lastName\">Last Name</label>\n        <input type=\"text\" formControlName=\"lastName\" class=\"form-control border-input\"\n               [ngClass]=\"{ 'is-invalid': submitted && f.lastName.errors }\"/>\n        <div *ngIf=\"submitted && f.lastName.errors\" class=\"invalid-feedback\">\n          <div *ngIf=\"f.lastName.errors.required\">Last Name is required</div>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"username\">Username</label>\n        <input type=\"text\" formControlName=\"username\" class=\"form-control border-input\"\n               [ngClass]=\"{ 'is-invalid': submitted && f.username.errors }\"/>\n        <div *ngIf=\"submitted && f.username.errors\" class=\"invalid-feedback\">\n          <div *ngIf=\"f.username.errors.required\">Username is required</div>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"password\">Password</label>\n        <input type=\"password\" formControlName=\"password\" class=\"form-control border-input\"\n               [ngClass]=\"{ 'is-invalid': submitted && f.password.errors }\"/>\n        <div *ngIf=\"submitted && f.password.errors\" class=\"invalid-feedback\">\n          <div *ngIf=\"f.password.errors.required\">Password is required</div>\n          <div *ngIf=\"f.password.errors.minlength\">Password must be at least 8 characters</div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-md-3\">\n          <div class=\"form-group\">\n            <button [disabled]=\"loading\" class=\"btn btn-primary\">Register</button>\n          </div>\n        </div>\n        <div class=\"col-md-4\">\n          <div class=\"form-group\">\n            <a [routerLink]=\"['/login']\" class=\"btn btn-link\">Cancel</a>\n          </div>\n        </div>\n      </div>\n    </form>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/register/register.component.ts":
/*!************************************************!*\
  !*** ./src/app/register/register.component.ts ***!
  \************************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_services */ "./src/app/_services/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(formBuilder, router, userService, alertService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.userService = userService;
        this.alertService = alertService;
        this.loading = false;
        this.submitted = false;
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.registerForm = this.formBuilder.group({
            firstName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            lastName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            username: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            password: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(8)]]
        });
    };
    Object.defineProperty(RegisterComponent.prototype, "f", {
        // convenience getter for easy access to form fields
        get: function () {
            return this.registerForm.controls;
        },
        enumerable: true,
        configurable: true
    });
    RegisterComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])())
            .subscribe(function (data) {
            _this.alertService.success('Registration successful', true);
            _this.router.navigate(['/login']);
        }, function (error) {
            _this.alertService.error(error);
            _this.loading = false;
        });
    };
    RegisterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({ template: __webpack_require__(/*! ./register.component.html */ "./src/app/register/register.component.html") }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services__WEBPACK_IMPORTED_MODULE_4__["UserService"],
            _services__WEBPACK_IMPORTED_MODULE_4__["AlertService"]])
    ], RegisterComponent);
    return RegisterComponent;
}());



/***/ }),

/***/ "./src/app/shared/fixedplugin/fixedplugin.component.html":
/*!***************************************************************!*\
  !*** ./src/app/shared/fixedplugin/fixedplugin.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"fixed-plugin\">\n  <div class=\"dropdown show-dropdown\">\n    <a href=\"#\" data-toggle=\"dropdown\">\n      <i class=\"fa fa-cog fa-2x\"> </i>\n    </a>\n    <ul class=\"dropdown-menu\">\n      <li class=\"header-title\">Sidebar Background</li>\n      <li class=\"adjustments-line text-center\">\n        <a href=\"javascript:void(0)\" class=\"switch-trigger background-color\">\n          <span class=\"badge filter badge-white active\" data-color=\"white\"></span>\n          <span class=\"badge filter badge-black\" data-color=\"black\"></span>\n        </a>\n      </li>\n\n      <li class=\"header-title\">Sidebar Active Color</li>\n      <li class=\"adjustments-line text-center\">\n        <a href=\"javascript:void(0)\" class=\"switch-trigger active-color\">\n          <span class=\"badge filter badge-primary\" data-color=\"primary\"></span>\n          <span class=\"badge filter badge-info\" data-color=\"info\"></span>\n          <span class=\"badge filter badge-success\" data-color=\"success\"></span>\n          <span class=\"badge filter badge-warning\" data-color=\"warning\"></span>\n          <span class=\"badge filter badge-danger active\" data-color=\"danger\"></span>\n        </a>\n      </li>\n    </ul>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/shared/fixedplugin/fixedplugin.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/shared/fixedplugin/fixedplugin.component.ts ***!
  \*************************************************************/
/*! exports provided: FixedPluginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FixedPluginComponent", function() { return FixedPluginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FixedPluginComponent = /** @class */ (function () {
    function FixedPluginComponent() {
    }
    FixedPluginComponent.prototype.ngOnInit = function () {
        var $sidebar = $('.sidebar');
        var $off_canvas_sidebar = $('.off-canvas-sidebar');
        var window_width = $(window).width();
        if (window_width > 767) {
            if ($('.fixed-plugin .dropdown').hasClass('show-dropdown')) {
                $('.fixed-plugin .dropdown').addClass('open');
            }
        }
        $('.fixed-plugin a').click(function (event) {
            // Alex if we click on switch, stop propagation of the event, so the dropdown will not be hide, otherwise we set the  section active
            if ($(this).hasClass('switch-trigger')) {
                if (event.stopPropagation) {
                    event.stopPropagation();
                }
                else if (window.event) {
                    window.event.cancelBubble = true;
                }
            }
        });
        $('.fixed-plugin .background-color span').click(function () {
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            var new_color = $(this).data('color');
            if ($sidebar.length !== 0) {
                $sidebar.attr('data-background-color', new_color);
            }
            if ($off_canvas_sidebar.length !== 0) {
                $off_canvas_sidebar.attr('data-background-color', new_color);
            }
        });
        $('.fixed-plugin .active-color span').click(function () {
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            var new_color = $(this).data('color');
            if ($sidebar.length !== 0) {
                $sidebar.attr('data-active-color', new_color);
            }
            if ($off_canvas_sidebar.length !== 0) {
                $off_canvas_sidebar.attr('data-active-color', new_color);
            }
        });
    };
    FixedPluginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'fixedplugin-cmp',
            template: __webpack_require__(/*! ./fixedplugin.component.html */ "./src/app/shared/fixedplugin/fixedplugin.component.html")
        })
    ], FixedPluginComponent);
    return FixedPluginComponent;
}());



/***/ }),

/***/ "./src/app/shared/fixedplugin/fixedplugin.module.ts":
/*!**********************************************************!*\
  !*** ./src/app/shared/fixedplugin/fixedplugin.module.ts ***!
  \**********************************************************/
/*! exports provided: FixedPluginModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FixedPluginModule", function() { return FixedPluginModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _fixedplugin_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fixedplugin.component */ "./src/app/shared/fixedplugin/fixedplugin.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var FixedPluginModule = /** @class */ (function () {
    function FixedPluginModule() {
    }
    FixedPluginModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]],
            declarations: [_fixedplugin_component__WEBPACK_IMPORTED_MODULE_3__["FixedPluginComponent"]],
            exports: [_fixedplugin_component__WEBPACK_IMPORTED_MODULE_3__["FixedPluginComponent"]]
        })
    ], FixedPluginModule);
    return FixedPluginModule;
}());



/***/ }),

/***/ "./src/app/shared/footer/footer.component.html":
/*!*****************************************************!*\
  !*** ./src/app/shared/footer/footer.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<footer class=\"footer\">\n  <div class=\"container-fluid\">\n    <nav class=\"pull-left\">\n      <ul>\n        <li>\n          <a href=\"https://www.creative-tim.com\">\n            Creative Tim\n          </a>\n        </li>\n        <li>\n          <a href=\"http://blog.creative-tim.com\">\n            Blog\n          </a>\n        </li>\n        <li>\n          <a href=\"https://www.creative-tim.com/license\">\n            Licenses\n          </a>\n        </li>\n      </ul>\n    </nav>\n    <div class=\"copyright pull-right\">\n      &copy; {{test | date: 'yyyy'}}, made with <i class=\"fa fa-heart heart\"></i> by <a\n      href=\"https://www.creative-tim.com\">Creative Tim</a>\n    </div>\n  </div>\n</footer>\n"

/***/ }),

/***/ "./src/app/shared/footer/footer.component.ts":
/*!***************************************************!*\
  !*** ./src/app/shared/footer/footer.component.ts ***!
  \***************************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
        this.test = new Date();
    }
    FooterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'footer-cmp',
            template: __webpack_require__(/*! ./footer.component.html */ "./src/app/shared/footer/footer.component.html")
        })
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "./src/app/shared/footer/footer.module.ts":
/*!************************************************!*\
  !*** ./src/app/shared/footer/footer.module.ts ***!
  \************************************************/
/*! exports provided: FooterModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterModule", function() { return FooterModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _footer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./footer.component */ "./src/app/shared/footer/footer.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var FooterModule = /** @class */ (function () {
    function FooterModule() {
    }
    FooterModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]],
            declarations: [_footer_component__WEBPACK_IMPORTED_MODULE_3__["FooterComponent"]],
            exports: [_footer_component__WEBPACK_IMPORTED_MODULE_3__["FooterComponent"]]
        })
    ], FooterModule);
    return FooterModule;
}());



/***/ }),

/***/ "./src/app/shared/navbar/navbar.component.html":
/*!*****************************************************!*\
  !*** ./src/app/shared/navbar/navbar.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-default\">\n  <div class=\"container-fluid\">\n    <div class=\"navbar-header\">\n      <a class=\"navbar-brand\" href=\"#\">{{getTitle()}}</a>\n    </div>\n    <div class=\"collapse navbar-collapse\">\n      <ul class=\"nav navbar-nav navbar-right\">\n        <li class=\"dropdown\">\n          <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n            <i class=\"ti-bell\"></i>\n            <p class=\"notification\">5</p>\n            <p>Notifications</p>\n            <b class=\"caret\"></b>\n          </a>\n          <ul class=\"dropdown-menu\">\n            <li><a href=\"#\">Notification 1</a></li>\n            <li><a href=\"#\">Notification 2</a></li>\n            <li><a href=\"#\">Notification 3</a></li>\n            <li><a href=\"#\">Notification 4</a></li>\n            <li><a href=\"#\">Another notification</a></li>\n          </ul>\n        </li>\n        <li>\n          <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n            <i class=\"ti-settings\"></i>\n            <p>Settings</p>\n            <b class=\"caret\"></b>\n          </a>\n          <ul class=\"dropdown-menu\">\n            <li><a href=\"#\">Change Password</a></li>\n            <li><a href=\"#\">Settings</a></li>\n          </ul>\n        </li>\n      </ul>\n    </div>\n  </div>\n</nav>\n"

/***/ }),

/***/ "./src/app/shared/navbar/navbar.component.ts":
/*!***************************************************!*\
  !*** ./src/app/shared/navbar/navbar.component.ts ***!
  \***************************************************/
/*! exports provided: NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return NavbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../sidebar/sidebar.component */ "./src/app/sidebar/sidebar.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(location, element) {
        this.element = element;
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }
    NavbarComponent.prototype.ngOnInit = function () {
        this.listTitles = _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_1__["ROUTES"].filter(function (listTitle) { return listTitle; });
        var navbar = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    };
    NavbarComponent.prototype.getTitle = function () {
        var titlee = window.location.pathname;
        for (var item = 0; item < this.listTitles.length; item++) {
            if (titlee === this.listTitles[item].path) {
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    };
    NavbarComponent.prototype.sidebarToggle = function () {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            setTimeout(function () {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        }
        else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('app-navbar'),
        __metadata("design:type", Object)
    ], NavbarComponent.prototype, "button", void 0);
    NavbarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-navbar',
            template: __webpack_require__(/*! ./navbar.component.html */ "./src/app/shared/navbar/navbar.component.html")
        }),
        __metadata("design:paramtypes", [_angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]])
    ], NavbarComponent);
    return NavbarComponent;
}());



/***/ }),

/***/ "./src/app/shared/navbar/navbar.module.ts":
/*!************************************************!*\
  !*** ./src/app/shared/navbar/navbar.module.ts ***!
  \************************************************/
/*! exports provided: NavbarModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarModule", function() { return NavbarModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _navbar_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./navbar.component */ "./src/app/shared/navbar/navbar.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var NavbarModule = /** @class */ (function () {
    function NavbarModule() {
    }
    NavbarModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]],
            declarations: [_navbar_component__WEBPACK_IMPORTED_MODULE_3__["NavbarComponent"]],
            exports: [_navbar_component__WEBPACK_IMPORTED_MODULE_3__["NavbarComponent"]]
        })
    ], NavbarModule);
    return NavbarModule;
}());



/***/ }),

/***/ "./src/app/sidebar/sidebar.component.html":
/*!************************************************!*\
  !*** ./src/app/sidebar/sidebar.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"sidebar-wrapper\" >\n  <div class=\"logo\">\n    <a href=\"#\" class=\"simple-text\">\n      <div class=\"logo-img\">\n        <img src=\"../../assets/img/angular2-logo.png\" alt=\"\">\n      </div>\n      Common App\n    </a>\n  </div>\n  <ul class=\"nav\">\n    <li *ngIf=\"isNotMobileMenu()\">\n      <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n        <i class=\"ti-panel\"></i>\n        <p>Stats</p>\n      </a>\n    </li>\n    <li class=\"dropdown\" *ngIf=\"isNotMobileMenu()\">\n      <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n        <i class=\"ti-bell\"></i>\n        <p class=\"notification\">5</p>\n        <p>Notifications</p>\n        <b class=\"caret\"></b>\n      </a>\n      <ul class=\"dropdown-menu\">\n        <li><a href=\"#\">Notification 1</a></li>\n        <li><a href=\"#\">Notification 2</a></li>\n        <li><a href=\"#\">Notification 3</a></li>\n        <li><a href=\"#\">Notification 4</a></li>\n        <li><a href=\"#\">Another notification</a></li>\n      </ul>\n    </li>\n    <li *ngIf=\"isNotMobileMenu()\">\n      <a href=\"#\">\n        <i class=\"ti-settings\"></i>\n        <p>Settings</p>\n      </a>\n    </li>\n    <li class=\"divider\" *ngIf=\"isNotMobileMenu()\"></li>\n    <li *ngFor=\"let menuItem of menuItems\" routerLinkActive=\"active\" class=\"{{menuItem.class}}\">\n      <a [routerLink]=\"[menuItem.path]\">\n        <i class=\"{{menuItem.icon}}\"></i>\n        <p>{{menuItem.title}}</p>\n      </a>\n    </li>\n  </ul>\n</div>\n"

/***/ }),

/***/ "./src/app/sidebar/sidebar.component.ts":
/*!**********************************************!*\
  !*** ./src/app/sidebar/sidebar.component.ts ***!
  \**********************************************/
/*! exports provided: ROUTES, SidebarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROUTES", function() { return ROUTES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarComponent", function() { return SidebarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ROUTES = [
    { path: '/dashboard', title: 'Dashboard', icon: 'ti-panel', class: '' },
    { path: '/user', title: 'User Profile', icon: 'ti-user', class: '' },
    { path: '/table', title: 'Table List', icon: 'ti-view-list-alt', class: '' },
    { path: '/typography', title: 'Typography', icon: 'ti-text', class: '' },
    { path: '/icons', title: 'Icons', icon: 'ti-pencil-alt2', class: '' },
    { path: '/maps', title: 'Maps', icon: 'ti-map', class: '' },
    { path: '/notifications', title: 'Notifications', icon: 'ti-bell', class: '' },
    { path: '/login', title: 'Log Out', icon: 'ti-export', class: 'active-pro' },
];
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent() {
    }
    SidebarComponent.prototype.ngOnInit = function () {
        this.menuItems = ROUTES.filter(function (menuItem) { return menuItem; });
    };
    SidebarComponent.prototype.isNotMobileMenu = function () {
        return $(window).width() <= 991;
    };
    SidebarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sidebar',
            template: __webpack_require__(/*! ./sidebar.component.html */ "./src/app/sidebar/sidebar.component.html"),
        })
    ], SidebarComponent);
    return SidebarComponent;
}());



/***/ }),

/***/ "./src/app/sidebar/sidebar.module.ts":
/*!*******************************************!*\
  !*** ./src/app/sidebar/sidebar.module.ts ***!
  \*******************************************/
/*! exports provided: SidebarModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarModule", function() { return SidebarModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _sidebar_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sidebar.component */ "./src/app/sidebar/sidebar.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var SidebarModule = /** @class */ (function () {
    function SidebarModule() {
    }
    SidebarModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]],
            declarations: [_sidebar_component__WEBPACK_IMPORTED_MODULE_3__["SidebarComponent"]],
            exports: [_sidebar_component__WEBPACK_IMPORTED_MODULE_3__["SidebarComponent"]]
        })
    ], SidebarModule);
    return SidebarModule;
}());



/***/ }),

/***/ "./src/app/table/table.component.html":
/*!********************************************!*\
  !*** ./src/app/table/table.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"sidebar\" data-background-color=\"white\" data-active-color=\"danger\">\n  <app-sidebar></app-sidebar>\n</div>\n<div class=\"main-panel\">\n  <app-navbar></app-navbar>\n  <div class=\"content\">\n\n    <div class=\"container-fluid\">\n      <div class=\"row\">\n\n        <div class=\"col-md-12\">\n          <div class=\"card\">\n            <div class=\"header\">\n              <div>\n                <h4 class=\"title pull-left\">User Table</h4>\n                <button class=\"btn btn-primary btn-fill btn-wd pull-right\" [routerLink]=\"['/add-user']\">Add</button>\n              </div>\n            </div>\n            <div class=\"content table-responsive table-full-width\">\n              <table class=\"table table-striped\">\n                <thead>\n                <tr>\n                  <th *ngFor=\"let cell of tableData1.headerRow\">{{ cell }}</th>\n                </tr>\n                </thead>\n                <tbody>\n                <tr *ngFor=\"let row of users\">\n                  <td>{{row.username}}</td>\n                  <td>{{row.firstName}} {{row.lastName}}</td>\n                  <td>{{row.email}}</td>\n                  <td>{{row.phone}}</td>\n                  <td>{{row.status}}</td>\n                  <td><a [routerLink]=\"['/user/'+row._id]\">\n                    <i class=\"\"></i>\n                    <p>Edit</p>\n                  </a></td>\n                </tr>\n                </tbody>\n              </table>\n\n            </div>\n          </div>\n        </div>\n\n      </div>\n    </div>\n\n  </div>\n  <footer-cmp></footer-cmp>\n</div>\n"

/***/ }),

/***/ "./src/app/table/table.component.ts":
/*!******************************************!*\
  !*** ./src/app/table/table.component.ts ***!
  \******************************************/
/*! exports provided: TableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableComponent", function() { return TableComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_services */ "./src/app/_services/index.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TableComponent = /** @class */ (function () {
    function TableComponent(userService) {
        this.userService = userService;
        this.users = [];
    }
    TableComponent.prototype.ngOnInit = function () {
        this.tableData1 = {
            headerRow: ['Username', 'Name', 'Email', 'Phone', 'Status', 'Action']
        };
        this.loadAllUsers();
    };
    TableComponent.prototype.deleteUser = function (id) {
        var _this = this;
        this.userService.delete(id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["first"])()).subscribe(function () {
            _this.loadAllUsers();
        });
    };
    TableComponent.prototype.loadAllUsers = function () {
        var _this = this;
        this.userService.getAll().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["first"])()).subscribe(function (users) {
            _this.users = users;
        });
    };
    TableComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./table.component.html */ "./src/app/table/table.component.html")
        }),
        __metadata("design:paramtypes", [_services__WEBPACK_IMPORTED_MODULE_1__["UserService"]])
    ], TableComponent);
    return TableComponent;
}());



/***/ }),

/***/ "./src/app/typography/typography.component.html":
/*!******************************************************!*\
  !*** ./src/app/typography/typography.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"sidebar\" data-background-color=\"white\" data-active-color=\"danger\">\n  <app-sidebar></app-sidebar>\n</div>\n<div class=\"main-panel\">\n  <app-navbar></app-navbar>\n  <div class=\"content\">\n\n    <div class=\"container-fluid\">\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n          <div class=\"card\">\n            <div class=\"header\">\n              <h4 class=\"title\">Paper Dashboard Headings</h4>\n              <p class=\"category\">Created using <a href=\"https://www.google.com/fonts/specimen/Muli\">Muli</a> Font\n                Family\n              </p>\n            </div>\n            <div class=\"content\">\n\n              <div class=\"typo-line\">\n                <h1><p class=\"category\">Header 1</p>Paper Dashboard Heading</h1>\n              </div>\n\n              <div class=\"typo-line\">\n                <h2><p class=\"category\">Header 2</p>Paper Dashboard Heading</h2>\n              </div>\n              <div class=\"typo-line\">\n                <h3><p class=\"category\">Header 3</p>Paper Dashboard Heading</h3>\n              </div>\n              <div class=\"typo-line\">\n                <h4><p class=\"category\">Header 4</p>Paper Dashboard Heading</h4>\n              </div>\n              <div class=\"typo-line\">\n                <h5><p class=\"category\">Header 5</p>Paper Dashboard Heading</h5>\n              </div>\n              <div class=\"typo-line\">\n                <h6><p class=\"category\">Header 6</p>Paper Dashboard Heading</h6>\n              </div>\n              <div class=\"typo-line\">\n                <p><span class=\"category\">Paragraph</span>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed\n                  diam\n                  nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim\n                  veniam.</p>\n              </div>\n              <div class=\"typo-line\">\n                <p class=\"category\">Quote</p>\n                <blockquote>\n                  <p>\n                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut\n                    laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam.\n                  </p>\n                  <small>\n                    Steve Jobs, CEO Apple\n                  </small>\n                </blockquote>\n              </div>\n\n              <div class=\"typo-line\">\n                <p class=\"category\">Muted Text</p>\n                <p class=\"text-muted\">\n                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut\n                  laoreet.\n                </p>\n              </div>\n              <div class=\"typo-line\">\n                <!--\n                 there are also \"text-info\", \"text-success\", \"text-warning\", \"text-danger\" clases for the text\n                 -->\n                <p class=\"category\">Coloured Text</p>\n                <p class=\"text-primary\">\n                  Text Primary - Light Bootstrap Table Heading and complex bootstrap dashboard you've ever seen on the\n                  internet.\n                </p>\n                <p class=\"text-info\">\n                  Text Info - Light Bootstrap Table Heading and complex bootstrap dashboard you've ever seen on the\n                  internet.\n                </p>\n                <p class=\"text-success\">\n                  Text Success - Light Bootstrap Table Heading and complex bootstrap dashboard you've ever seen on the\n                  internet.\n                </p>\n                <p class=\"text-warning\">\n                  Text Warning - Light Bootstrap Table Heading and complex bootstrap dashboard you've ever seen on the\n                  internet.\n                </p>\n                <p class=\"text-danger\">\n                  Text Danger - Light Bootstrap Table Heading and complex bootstrap dashboard you've ever seen on the\n                  internet.\n                </p>\n              </div>\n\n              <div class=\"typo-line\">\n                <h2><p class=\"category\">Small Tag</p>Header with small subtitle <br>\n                  <small>\".small\" is a tag for the headers</small>\n                </h2>\n              </div>\n\n\n            </div>\n          </div>\n        </div>\n\n      </div>\n    </div>\n\n  </div>\n  <footer-cmp></footer-cmp>\n</div>\n\n"

/***/ }),

/***/ "./src/app/typography/typography.component.ts":
/*!****************************************************!*\
  !*** ./src/app/typography/typography.component.ts ***!
  \****************************************************/
/*! exports provided: TypographyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TypographyComponent", function() { return TypographyComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var TypographyComponent = /** @class */ (function () {
    function TypographyComponent() {
    }
    TypographyComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./typography.component.html */ "./src/app/typography/typography.component.html")
        })
    ], TypographyComponent);
    return TypographyComponent;
}());



/***/ }),

/***/ "./src/app/user/user.component.html":
/*!******************************************!*\
  !*** ./src/app/user/user.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"sidebar\" data-background-color=\"white\" data-active-color=\"danger\">\n  <app-sidebar></app-sidebar>\n</div>\n<div class=\"main-panel\">\n  <app-navbar></app-navbar>\n  <div class=\"content\">\n\n    <div class=\"container-fluid\">\n      <div class=\"row\">\n        <div class=\"col-lg-4 col-md-5\">\n          <div class=\"card card-user\">\n            <div class=\"image\">\n              <img src=\"../../assets/img/background.jpg\" alt=\"...\"/>\n            </div>\n            <div class=\"content\">\n              <div class=\"author\">\n                <img class=\"avatar border-white\" src=\"../../assets/img/faces/face-1.jpg\" alt=\"...\"/>\n                <h4 class=\"title\">{{currentUser.firstName}} {{currentUser.lastName}}<br/>\n                  <a href=\"#\">\n                    <small>@{{currentUser.username}}</small>\n                  </a>\n                </h4>\n              </div>\n              <p class=\"description text-center\">\n                {{currentUser.status}}\n              </p>\n            </div>\n            <hr>\n            <div class=\"text-center\">\n              <div class=\"row\">\n                <div class=\"col-md-3 col-md-offset-1\">\n                  <h5>{{currentUser.role}}<br/>\n                    <small>Role</small>\n                  </h5>\n                </div>\n                <div class=\"col-md-4\">\n                  <h5>2<br/>\n                    <small>File</small>\n                  </h5>\n                </div>\n                <div class=\"col-md-3\">\n                  <h5>24,6$<br/>\n                    <small>Spent</small>\n                  </h5>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-lg-8 col-md-7\">\n          <div class=\"card\">\n            <div class=\"header\">\n              <h4 class=\"title\">Edit Profile</h4>\n            </div>\n            <div class=\"content\">\n              <form [formGroup]=\"userForm\" (ngSubmit)=\"onSubmit()\">\n                <div class=\"row\">\n                  <div class=\"col-md-3\">\n                    <div class=\"form-group\">\n                      <label>Username</label>\n                      <input type=\"text\" formControlName=\"username\" class=\"form-control border-input\" disabled placeholder=\"Username\">\n                    </div>\n                  </div>\n                  <div class=\"col-md-5\">\n                    <div class=\"form-group\">\n                      <label for=\"exampleInputEmail1\">Email address</label>\n                      <input type=\"email\" formControlName=\"email\" class=\"form-control border-input\" placeholder=\"Email\">\n                    </div>\n                  </div>\n                  <div class=\"col-md-4\">\n                    <div class=\"form-group\">\n                      <label>Phone</label>\n                      <input type=\"text\" formControlName=\"phone\" class=\"form-control border-input\" placeholder=\"Phone\" maxlength=\"10\">\n                    </div>\n                  </div>\n                </div>\n\n                <div class=\"row\">\n                  <div class=\"col-md-6\">\n                    <div class=\"form-group\">\n                      <label>First Name</label>\n                      <input type=\"text\" formControlName=\"firstName\" class=\"form-control border-input\" placeholder=\"First Name\">\n                    </div>\n                  </div>\n                  <div class=\"col-md-6\">\n                    <div class=\"form-group\">\n                      <label>Last Name</label>\n                      <input type=\"text\" formControlName=\"lastName\" class=\"form-control border-input\" placeholder=\"Last Name\">\n                    </div>\n                  </div>\n                </div>\n\n                <div class=\"row\">\n                  <div class=\"col-md-12\">\n                    <div class=\"form-group\">\n                      <label>Address</label>\n                      <input type=\"text\" class=\"form-control border-input\" placeholder=\"Home Address\">\n                    </div>\n                  </div>\n                </div>\n\n                <div class=\"row\">\n                  <div class=\"col-md-4\">\n                    <div class=\"form-group\">\n                      <label>City</label>\n                      <input type=\"text\" class=\"form-control border-input\" placeholder=\"City\">\n                    </div>\n                  </div>\n                  <div class=\"col-md-4\">\n                    <div class=\"form-group\">\n                      <label>Country</label>\n                      <input type=\"text\" class=\"form-control border-input\" placeholder=\"Country\">\n                    </div>\n                  </div>\n                  <div class=\"col-md-4\">\n                    <div class=\"form-group\">\n                      <label>Postal Code</label>\n                      <input type=\"number\" class=\"form-control border-input\" placeholder=\"ZIP Code\">\n                    </div>\n                  </div>\n                </div>\n\n                <div class=\"row\">\n                  <div class=\"col-md-12\">\n                    <div class=\"form-group\">\n                      <label>About Me</label>\n                      <textarea rows=\"5\" class=\"form-control border-input\"\n                                placeholder=\"Here can be your description\"></textarea>\n                    </div>\n                  </div>\n                </div>\n                <div class=\"text-center\">\n                  <button type=\"submit\" class=\"btn btn-info btn-fill btn-wd\">Update Profile</button>\n                </div>\n                <div class=\"clearfix\"></div>\n              </form>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n  </div>\n  <footer-cmp></footer-cmp>\n</div>\n<!--<fixedplugin-cmp></fixedplugin-cmp>-->\n"

/***/ }),

/***/ "./src/app/user/user.component.ts":
/*!****************************************!*\
  !*** ./src/app/user/user.component.ts ***!
  \****************************************/
/*! exports provided: UserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserComponent", function() { return UserComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_models */ "./src/app/_models/index.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_services */ "./src/app/_services/index.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var UserComponent = /** @class */ (function () {
    function UserComponent(route, userService, router, formBuilder) {
        this.route = route;
        this.userService = userService;
        this.router = router;
        this.formBuilder = formBuilder;
        this.userForm = this.formBuilder.group({
            firstName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required],
            lastName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required],
            username: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required],
            email: [''],
            phone: ['']
        });
    }
    UserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.userId = params['userId'];
        });
        if (this.userId) {
            this.currentUser = new _models__WEBPACK_IMPORTED_MODULE_2__["User"]();
            this.getById(this.userId);
        }
        else {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser')).user;
            this.initForm();
        }
    };
    Object.defineProperty(UserComponent.prototype, "f", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: true,
        configurable: true
    });
    UserComponent.prototype.initForm = function () {
        this.f.firstName.patchValue(this.currentUser.firstName);
        this.f.lastName.patchValue(this.currentUser.lastName);
        this.f.username.patchValue(this.currentUser.username);
        this.f.phone.patchValue(this.currentUser.phone);
        this.f.email.patchValue(this.currentUser.email);
    };
    UserComponent.prototype.getById = function (id) {
        var _this = this;
        this.userService.getById(id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).subscribe(function (user) {
            _this.currentUser = user;
            _this.initForm();
        });
    };
    UserComponent.prototype.onSubmit = function () {
        var _this = this;
        // stop here if form is invalid
        if (this.userForm.invalid) {
            return;
        }
        this.userService.update(this.currentUser._id, this.userForm.value)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])())
            .subscribe(function (data) {
            _this.router.navigate(['/table']);
        }, function (error) {
        });
    };
    UserComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./user.component.html */ "./src/app/user/user.component.html")
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _services__WEBPACK_IMPORTED_MODULE_4__["UserService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"]])
    ], UserComponent);
    return UserComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false,
    apiUrl: 'https://common-api-app.herokuapp.com'
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/worawit/ProjectCM/common-app/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map