# FlexOffers - A Fully Typed Wrapper For Monetizing With Affiliate

[![npm version](https://badge.fury.io/js/flexoffers-api.svg)](https://badge.fury.io/js/flexoffers-api)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Description

Looking for a lightweight wrapper for the FlexOffers API? Here it is! Flexoffers is a great platform for monetizing huge amounts of B2C traffic but as developers, we missing the DX to build these products quickly. I built this out of neccessity so I could ship and monetize products faster, and now I'm sharing so we can all make building affiliate products waaay easier.

Use this wrapper to monetize your traffic and build out products that help make life easier for everyone.

### Useful Links

[Want to chat? Connect with me on Twitter](https://twitter.com/dougiesilkstone)
[Sign up to Flex Offers - Affiliate Link](https://publisherpro.flexoffers.com/registration?RID=1275043)

## Installation

Use npm to install the package:

```bash
npm install flexoffers
```

## Usage

Firstly, you need to import the module and init with your API key.

```ts
import flexoffers from 'flexoffers'
flexoffers.init('YOUR_API_KEY')
```

### Examples

TODO: Here are examples of how to use each function in the FlexOffers API:

#### getFullProducts

Returns a full list of products available from flexoffers product feed.

```ts
const getProducts = async () => {
  const products = await flexoffers.products.getFullProducts({
    manufacturer: "vans",
    page: 1,
    pageSize: 20,
  });
  console.log(products);
  return products;
};
```

#### createAffiliateLinkFromUrl(url)

A one liner function that takes a URL and spits out a monetized link 🔥

```ts
  const affiliateLink = await flexoffers.helpers.createAffiliateLinkFromUrl(`https://www.vans.com/en-us/shoes-c00081`, { fobs: 'clickId_1', fobs2: 'clickId_2', fobs3: 'clickId_3', fobs4: 'clickId_4', fobs5: 'clickId_5'});
```

| Function                          | Description                                                                           |
|-----------------------------------|---------------------------------------------------------------------------------------|
| getDomains                        | Retrieves the domains registered in the FlexOffers account.                           |
| getAdvertiserTerms                | Fetches the terms of the advertisers available on the platform.                       |
| applyToAdvertiser                 | Allows the client to apply to an advertiser in FlexOffers.                            |
| getAdvertisers                    | Fetches a list of advertisers that match given parameters.                            |
| createDeepLink                    | Generates a deep link to a specific URL in an advertiser's website.                   |
| **createAffiliateLinkFromUrl**    | A powerful helper that takes a url string and returns a monetizable link.             |
| getCategories                     | Fetches all categories available in the FlexOffers platform.                          |
| getProductCount                   | Retrieves the number of products available based on provided parameters.              |
| getProducts                       | Fetches a list of products with minimal information (product id, name, brand).        |
| getFullProducts                   | Fetches a list of products with full information.                                    |
| getCoupons                        | Fetches a list of available coupons for an advertiser's products.                     |
| getPromotionalLinks               | Retrieves promotional links available for products from an advertiser.                |
| getPromotionsCurated              | Fetches a curated list of promotions available on the platform.                       |
| getProduct                        | Retrieves a full description of a product based on provided parameters.               |
| getPromotionTypes                 | Fetches all promotion types available in the FlexOffers platform.                     |
| getProductFeeds                   | Retrieves download links for all the subscribed feeds.                               |
| getPromotionTypesCountByAdvertiserId | Fetches count of promotion types available for a particular advertiser id.         |
| getBannerTypes                    | Fetches available banner types for products from advertisers.                         |
| getSales                          | Fetches a list of sales completed over the specified date range.                      |
| getPaymentSummary                 | Retrieves payment summary information of all invoices paid to the entire account.     |
| getPaymentDetails                 | Fetches detailed payment information by searching with the PaymentId.                 |
| getCampaigns                      | Retrieves a list of all available campaigns.                                         |
| getFeaturedAdvertisers            | Fetches a list of featured advertisers on the platform.                               |
| getNewestAdvertisers              | Fetches a list of the newest advertisers on the platform.                             |
| getProductAdvertisers             | Retrieves a list of advertisers for a specific product.                               |
| getProductAdvertisers             | Retrieves a list of advertisers for a specific product.                               |

## Contributing

Contributions are welcome! Please read the [contributing guide](./CONTRIBUTING.md) to get started.

## License

This package is open source and available under the [MIT License](https://opensource.org/licenses/MIT)
