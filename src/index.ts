import { doFetch } from "./helpers";
import { createAffiliateLinkFromUrl } from "./utility/create-affiliate-link-from-url";

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
  AdvertiserResponse,
  GetAllAdvertisersResponse,
} from "./types";

const API_HOST = `https://api.flexoffers.com`;

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
    const results = await doFetch<Domain[]>(url.toString(), {
      apiKey: API_KEY,
    });
    return results;
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
    const results = await doFetch<PromotionalCategory[]>(url.toString(), {
      apiKey: API_KEY,
    });
    return results;
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
    const results = await doFetch<AdvertiserTerm[]>(url.toString(), {
      apiKey: API_KEY,
    });
    return results;
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
    const applyResponse = await doFetch<ApplyResponse>(url.toString(), {
      apiKey: API_KEY,
    });
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
): Promise<{ results: Advertiser[] }> => {
  const url = new URL(`${API_HOST}/advertisers`);

  // Convert params object to URLSearchParams
  const queryParams = new URLSearchParams(params as Record<any, any>);
  url.search = queryParams.toString();

  try {
    const results = await doFetch<{ results: Advertiser[] }>(url.toString(), {
      apiKey: API_KEY,
    });

    return results;
  } catch (error: unknown) {
    console.error(`Failed to fetch advertisers: ${error}`);
    throw error;
  }
};

/**
 * Fetches a paginated list of ALL advertisers from the FlexOffers API. Coule be expensive. Use sparingly.
 * @param {AdvertisersQueryParams} params - The query parameters for the fetch operation.
 * @returns {Promise<Advertiser[]>} - A promise that resolves to an array of Advertiser objects.
 * @throws Will throw an error if the fetch operation fails.
 */
const getAllAdvertisers = async (
  params: AdvertisersQueryParams
): Promise<Advertiser[]> => {
  // Construct the URL for the API request
  const url = new URL(`${API_HOST}/advertisers`);
  // Convert params object to URLSearchParams

  // to go as fast as possible, we'll use Promise.all to fetch all pages in parallel.
  // first we'll need to know how many pages there are, so we'll fetch the first page.

  const queryParams = new URLSearchParams({
    page: 1,
    pageSize: 500,
    params,
  } as Record<string, any>);
  url.search = queryParams.toString();

  // First page here.
  const response = await doFetch<GetAllAdvertisersResponse>(url.toString(), {
    apiKey: API_KEY,
  });

  // Now we know how many pages there are, we can fetch them all in parallel.
  const pages = Array.from(
    { length: Math.ceil(response.totalCount / response.pageSize) }, // Dont forget we need to round this up so we catch the last page.
    (_, i) => i + 1
  );

  const pagePromises = pages.map((page) => {
    const queryParams = new URLSearchParams({
      page,
      pageSize: 500,
      params,
    } as Record<string, any>);
    url.search = queryParams.toString();

    return doFetch<GetAllAdvertisersResponse>(url.toString(), {
      apiKey: API_KEY,
    })
  });

  const allAdvertisers = await Promise.all(pagePromises).catch(
    (error: unknown) => {
      console.error(`Failed to fetch advertisers: ${error}`);
      throw error;
    }
  );

  // then assuming we've got all the pages, we can flatten the results and return them.

  const flattenedAdvertisers = allAdvertisers.flatMap((page) => page.results);
  return flattenedAdvertisers;
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
    const deeplinkResponse = await doFetch<DeeplinkResponse>(url.toString(), {
      apiKey: API_KEY,
    });
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
    const promotionalLinks = await doFetch<PromotionalLink[]>(url.toString(), {
      apiKey: API_KEY,
    });
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
    const promotionalLinks = await doFetch<PromotionalLink[]>(url.toString(), {
      apiKey: API_KEY,
    });
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
    const promotionalLinks = await doFetch<PromotionalLink[]>(url.toString(), {
      apiKey: API_KEY,
    });
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
    const promotionTypes = await doFetch<PromotionType[]>(url.toString(), {
      apiKey: API_KEY,
    });
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
      url.toString(),
      { apiKey: API_KEY }
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
    const advertisers = await doFetch<FeaturedAdvertiser[]>(url.toString(), {
      apiKey: API_KEY,
    });
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
    const advertisers = await doFetch<NewestAdvertiser[]>(url.toString(), {
      apiKey: API_KEY,
    });
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
      url.toString(),
      { apiKey: API_KEY }
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
    const productCatalogs = await doFetch<ProductCatalog[]>(url.toString(), {
      apiKey: API_KEY,
    });
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
    const catalogs = await doFetch<Catalog[]>(url.toString(), {
      apiKey: API_KEY,
    });
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
    const categories = await doFetch<Category[]>(url.toString(), {
      apiKey: API_KEY,
    });
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
    const productCount = await doFetch<ProductCount>(url.toString(), {
      apiKey: API_KEY,
    });
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
      { apiKey: API_KEY }
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
    const fullProducts = await doFetch<FullProduct[]>(url.toString(), {
      apiKey: API_KEY,
    });
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
    const product = await doFetch<FullProduct>(url.toString(), {
      apiKey: API_KEY,
    });
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
    const feeds = await doFetch<ProductFeed[]>(url.toString(), {
      apiKey: API_KEY,
    });
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
    const sales = await doFetch<Sale[]>(url.toString(), { apiKey: API_KEY });
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
    const paymentSummary = await doFetch<PaymentSummary[]>(url.toString(), {
      apiKey: API_KEY,
    });
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
    const paymentDetails = await doFetch<PaymentDetails[]>(url.toString(), {
      apiKey: API_KEY,
    });
    return paymentDetails;
  } catch (error) {
    console.error(`Failed to fetch payment details: ${error}`);
    throw error;
  }
};

// HELPERS

const getDomainFromUrl = (address: string): string | null => {
  try {
    // Use Node's url module to parse the address
    const parsedUrl = new URL(address);
    // Get the hostname from the parsed URL
    const hostname = parsedUrl.hostname;
    // Check if the hostname is null or is an empty string
    if (hostname === null || hostname.trim() === "") {
      return null;
    }
    return hostname;
  } catch (error) {
    // Log the error for debugging purposes
    console.error(`Failed to parse address: ${address}`, error);
    // Return null in case of error
    return null;
  }
};

const flexoffers = {
  init,
  advertisers: {
    getAdvertiserTerms,
    getAdvertisers,
    getAllAdvertisers,
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
  helpers: {
    getDomainFromUrl,
    createAffiliateLinkFromUrl,
  },
};

export default flexoffers;
