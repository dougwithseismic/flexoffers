"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doFetch = void 0;
var cross_fetch_1 = require("cross-fetch");
/**
 * An asynchronous function that wraps the native fetch function providing enhanced error handling.
 * Automatically includes 'Content-Type': 'application/json' header, but also allows other headers to be included optionally.
 *
 * @template T The expected return type.
 * @param {string} url The URL you want to fetch.
 * @param {RequestOptions} [options] The options you want to pass to the fetch function.
 * @returns {Promise<T>} Returns a Promise that resolves with the result of the fetch operation.
 * @throws {FetchError} Throws an error if there is a network, API or parsing error.
 */
var doFetch = function (url, options) { return __awaiter(void 0, void 0, void 0, function () {
    var requestOptions, response, error_1, errMsg, errBody, e_1, data, error_2;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                requestOptions = __assign(__assign({}, options), { headers: __assign({ "Content-Type": "application/json", apiKey: (_a = options === null || options === void 0 ? void 0 : options.apiKey) !== null && _a !== void 0 ? _a : "" }, options === null || options === void 0 ? void 0 : options.headers) });
                _d.label = 1;
            case 1:
                _d.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, cross_fetch_1.default)(url, requestOptions)];
            case 2:
                response = _d.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _d.sent();
                throw {
                    type: "fetch-error",
                    message: "Network error, unable to fetch ".concat(url, ": ").concat((_b = error_1 === null || error_1 === void 0 ? void 0 : error_1.message) !== null && _b !== void 0 ? _b : "Unknown error"),
                };
            case 4:
                if (!!response.ok) return [3 /*break*/, 9];
                errMsg = void 0;
                _d.label = 5;
            case 5:
                _d.trys.push([5, 7, , 8]);
                return [4 /*yield*/, response.json()];
            case 6:
                errBody = (_d.sent());
                errMsg = errBody.error || response.statusText;
                return [3 /*break*/, 8];
            case 7:
                e_1 = _d.sent();
                errMsg = response.statusText;
                return [3 /*break*/, 8];
            case 8: throw {
                type: "api-error",
                message: "".concat(response.status, " - ").concat(errMsg),
                error: response,
            };
            case 9:
                _d.trys.push([9, 11, , 12]);
                return [4 /*yield*/, response.json()];
            case 10:
                data = (_d.sent());
                return [3 /*break*/, 12];
            case 11:
                error_2 = _d.sent();
                throw {
                    type: "parsing-error",
                    message: "Parsing error, could not parse fetch response from ".concat(url, ": ").concat((_c = error_2 === null || error_2 === void 0 ? void 0 : error_2.message) !== null && _c !== void 0 ? _c : "Unknown error"),
                };
            case 12: return [2 /*return*/, data];
        }
    });
}); };
exports.doFetch = doFetch;
// Example Usage
/*
// GET request
try {
  const data = await doFetch<any>('https://api.example.com/resource');
  console.log(data);
} catch (error: unknown) {
  const err = error as FetchError;
  console.error(`GET Error: ${err.message}`);
}

// POST request
try {
  const postData = { key: 'value' };
  const data = await doFetch<any>('https://api.example.com/resource', {
    method: 'POST',
    body: JSON.stringify(postData),
  });
  console.log(data);
} catch (error: unknown) {
  const err = error as FetchError;
  console.error(`POST Error: ${err.message}`);
}

// PUT request
try {
  const putData = { key: 'newValue' };
  const data = await doFetch<any>('https://api.example.com/resource/1', {
    method: 'PUT',
    body: JSON.stringify(putData),
  });
  console.log(data);
} catch (error: unknown) {
  const err = error as FetchError;
  console.error(`PUT Error: ${err.message}`);
}

// DELETE request
try {
  const data = await doFetch<any>('https://api.example.com/resource/1', {
    method: 'DELETE',
  });
  console.log(data);
} catch (error: unknown) {
  const err = error as FetchError;
  console.error(`DELETE Error: ${err.message}`);
}
*/
