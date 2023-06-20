import { doFetch } from "./helpers";

import {
  Domain,
  AdvertiserTerm,
  ApplyResponse,
  Advertiser,
  AdvertisersQueryParams,
  CreateDeepLinkParams,
  DeeplinkResponse,
  GetPromotionalLinksParams,
  PromotionalLink,
  GetPromotionsCuratedParams,
  PromotionType,
  GetPromotionTypesParams,
  GetPromotionTypesCountByAdvertiserIdParams,
  PromotionTypeCount,
  GetFeaturedAdvertisersParams,
  FeaturedAdvertiser,
  PromotionalCategory,
  BannerType,
  Campaign,
  Catalog,
  Category,
  FullProduct,
  GetCouponsParams,
  GetFullProductsParams,
  GetNewestAdvertisersParams,
  GetPaymentDetailsParams,
  GetPaymentSummaryParams,
  GetProductCatalogsParams,
  GetProductCategoriesParams,
  GetProductCountParams,
  GetProductFeedsParams,
  GetProductParams,
  GetSalesParams,
  GetShortProductDescriptionsParams,
  NewestAdvertiser,
  PaymentDetails,
  PaymentSummary,
  ProductAdvertiser,
  ProductCatalog,
  ProductCount,
  ProductFeed,
  Sale,
  ShortProductDescription,
  GetProductAdvertisersParams,
  GetAllCatalogsParams,
} from "./types";

const API_HOST = `https://api.flexoffers.com/`;

let API_KEY: string | undefined;

const init = (apiKey: string): void => {
  if (!apiKey) {
    throw new Error(
      "FlexOffers: Check that you're passing your API key to init()"
    );
  }

  API_KEY = apiKey;
};
/**
 * Fetches domain details from the FlexOffers API.
 */
const getDomains = async (): Promise<Domain[]> => {
  const url = new URL(`${API_HOST}/domains`);

  try {
    const domains = await doFetch<Domain[]>(url.toString());
    return domains;
  } catch (error: unknown) {
    console.error(`Failed to fetch domains: ${error}`);
    throw error;
  }
};
/**
 * Fetches categories from the FlexOffers API.
 */
const getCategories = async (): Promise<PromotionalCategory[]> => {
  const url = new URL(`${API_HOST}/categories`);

  try {
    const categories = await doFetch<PromotionalCategory[]>(url.toString());
    return categories;
  } catch (error) {
    console.error(`Failed to fetch categories: ${error}`);
    throw error;
  }
};

/**
 * Fetches advertiser terms from the FlexOffers API.
 * @param {string} advertiserId - The ID of the advertiser whose terms to fetch.
 * @returns {Promise<AdvertiserTerm[]>} - A promise that resolves to an array of AdvertiserTerm objects.
 * @throws Will throw an error if the fetch operation fails.
 */
const getAdvertiserTerms = async (
  advertiserId: string
): Promise<AdvertiserTerm[]> => {
  const url = new URL(`${API_HOST}/advertisers/advertiserTerms`);
  url.searchParams.append("advertiserId", advertiserId);

  try {
    const advertiserTerms = await doFetch<AdvertiserTerm[]>(url.toString());
    return advertiserTerms;
  } catch (error) {
    console.error(
      `Failed to fetch advertiser terms for advertiserId=${advertiserId}: ${error}`
    );
    throw error;
  }
};

/**
 * Applies to an advertiser using the FlexOffers API.
 * @param {string} advertiserId - The ID of the advertiser to apply to.
 * @returns {Promise<ApplyResponse>} - A promise that resolves to an ApplyResponse object.
 * @throws Will throw an error if the fetch operation fails.
 */
const applyToAdvertiser = async (
  advertiserId: string
): Promise<ApplyResponse> => {
  const url = new URL(`${API_HOST}/advertisers/applyAdvertiser`);
  url.searchParams.append("advertiserId", advertiserId);

  try {
    const applyResponse = await doFetch<ApplyResponse>(url.toString());
    return applyResponse;
  } catch (error) {
    console.error(
      `Failed to apply to advertiser with advertiserId=${advertiserId}: ${error}`
    );
    throw error;
  }
};

/**
 * Fetches a list of advertisers from the FlexOffers API.
 * @param {AdvertisersQueryParams} params - The query parameters for the fetch operation.
 * @returns {Promise<Advertiser[]>} - A promise that resolves to an array of Advertiser objects.
 * @throws Will throw an error if the fetch operation fails.
 */
const getAdvertisers = async (
  params: AdvertisersQueryParams
): Promise<Advertiser[]> => {
  const url = new URL(`${API_HOST}/advertisers`);

  // Convert params object to URLSearchParams
  const queryParams = new URLSearchParams(params as Record<any, any>);
  url.search = queryParams.toString();

  try {
    const advertisers = await doFetch<Advertiser[]>(url.toString());
    return advertisers;
  } catch (error: unknown) {
    console.error(`Failed to fetch advertisers: ${error}`);
    throw error;
  }
};

/**
 * Creates a deeplink for a given URL and advertiser ID.
 * @param {CreateDeepLinkParams} params Query parameters for creating a deeplink.
 * @returns {Promise<DeeplinkResponse>} Deeplink response object.
 */
const createDeepLink = async (
  params: CreateDeepLinkParams
): Promise<DeeplinkResponse> => {
  const url = new URL(`${API_HOST}/deeplink`);

  // Convert params object to URLSearchParams
  const queryParams = new URLSearchParams(params as Record<number, string>);
  url.search = queryParams.toString();

  try {
    const deeplinkResponse = await doFetch<DeeplinkResponse>(url.toString());
    return deeplinkResponse;
  } catch (error) {
    console.error(`Failed to create deeplink: ${error}`);
    throw error;
  }
};

const getPromotionalLinks = async (
  params: GetPromotionalLinksParams
): Promise<PromotionalLink[]> => {
  const url = new URL(`${API_HOST}/promotions`);

  // Convert params object to URLSearchParams
  const queryParams = new URLSearchParams(params as Record<any, any>);
  url.search = queryParams.toString();

  try {
    const promotionalLinks = await doFetch<PromotionalLink[]>(url.toString());
    return promotionalLinks;
  } catch (error) {
    console.error(`Failed to retrieve promotional links: ${error}`);
    throw error;
  }
};

const getPromotionsCurated = async (
  params: GetPromotionsCuratedParams
): Promise<PromotionalLink[]> => {
  const url = new URL(`${API_HOST}/promotionsCurated`);

  // Convert params object to URLSearchParams
  const queryParams = new URLSearchParams(params as Record<any, any>);
  url.search = queryParams.toString();

  try {
    const promotionalLinks = await doFetch<PromotionalLink[]>(url.toString());
    return promotionalLinks;
  } catch (error) {
    console.error(`Failed to retrieve curated promotional links: ${error}`);
    throw error;
  }
};

const getCoupons = async (
  params: GetCouponsParams
): Promise<PromotionalLink[]> => {
  const url = new URL(`${API_HOST}/coupons`);

  // Convert params object to URLSearchParams
  const queryParams = new URLSearchParams(params as Record<any, any>);
  url.search = queryParams.toString();

  try {
    const promotionalLinks = await doFetch<PromotionalLink[]>(url.toString());
    return promotionalLinks;
  } catch (error) {
    console.error(`Failed to retrieve coupons: ${error}`);
    throw error;
  }
};

const getPromotionTypes = async (
  params: GetPromotionTypesParams
): Promise<PromotionType[]> => {
  const url = new URL(`${API_HOST}/promotionTypes`);

  // Convert params object to URLSearchParams
  const queryParams = new URLSearchParams(params as Record<any, any>);
  url.search = queryParams.toString();

  try {
    const promotionTypes = await doFetch<PromotionType[]>(url.toString());
    return promotionTypes;
  } catch (error) {
    console.error(`Failed to fetch promotion types: ${error}`);
    throw error;
  }
};

/**
 * Fetches promotion types and their counts from the FlexOffers API.
 * @param params Query parameters for retrieving promotion types count.
 */
const getPromotionTypesCountByAdvertiserId = async (
  params: GetPromotionTypesCountByAdvertiserIdParams
): Promise<PromotionTypeCount[]> => {
  const url = new URL(`${API_HOST}/promotionTypes/getCountByAdvertiserId`);

  // Convert params object to URLSearchParams
  const queryParams = new URLSearchParams(params as Record<any, any>);
  url.search = queryParams.toString();

  try {
    const promotionTypesCount = await doFetch<PromotionTypeCount[]>(
      url.toString()
    );
    return promotionTypesCount;
  } catch (error) {
    console.error(`Failed to fetch promotion types count: ${error}`);
    throw error;
  }
};

/**
 * Fetches standard banner types from the FlexOffers API.
 */
const getBannerTypes = async (): Promise<BannerType[]> => {
  const url = `${API_HOST}/bannerTypes`;

  try {
    const bannerTypes = await doFetch<BannerType[]>(url);
    return bannerTypes;
  } catch (error) {
    console.error(`Failed to fetch banner types: ${error}`);
    throw error;
  }
};

/**
 * Fetches all campaigns created by the publisher from the FlexOffers API.
 */
const getCampaigns = async (): Promise<Campaign[]> => {
  const url = `${API_HOST}/campaigns`;

  try {
    const campaigns = await doFetch<Campaign[]>(url);
    return campaigns;
  } catch (error) {
    console.error(`Failed to fetch campaigns: ${error}`);
    throw error;
  }
};

const getFeaturedAdvertisers = async (
  params: GetFeaturedAdvertisersParams
): Promise<FeaturedAdvertiser[]> => {
  const url = new URL(`${API_HOST}/featuredadvertisers`);

  // Convert params object to URLSearchParams
  const queryParams = new URLSearchParams(params as Record<any, any>);
  url.search = queryParams.toString();

  try {
    const advertisers = await doFetch<FeaturedAdvertiser[]>(url.toString());
    return advertisers;
  } catch (error) {
    console.error(`Failed to fetch featured advertisers: ${error}`);
    throw error;
  }
};

const getNewestAdvertisers = async (
  params: GetNewestAdvertisersParams
): Promise<NewestAdvertiser[]> => {
  const url = new URL(`${API_HOST}/newestadvertisers`);

  // Convert params object to URLSearchParams
  const queryParams = new URLSearchParams(params as Record<any, any>);
  url.search = queryParams.toString();

  try {
    const advertisers = await doFetch<NewestAdvertiser[]>(url.toString());
    return advertisers;
  } catch (error) {
    console.error(`Failed to fetch newest advertisers: ${error}`);
    throw error;
  }
};

const getProductAdvertisers = async (
  params: GetProductAdvertisersParams
): Promise<ProductAdvertiser[]> => {
  const url = new URL(`${API_HOST}/products/advertisers`);

  // Convert params object to URLSearchParams
  const queryParams = new URLSearchParams(params as Record<any, any>);
  url.search = queryParams.toString();

  try {
    const productAdvertisers = await doFetch<ProductAdvertiser[]>(
      url.toString()
    );
    return productAdvertisers;
  } catch (error) {
    console.error(`Failed to fetch product advertisers: ${error}`);
    throw error;
  }
};

const getProductCatalogs = async (
  params: GetProductCatalogsParams
): Promise<ProductCatalog[]> => {
  const url = new URL(`${API_HOST}/products/catalogs`);

  // Convert params object to URLSearchParams
  const queryParams = new URLSearchParams(params as Record<any, any>);
  url.search = queryParams.toString();

  try {
    const productCatalogs = await doFetch<ProductCatalog[]>(url.toString());
    return productCatalogs;
  } catch (error) {
    console.error(`Failed to fetch product catalogs: ${error}`);
    throw error;
  }
};

const getAllCatalogs = async (
  params: GetAllCatalogsParams
): Promise<Catalog[]> => {
  const url = new URL(`${API_HOST}/products/allcatalogs`);

  // Convert params object to URLSearchParams
  const queryParams = new URLSearchParams(params as Record<any, any>);
  url.search = queryParams.toString();

  try {
    const catalogs = await doFetch<Catalog[]>(url.toString());
    return catalogs;
  } catch (error) {
    console.error(`Failed to fetch all catalogs: ${error}`);
    throw error;
  }
};

const getProductCategories = async (
  params: GetProductCategoriesParams
): Promise<Category[]> => {
  const url = new URL(`${API_HOST}/products/categories`);

  // Convert params object to URLSearchParams
  const queryParams = new URLSearchParams(params as Record<any, any>);
  url.search = queryParams.toString();

  try {
    const categories = await doFetch<Category[]>(url.toString());
    return categories;
  } catch (error) {
    console.error(`Failed to fetch product categories: ${error}`);
    throw error;
  }
};

const getProductCount = async (
  params: GetProductCountParams
): Promise<ProductCount> => {
  const url = new URL(`${API_HOST}/products/count`);

  // Convert params object to URLSearchParams
  const queryParams = new URLSearchParams(params as Record<any, any>);
  url.search = queryParams.toString();

  try {
    const productCount = await doFetch<ProductCount>(url.toString());
    return productCount;
  } catch (error) {
    console.error(`Failed to fetch product count: ${error}`);
    throw error;
  }
};

/**
 * Retrieves a list of products with minimal information
 * (Product Id, name and brand) for products from advertisers
 * that have been approved for your domain given the catalog Id.
 * @param {GetShortProductDescriptionsParams} params
 * @returns {Promise<ShortProductDescription[]>}
 */
const getProducts = async (
  params: GetShortProductDescriptionsParams
): Promise<ShortProductDescription[]> => {
  const url = new URL(`${API_HOST}/products`);

  // Convert params object to URLSearchParams
  const queryParams = new URLSearchParams(params as Record<any, any>);
  url.search = queryParams.toString();

  try {
    const shortProductDescriptions = await doFetch<ShortProductDescription[]>(
      url.toString(),
      { headers: { Authorization: `BEARER ${API_KEY}` } }
    );
    return shortProductDescriptions;
  } catch (error) {
    console.error(`Failed to fetch short product descriptions: ${error}`);
    throw error;
  }
};

/**
 * Retrieves a list of products with full information
 * for products from advertisers that have been approved
 * for your domain given the catalog Id.
 * @param {GetFullProductsParams} params
 * @returns {Promise<FullProduct[]>}
 */
const getFullProducts = async (
  params: GetFullProductsParams
): Promise<FullProduct[]> => {
  const url = new URL(`${API_HOST}/products/full`);

  // Convert params object to URLSearchParams
  const queryParams = new URLSearchParams(params as Record<any, any>);
  url.search = queryParams.toString();

  try {
    const fullProducts = await doFetch<FullProduct[]>(url.toString());
    return fullProducts;
  } catch (error) {
    console.error(`Failed to fetch full product descriptions: ${error}`);
    throw error;
  }
};

/**
 * Retrieves a full description of a product.
 * @param {GetProductParams} params
 * @returns {Promise<FullProduct>}
 */
const getProduct = async (params: GetProductParams): Promise<FullProduct> => {
  const url = new URL(`${API_HOST}/products/product`);

  // Convert params object to URLSearchParams
  const queryParams = new URLSearchParams(params as Record<any, any>);
  url.search = queryParams.toString();

  try {
    const product = await doFetch<FullProduct>(url.toString());
    return product;
  } catch (error) {
    console.error(`Failed to fetch product description: ${error}`);
    throw error;
  }
};

/**
 * Retrieve download links for all the subscribed feeds.
 * @param {GetProductFeedsParams} params
 * @returns {Promise<ProductFeed[]>}
 */
const getProductFeeds = async (
  params: GetProductFeedsParams
): Promise<ProductFeed[]> => {
  const url = new URL(`${API_HOST}/products/productfeeds`);

  // Convert params object to URLSearchParams
  const queryParams = new URLSearchParams(params as Record<any, any>);
  url.search = queryParams.toString();

  try {
    const feeds = await doFetch<ProductFeed[]>(url.toString());
    return feeds;
  } catch (error) {
    console.error(`Failed to fetch product feeds: ${error}`);
    throw error;
  }
};

/**
 * Retrieves a list of sales completed over the specified date range.
 * @param {GetSalesParams} params
 * @returns {Promise<Sale[]>}
 */
const getSales = async (params: GetSalesParams): Promise<Sale[]> => {
  const url = new URL(`${API_HOST}/allsales`);

  // Convert params object to URLSearchParams
  const queryParams = new URLSearchParams(params as Record<any, any>);
  url.search = queryParams.toString();

  try {
    const sales = await doFetch<Sale[]>(url.toString());
    return sales;
  } catch (error) {
    console.error(`Failed to fetch sales: ${error}`);
    throw error;
  }
};

/**
 * Retrieve payment summary information of all invoices paid to the entire account.
 * @param {GetPaymentSummaryParams} params
 * @returns {Promise<PaymentSummary[]>}
 */
const getPaymentSummary = async (
  params: GetPaymentSummaryParams
): Promise<PaymentSummary[]> => {
  const url = new URL(`${API_HOST}/payments/summary`);

  // Convert params object to URLSearchParams
  const queryParams = new URLSearchParams(params as Record<any, any>);
  url.search = queryParams.toString();

  try {
    const paymentSummary = await doFetch<PaymentSummary[]>(url.toString());
    return paymentSummary;
  } catch (error) {
    console.error(`Failed to fetch payment summary: ${error}`);
    throw error;
  }
};

/**
 * Retrieve detailed payment information by searching with the PaymentId.
 * @param {GetPaymentDetailsParams} params
 * @returns {Promise<PaymentDetails[]>}
 */
const getPaymentDetails = async (
  params: GetPaymentDetailsParams
): Promise<PaymentDetails[]> => {
  const url = new URL(`${API_HOST}/payments/details`);

  // Convert params object to URLSearchParams
  const queryParams = new URLSearchParams(params as Record<any, any>);
  url.search = queryParams.toString();

  try {
    const paymentDetails = await doFetch<PaymentDetails[]>(url.toString());
    return paymentDetails;
  } catch (error) {
    console.error(`Failed to fetch payment details: ${error}`);
    throw error;
  }
};



type FlexOffersAPI = {
    init: Function;
    advertisers: {
      getAdvertiserTerms: Function;
      getAdvertisers: Function;
      getCampaigns: Function;
      getFeaturedAdvertisers: Function;
      getNewestAdvertisers: Function;
      getProductAdvertisers: Function;
    };
    products: {
      getCategories: Function;
      getAllCatalogs: Function;
      getProductCount: Function;
      getProducts: Function;
      getProductCategories: Function;
      getFullProducts: Function;
      getProductFeeds: Function;
      getProduct: Function;
    };
    promotions: {
      getCoupons: Function;
      getPromotionalLinks: Function;
      getPromotionsCurated: Function;
      getPromotionTypes: Function;
      getPromotionTypesCountByAdvertiserId: Function;
      getBannerTypes: Function;
    };
    publisher: {
      getDomains: Function;
      getSales: Function;
      getPaymentSummary: Function;
      getPaymentDetails: Function;
    };
    actions: {
      createDeepLink: Function;
      applyToAdvertiser: Function;
    };
  };
  

const flexoffers: FlexOffersAPI = {
  init,
  advertisers: {
    getAdvertiserTerms,
    getAdvertisers,
    getCampaigns,
    getFeaturedAdvertisers,
    getNewestAdvertisers,
    getProductAdvertisers,
  },
  products: {
    getCategories,
    getAllCatalogs,
    getProductCount,
    getProducts,
    getProductCategories,
    getFullProducts,
    getProductFeeds,
    getProduct,
  },
  promotions: {
    getCoupons,
    getPromotionalLinks,
    getPromotionsCurated,
    getPromotionTypes,
    getPromotionTypesCountByAdvertiserId,
    getBannerTypes,
  },

  publisher: {
    getDomains,
    getSales,
    getPaymentSummary,
    getPaymentDetails,
  },

  actions: {
    createDeepLink,
    applyToAdvertiser,
  },
};

export default flexoffers;
