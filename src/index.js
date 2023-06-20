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
var helpers_1 = require("./helpers");
var API_HOST = "https://api.flexoffers.com";
var API_KEY;
var init = function (apiKey) {
    if (!apiKey) {
        throw new Error("FlexOffers: Check that you're passing your API key to init()");
    }
    API_KEY = apiKey;
    console.log("FlexOffers API initialized");
};
var doFetchWrapper = function (url, options) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // Check for an API key.
                if (!API_KEY) {
                    throw new Error("FlexOffers: Check that you're passing your API key to init()");
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, helpers_1.doFetch)(url, __assign({ apiKey: API_KEY }, options))];
            case 2:
                data = _a.sent();
                return [2 /*return*/, data];
            case 3:
                error_1 = _a.sent();
                console.error("Error Fetching: ", error_1);
                return [2 /*return*/, undefined];
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * Fetches domain details from the FlexOffers API.
 */
var getDomains = function () { return __awaiter(void 0, void 0, void 0, function () {
    var url, domains, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = new URL("".concat(API_HOST, "/domains"));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, doFetchWrapper(url.toString())];
            case 2:
                domains = _a.sent();
                return [2 /*return*/, domains];
            case 3:
                error_2 = _a.sent();
                console.error("Failed to fetch domains: ".concat(error_2));
                throw error_2;
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * Fetches categories from the FlexOffers API.
 */
var getCategories = function () { return __awaiter(void 0, void 0, void 0, function () {
    var url, categories, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = new URL("".concat(API_HOST, "/categories"));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, doFetchWrapper(url.toString())];
            case 2:
                categories = _a.sent();
                return [2 /*return*/, categories];
            case 3:
                error_3 = _a.sent();
                console.error("Failed to fetch categories: ".concat(error_3));
                throw error_3;
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * Fetches advertiser terms from the FlexOffers API.
 * @param {string} advertiserId - The ID of the advertiser whose terms to fetch.
 * @returns {Promise<AdvertiserTerm[]>} - A promise that resolves to an array of AdvertiserTerm objects.
 * @throws Will throw an error if the fetch operation fails.
 */
var getAdvertiserTerms = function (advertiserId) { return __awaiter(void 0, void 0, void 0, function () {
    var url, advertiserTerms, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = new URL("".concat(API_HOST, "/advertisers/advertiserTerms"));
                url.searchParams.append("advertiserId", advertiserId);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, doFetchWrapper(url.toString())];
            case 2:
                advertiserTerms = _a.sent();
                return [2 /*return*/, advertiserTerms];
            case 3:
                error_4 = _a.sent();
                console.error("Failed to fetch advertiser terms for advertiserId=".concat(advertiserId, ": ").concat(error_4));
                throw error_4;
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * Applies to an advertiser using the FlexOffers API.
 * @param {string} advertiserId - The ID of the advertiser to apply to.
 * @returns {Promise<ApplyResponse>} - A promise that resolves to an ApplyResponse object.
 * @throws Will throw an error if the fetch operation fails.
 */
var applyToAdvertiser = function (advertiserId) { return __awaiter(void 0, void 0, void 0, function () {
    var url, applyResponse, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = new URL("".concat(API_HOST, "/advertisers/applyAdvertiser"));
                url.searchParams.append("advertiserId", advertiserId);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, doFetchWrapper(url.toString())];
            case 2:
                applyResponse = _a.sent();
                return [2 /*return*/, applyResponse];
            case 3:
                error_5 = _a.sent();
                console.error("Failed to apply to advertiser with advertiserId=".concat(advertiserId, ": ").concat(error_5));
                throw error_5;
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * Fetches a list of advertisers from the FlexOffers API.
 * @param {AdvertisersQueryParams} params - The query parameters for the fetch operation.
 * @returns {Promise<Advertiser[]>} - A promise that resolves to an array of Advertiser objects.
 * @throws Will throw an error if the fetch operation fails.
 */
var getAdvertisers = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var url, queryParams, advertisers, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = new URL("".concat(API_HOST, "/advertisers"));
                queryParams = new URLSearchParams(params);
                url.search = queryParams.toString();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, doFetchWrapper(url.toString())];
            case 2:
                advertisers = _a.sent();
                return [2 /*return*/, advertisers];
            case 3:
                error_6 = _a.sent();
                console.error("Failed to fetch advertisers: ".concat(error_6));
                throw error_6;
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * Creates a deeplink for a given URL and advertiser ID.
 * @param {CreateDeepLinkParams} params Query parameters for creating a deeplink.
 * @returns {Promise<DeeplinkResponse>} Deeplink response object.
 */
var createDeepLink = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var url, queryParams, deeplinkResponse, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = new URL("".concat(API_HOST, "/deeplink"));
                queryParams = new URLSearchParams(params);
                url.search = queryParams.toString();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, doFetchWrapper(url.toString())];
            case 2:
                deeplinkResponse = _a.sent();
                return [2 /*return*/, deeplinkResponse];
            case 3:
                error_7 = _a.sent();
                console.error("Failed to create deeplink: ".concat(error_7));
                throw error_7;
            case 4: return [2 /*return*/];
        }
    });
}); };
var getPromotionalLinks = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var url, queryParams, promotionalLinks, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = new URL("".concat(API_HOST, "/promotions"));
                queryParams = new URLSearchParams(params);
                url.search = queryParams.toString();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, doFetchWrapper(url.toString())];
            case 2:
                promotionalLinks = _a.sent();
                return [2 /*return*/, promotionalLinks];
            case 3:
                error_8 = _a.sent();
                console.error("Failed to retrieve promotional links: ".concat(error_8));
                throw error_8;
            case 4: return [2 /*return*/];
        }
    });
}); };
var getPromotionsCurated = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var url, queryParams, promotionalLinks, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = new URL("".concat(API_HOST, "/promotionsCurated"));
                queryParams = new URLSearchParams(params);
                url.search = queryParams.toString();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, doFetchWrapper(url.toString())];
            case 2:
                promotionalLinks = _a.sent();
                return [2 /*return*/, promotionalLinks];
            case 3:
                error_9 = _a.sent();
                console.error("Failed to retrieve curated promotional links: ".concat(error_9));
                throw error_9;
            case 4: return [2 /*return*/];
        }
    });
}); };
var getCoupons = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var url, queryParams, promotionalLinks, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = new URL("".concat(API_HOST, "/coupons"));
                queryParams = new URLSearchParams(params);
                url.search = queryParams.toString();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, doFetchWrapper(url.toString())];
            case 2:
                promotionalLinks = _a.sent();
                return [2 /*return*/, promotionalLinks];
            case 3:
                error_10 = _a.sent();
                console.error("Failed to retrieve coupons: ".concat(error_10));
                throw error_10;
            case 4: return [2 /*return*/];
        }
    });
}); };
var getPromotionTypes = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var url, queryParams, promotionTypes, error_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = new URL("".concat(API_HOST, "/promotionTypes"));
                queryParams = new URLSearchParams(params);
                url.search = queryParams.toString();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, doFetchWrapper(url.toString())];
            case 2:
                promotionTypes = _a.sent();
                return [2 /*return*/, promotionTypes];
            case 3:
                error_11 = _a.sent();
                console.error("Failed to fetch promotion types: ".concat(error_11));
                throw error_11;
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * Fetches promotion types and their counts from the FlexOffers API.
 * @param params Query parameters for retrieving promotion types count.
 */
var getPromotionTypesCountByAdvertiserId = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var url, queryParams, promotionTypesCount, error_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = new URL("".concat(API_HOST, "/promotionTypes/getCountByAdvertiserId"));
                queryParams = new URLSearchParams(params);
                url.search = queryParams.toString();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, doFetchWrapper(url.toString())];
            case 2:
                promotionTypesCount = _a.sent();
                return [2 /*return*/, promotionTypesCount];
            case 3:
                error_12 = _a.sent();
                console.error("Failed to fetch promotion types count: ".concat(error_12));
                throw error_12;
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * Fetches standard banner types from the FlexOffers API.
 */
var getBannerTypes = function () { return __awaiter(void 0, void 0, void 0, function () {
    var url, bannerTypes, error_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "".concat(API_HOST, "/bannerTypes");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, doFetchWrapper(url)];
            case 2:
                bannerTypes = _a.sent();
                return [2 /*return*/, bannerTypes];
            case 3:
                error_13 = _a.sent();
                console.error("Failed to fetch banner types: ".concat(error_13));
                throw error_13;
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * Fetches all campaigns created by the publisher from the FlexOffers API.
 */
var getCampaigns = function () { return __awaiter(void 0, void 0, void 0, function () {
    var url, campaigns, error_14;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "".concat(API_HOST, "/campaigns");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, doFetchWrapper(url)];
            case 2:
                campaigns = _a.sent();
                return [2 /*return*/, campaigns];
            case 3:
                error_14 = _a.sent();
                console.error("Failed to fetch campaigns: ".concat(error_14));
                throw error_14;
            case 4: return [2 /*return*/];
        }
    });
}); };
var getFeaturedAdvertisers = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var url, queryParams, advertisers, error_15;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = new URL("".concat(API_HOST, "/featuredadvertisers"));
                queryParams = new URLSearchParams(params);
                url.search = queryParams.toString();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, doFetchWrapper(url.toString())];
            case 2:
                advertisers = _a.sent();
                return [2 /*return*/, advertisers];
            case 3:
                error_15 = _a.sent();
                console.error("Failed to fetch featured advertisers: ".concat(error_15));
                throw error_15;
            case 4: return [2 /*return*/];
        }
    });
}); };
var getNewestAdvertisers = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var url, queryParams, advertisers, error_16;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = new URL("".concat(API_HOST, "/newestadvertisers"));
                queryParams = new URLSearchParams(params);
                url.search = queryParams.toString();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, doFetchWrapper(url.toString())];
            case 2:
                advertisers = _a.sent();
                return [2 /*return*/, advertisers];
            case 3:
                error_16 = _a.sent();
                console.error("Failed to fetch newest advertisers: ".concat(error_16));
                throw error_16;
            case 4: return [2 /*return*/];
        }
    });
}); };
var getProductAdvertisers = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var url, queryParams, productAdvertisers, error_17;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = new URL("".concat(API_HOST, "/products/advertisers"));
                queryParams = new URLSearchParams(params);
                url.search = queryParams.toString();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, doFetchWrapper(url.toString())];
            case 2:
                productAdvertisers = _a.sent();
                return [2 /*return*/, productAdvertisers];
            case 3:
                error_17 = _a.sent();
                console.error("Failed to fetch product advertisers: ".concat(error_17));
                throw error_17;
            case 4: return [2 /*return*/];
        }
    });
}); };
var getProductCatalogs = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var url, queryParams, productCatalogs, error_18;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = new URL("".concat(API_HOST, "/products/catalogs"));
                queryParams = new URLSearchParams(params);
                url.search = queryParams.toString();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, doFetchWrapper(url.toString())];
            case 2:
                productCatalogs = _a.sent();
                return [2 /*return*/, productCatalogs];
            case 3:
                error_18 = _a.sent();
                console.error("Failed to fetch product catalogs: ".concat(error_18));
                throw error_18;
            case 4: return [2 /*return*/];
        }
    });
}); };
var getAllCatalogs = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var url, queryParams, catalogs, error_19;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = new URL("".concat(API_HOST, "/products/allcatalogs"));
                queryParams = new URLSearchParams(params);
                url.search = queryParams.toString();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, doFetchWrapper(url.toString())];
            case 2:
                catalogs = _a.sent();
                return [2 /*return*/, catalogs];
            case 3:
                error_19 = _a.sent();
                console.error("Failed to fetch all catalogs: ".concat(error_19));
                throw error_19;
            case 4: return [2 /*return*/];
        }
    });
}); };
var getProductCategories = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var url, queryParams, categories, error_20;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = new URL("".concat(API_HOST, "/products/categories"));
                queryParams = new URLSearchParams(params);
                url.search = queryParams.toString();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, doFetchWrapper(url.toString())];
            case 2:
                categories = _a.sent();
                return [2 /*return*/, categories];
            case 3:
                error_20 = _a.sent();
                console.error("Failed to fetch product categories: ".concat(error_20));
                throw error_20;
            case 4: return [2 /*return*/];
        }
    });
}); };
var getProductCount = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var url, queryParams, productCount, error_21;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = new URL("".concat(API_HOST, "/products/count"));
                queryParams = new URLSearchParams(params);
                url.search = queryParams.toString();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, doFetchWrapper(url.toString())];
            case 2:
                productCount = _a.sent();
                return [2 /*return*/, productCount];
            case 3:
                error_21 = _a.sent();
                console.error("Failed to fetch product count: ".concat(error_21));
                throw error_21;
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * Retrieves a list of products with minimal information
 * (Product Id, name and brand) for products from advertisers
 * that have been approved for your domain given the catalog Id.
 * @param {GetShortProductDescriptionsParams} params
 * @returns {Promise<ShortProductDescription[]>}
 */
var getProducts = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var url, queryParams, shortProductDescriptions, error_22;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = new URL("".concat(API_HOST, "/products"));
                queryParams = new URLSearchParams(params);
                url.search = queryParams.toString();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, doFetchWrapper(url.toString(), { headers: { Authorization: "BEARER ".concat(API_KEY) } })];
            case 2:
                shortProductDescriptions = _a.sent();
                return [2 /*return*/, shortProductDescriptions];
            case 3:
                error_22 = _a.sent();
                console.error("Failed to fetch short product descriptions: ".concat(error_22));
                throw error_22;
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * Retrieves a list of products with full information
 * for products from advertisers that have been approved
 * for your domain given the catalog Id.
 * @param {GetFullProductsParams} params
 * @returns {Promise<FullProduct[]>}
 */
var getFullProducts = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var url, queryParams, fullProducts, error_23;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = new URL("".concat(API_HOST, "/products/full"));
                queryParams = new URLSearchParams(params);
                url.search = queryParams.toString();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, doFetchWrapper(url.toString())];
            case 2:
                fullProducts = _a.sent();
                return [2 /*return*/, fullProducts];
            case 3:
                error_23 = _a.sent();
                console.error("Failed to fetch full product descriptions: ".concat(error_23));
                throw error_23;
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * Retrieves a full description of a product.
 * @param {GetProductParams} params
 * @returns {Promise<FullProduct>}
 */
var getProduct = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var url, queryParams, product, error_24;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = new URL("".concat(API_HOST, "/products/product"));
                queryParams = new URLSearchParams(params);
                url.search = queryParams.toString();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, doFetchWrapper(url.toString())];
            case 2:
                product = _a.sent();
                return [2 /*return*/, product];
            case 3:
                error_24 = _a.sent();
                console.error("Failed to fetch product description: ".concat(error_24));
                throw error_24;
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * Retrieve download links for all the subscribed feeds.
 * @param {GetProductFeedsParams} params
 * @returns {Promise<ProductFeed[]>}
 */
var getProductFeeds = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var url, queryParams, feeds, error_25;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = new URL("".concat(API_HOST, "/products/productfeeds"));
                queryParams = new URLSearchParams(params);
                url.search = queryParams.toString();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, doFetchWrapper(url.toString())];
            case 2:
                feeds = _a.sent();
                return [2 /*return*/, feeds];
            case 3:
                error_25 = _a.sent();
                console.error("Failed to fetch product feeds: ".concat(error_25));
                throw error_25;
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * Retrieves a list of sales completed over the specified date range.
 * @param {GetSalesParams} params
 * @returns {Promise<Sale[]>}
 */
var getSales = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var url, queryParams, sales, error_26;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = new URL("".concat(API_HOST, "/allsales"));
                queryParams = new URLSearchParams(params);
                url.search = queryParams.toString();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, doFetchWrapper(url.toString())];
            case 2:
                sales = _a.sent();
                return [2 /*return*/, sales];
            case 3:
                error_26 = _a.sent();
                console.error("Failed to fetch sales: ".concat(error_26));
                throw error_26;
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * Retrieve payment summary information of all invoices paid to the entire account.
 * @param {GetPaymentSummaryParams} params
 * @returns {Promise<PaymentSummary[]>}
 */
var getPaymentSummary = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var url, queryParams, paymentSummary, error_27;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = new URL("".concat(API_HOST, "/payments/summary"));
                queryParams = new URLSearchParams(params);
                url.search = queryParams.toString();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, doFetchWrapper(url.toString())];
            case 2:
                paymentSummary = _a.sent();
                return [2 /*return*/, paymentSummary];
            case 3:
                error_27 = _a.sent();
                console.error("Failed to fetch payment summary: ".concat(error_27));
                throw error_27;
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * Retrieve detailed payment information by searching with the PaymentId.
 * @param {GetPaymentDetailsParams} params
 * @returns {Promise<PaymentDetails[]>}
 */
var getPaymentDetails = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var url, queryParams, paymentDetails, error_28;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = new URL("".concat(API_HOST, "/payments/details"));
                queryParams = new URLSearchParams(params);
                url.search = queryParams.toString();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, doFetchWrapper(url.toString())];
            case 2:
                paymentDetails = _a.sent();
                return [2 /*return*/, paymentDetails];
            case 3:
                error_28 = _a.sent();
                console.error("Failed to fetch payment details: ".concat(error_28));
                throw error_28;
            case 4: return [2 /*return*/];
        }
    });
}); };
var flexoffers = {
    init: init,
    advertisers: {
        getAdvertiserTerms: getAdvertiserTerms,
        getAdvertisers: getAdvertisers,
        getCampaigns: getCampaigns,
        getFeaturedAdvertisers: getFeaturedAdvertisers,
        getNewestAdvertisers: getNewestAdvertisers,
        getProductAdvertisers: getProductAdvertisers,
    },
    products: {
        getCategories: getCategories,
        getAllCatalogs: getAllCatalogs,
        getProductCount: getProductCount,
        getProducts: getProducts,
        getProductCategories: getProductCategories,
        getFullProducts: getFullProducts,
        getProductFeeds: getProductFeeds,
        getProduct: getProduct,
    },
    promotions: {
        getCoupons: getCoupons,
        getPromotionalLinks: getPromotionalLinks,
        getPromotionsCurated: getPromotionsCurated,
        getPromotionTypes: getPromotionTypes,
        getPromotionTypesCountByAdvertiserId: getPromotionTypesCountByAdvertiserId,
        getBannerTypes: getBannerTypes,
    },
    publisher: {
        getDomains: getDomains,
        getSales: getSales,
        getPaymentSummary: getPaymentSummary,
        getPaymentDetails: getPaymentDetails,
    },
    actions: {
        createDeepLink: createDeepLink,
        applyToAdvertiser: applyToAdvertiser,
    },
};
exports.default = flexoffers;
