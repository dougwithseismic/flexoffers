// flexoffers-types.ts

export interface Domain {
  domainId: number;
  domainName: string;
  url: string;
}
export interface AdvertiserTerm {
  // Define the structure of AdvertiserTerm object based on API response
}

export interface ApplyResponse {
  // Define the structure of ApplyResponse object based on API response
}

export interface AdvertiserResponse {
  results: Advertiser[];
  [key: string]: any;
}

// advertiser-types.ts

export interface Advertiser {
  id: number;
  name?: string;
  domainUrl?: string;
  categoryIds?: string;
  Created?: string;
  ProgramStatus?: string;
  LastStatusUpdated?: string;
  applicationStatus?: string;
  applicationStatusId?: string;
  description?: string;
  payout?: string;
  imageUrl?: string;
  country?: string;
  SevenDayEpc?: string;
  ThirtyDayEpc?: string;
  ThreeMonthEpc?: string;
  ProductAdvertiser?: boolean;
  PromotionalAdvertiser?: boolean;
  allowsDeeplinking?: boolean;
  deeplinkURL?: string;
  flexLinks?: boolean;
}

export interface AdvertisersQueryParams {
  AdvertiserIds?: string;
  Name?: string;
  ProgramStatus?: string;
  ApplicationStatus?: string;
  categoryIds?: string;
  Country?: string;
  DeeplinkFlexlinks?: boolean;
  ProductAdvertiser?: boolean;
  AlphabetLetter?: string;
  sortColumn?: string;
  sortOrder?: string;
  Page?: number;
  pageSize?: number;
}

export interface DeeplinkResponse {
  domainID: number;
  adveriserID: number;
  deeplink: string;
  originalUrl: string;
  domainUrl: string;
}

export type CreateDeepLinkParams = {
  AdvertiserId: number;
  URL: string;
  fobs?: string;
  fobs2?: string;
  fobs3?: string;
  fobs4?: string;
  fobs5?: string;
};

export interface PromotionalCategory {
  id: number;
  name: string;
  subCategories: string;
  isDisabled: boolean;
  isDeleted: boolean;
}

/**
 * Type for the promotional links returned by the getCoupons function.
 */
export interface PromotionalLink {
  advertiserId: number;
  advertiser: string;
  linkId: string;
  linkType: string;
  linkName: string;
  linkDescription: string;
  promotionalTypes: string;
  linkUrl: string;
  couponCode: string;
  couponRestrictions: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
  bannerWidth: number;
  bannerHeight: number;
  htmlCode: string;
  allowsDeepLinking: boolean;
  categories: string;
  epc7d: number;
  epc3m: number;
}

export interface GetPromotionalLinksParams {
  linkIds?: string;
  advertiserIds?: string;
  advertiserName?: string;
  names?: string;
  categoryIds?: string;
  promotionalTypeIds?: string;
  startDate?: string;
  endDate?: string;
  couponsOnly?: boolean;
  deepOnly?: boolean;
  linkType?: string;
  bannerTypeIds?: string;
  minPercentageOff?: number;
  maxPercentageOff?: number;
  minDollarOff?: number;
  maxDollarOff?: number;
  alphabetletter?: string;
  page: number;
  pageSize: number;
  sortColumn?: string;
  sortOrder?: string;
}

export interface GetPromotionsCuratedParams {
  linkIds?: string;
  advertiserIds?: string;
  advertiserName?: string;
  names?: string;
  categoryIds?: string;
  promotionalTypeIds?: string;
  couponsOnly?: boolean;
  deepOnly?: boolean;
  minPercentageOff?: number;
  maxPercentageOff?: number;
  minDollarOff?: number;
  maxDollarOff?: number;
  alphabetletter?: string;
  page: number;
  pageSize: number;
  sortColumn?: string;
  sortOrder?: string;
}

/**
 * Type for the parameters accepted by the getCoupons function.
 */
export interface GetCouponsParams {
  advertiserIds?: string;
  names?: string;
  categoryIds?: string;
  promotionalTypeIds?: number;
  startDate?: string;
  endDate?: string;
  deepOnly?: boolean;
  linkType?: string;
  bannerTypeIds?: string;
  minPercentageOff?: number;
  maxPercentageOff?: number;
  minDollarOff?: number;
  maxDollarOff?: number;
  page: number; // required
  pageSize: number; // required
  sortColumn?: string;
  sortOrder?: string;
}

/**
 * Type for the parameters accepted by the getPromotionTypes function.
 */
export interface GetPromotionTypesParams {
  linkType?: string;
  applicationStatus?: string;
}

/**
 * Type for the promotion types returned by the getPromotionTypes function.
 */
export interface PromotionType {
  id: number;
  name: string;
}

/**
 * Type for the parameters accepted by the getPromotionTypesCountByAdvertiserId function.
 */
export interface GetPromotionTypesCountByAdvertiserIdParams {
  advertiserIds?: string;
  linkType?: string;
  applicationStatus?: string;
}

/**
 * Type for the promotion types returned by the getPromotionTypesCountByAdvertiserId function.
 */
export interface PromotionTypeCount {
  id: number;
  name: string;
}

/**
 * Type for the standard banner types returned by the getBannerTypes function.
 */
export interface BannerType {
  id: number;
  name: string;
  width: number;
  height: number;
}

/**
 * Type for the campaigns returned by the getCampaigns function.
 */
export interface Campaign {
  name: string;
  code: string;
  dateCreated: string; // Date in ISO format
}
/**
 * Type for the featured advertisers returned by the getFeaturedAdvertisers function.
 */
export interface FeaturedAdvertiser {
  name: string;
  code: string;
  dateCreated: string; // Date in ISO format
}

export interface GetFeaturedAdvertisersParams {
  advertiserIds?: string;
  name?: string;
  country?: string;
  page?: number;
  pageSize?: number;
  sortOrder?: string;
}

export interface GetNewestAdvertisersParams {
  page?: number;
  pageSize?: number;
  sortOrder?: string;
}

/**
 * Type for the newest advertisers returned by the getNewestAdvertisers function.
 */
export interface NewestAdvertiser {
  name: string;
  code: string;
  dateCreated: string; // Date in ISO format
}

export interface GetProductAdvertisersParams {
  name?: string;
  page?: number;
  pageSize?: number;
}

/**
 * Type for the advertisers returned by the getProductAdvertisers function.
 */
export interface ProductAdvertiser {
  aid: number;
  name: string;
  domainUrl: string;
  description: string;
  payout: string;
  imageUrl: string;
  country: string;
}

export interface GetProductCatalogsParams {
  aid: number; // This is a required field
}

/**
 * Type for the catalogs returned by the getProductCatalogs function.
 */
export interface ProductCatalog {
  cid: string;
  name: string;
  url: string;
  advertiser: string;
  currency: string;
}

export interface GetAllCatalogsParams {
  name?: string;
  page?: number;
  pageSize?: number;
}

/**
 * Type for the catalogs returned by the getAllCatalogs function.
 */
export interface Catalog {
  cid: string;
  name: string;
  url: string;
  advertiser: string;
  currency: string;
}

export interface GetProductCategoriesParams {
  catId?: number;
  cid?: string;
}

/**
 * Type for the categories returned by the getProductCategories function.
 */
export interface Category {
  id: number;
  name: string;
  parentId: number;
  fullName: string;
  actuallyPresent: boolean;
  productCount: number;
}

export interface GetProductCountParams {
  cid?: string;
  catId?: number;
  name?: string;
  manufacturer?: string;
  UPCorEANs?: string;
  MPN?: string;
  min_price?: number;
  max_price?: number;
  Gender?: string;
  Size?: string;
  Color?: string;
}

export type ProductCount = {
  result: number;
};

export interface GetShortProductDescriptionsParams {
  cid?: string;
  catId?: number;
  name?: string;
  manufacturer?: string;
  UPCorEANs?: string;
  MPN?: string;
  min_price?: number;
  max_price?: number;
  Gender?: string;
  Size?: string;
  Color?: string;
  page: number;
  pageSize: number;
}

export type ShortProductDescription = {
  pid: string;
  name: string;
  brand: string;
};

export interface FullProduct {
  pid: string;
  name: string;
  brand: string;
  cid: string;
  catalogName: string;
  aid: number;
  advertiserName: string;
  linkUrl: string;
  shortDescription: string;
  description: string;
  categoryId: number;
  category: string;
  imageUrl: string;
  price: number;
  priceCurrency: string;
  salePrice: number;
  finalPrice: number;
  isInStock: boolean;
  keywords: string;
  manufacturer: string;
  upcOrEan: string;
  mpn: string;
  sku: string;
  color: string;
  gender: string;
  size: string;
  deepLinkURL: string;
}

export interface GetFullProductsParams {
  cid?: string;
  catId?: number;
  name?: string;
  condition?: string;
  minDiscount?: string;
  maxDiscount?: string;
  isOnSale?: boolean;
  manufacturer?: string;
  upcOrEans?: string;
  mpn?: string;
  minPrice?: number;
  maxPrice?: number;
  priceCurrency?: string;
  gender?: string;
  size?: string;
  color?: string;
  country?: string;
  url?: string;
  page: number;
  pageSize: number;
  sortColumn?: string;
  sortOrder?: string;
}

export type GetProductParams = {
  pid: string;
  sortColumn?: string;
  sortOrder?: string;
};

export type ProductFeed = {
  programid: number;
  catId: string;
  downloadLink: string;
};

export type GetProductFeedsParams = {
  filetype: "CSV" | "XML";
};

export type Sale = {
  FLX_SalesId: number;
  categoryId: number;
  categoryName: string;
  productId: number;
  productName: string;
  domainId: number;
  domainName: string;
  accountId: number;
  tracking: string;
  subTracking: string;
  subId1: string;
  subId2: string;
  subId3: string;
  subId4: string;
  subId5: string;
  postedDate: string;
  clickId: number;
  clickDate: string;
  eventDate: string;
  lockingDate: string;
  orderNumber: string;
  orderStatus: string;
  currency: string;
  saleAmount: number;
  commission: number;
  id: number;
  ipaddress: string;
  isPaid: boolean;
  dtPaid: string;
};

export type GetSalesParams = {
  status?: string;
  reportType?: string;
  dateType?: string;
  adjustmentType?: string;
  startDate: string;
  endDate?: string;
  programID?: number;
  page: number;
  pageSize: number;
};

export type PaymentSummary = {
  paymentId: number;
  paymentDate: string;
  paymentMethod: string;
  referencecode: string;
  amount: number;
};

export type GetPaymentSummaryParams = {
  startDate?: string;
  endDate?: string;
  page: number;
  pageSize: number;
};

export type PaymentDetails = {
  paymentId: number;
  SaleId: string;
  dtPaid: string;
  clickDate: string;
  eventDate: string;
  postedDate: string;
  orderNumber: string;
  saleAmount: number;
  commission: number;
  programId: number;
  programName: string;
  productId: number;
  productName: string;
  domainId: number;
  domainName: string;
  flX_SalesId: number;
  transactionKey: string;
  type: string;
  subId1: string;
  subId2: string;
  subId3: string;
  subId4: string;
  subId5: string;
};

export type GetPaymentDetailsParams = {
  PaymentID: number;
  DomainIDs?: string;
  page: number;
  pageSize: number;
};

// Creating an affiliate link

export type ShortenedAdvertiser = {
  id: number | undefined;
  deeplinkURL: string | undefined;
  domainUrl: string | undefined;
  name: string | undefined;
};

export type CreateAffiliateLinkOptions = {
  fobs?: string;
  fobs2?: string;
  fobs3?: string;
  fobs4?: string;
  fobs5?: string;
};
