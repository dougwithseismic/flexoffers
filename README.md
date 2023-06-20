# FlexOffers API Wrapper

[![npm version](https://badge.fury.io/js/flexoffers-api.svg)](https://badge.fury.io/js/flexoffers-api)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Description

This package provides a simple and intuitive wrapper around the FlexOffers API, which should help make building affiliate products waaay easier. Flexoffers is a great platform for monetizing huge amounts of B2C traffic but as developers, we missing the DX to build these products quickly. Here's my contribution to a platform I want to see succeed.

[Connect with me on Twitter](https://twitter.com/dougiesilkstone)

## Installation

Use npm to install the package:

```bash
npm install flexoffers-api
```

## Usage

Firstly, you need to import the module and create an instance of the FlexOffers class.

```ts
const FlexOffers = require('flexoffers-api');
const flexoffers = new FlexOffers({ api_key: 'YOUR_API_KEY' });
```

Here are examples of how to use each function in the FlexOffers API:

### `getDomains()`

This method fetches all domains registered to your FlexOffers account.

#### Example

```ts
const domains = await flexoffers.getDomains();
console.log(domains);
```

| Function                          | Description                                                                           |
|-----------------------------------|---------------------------------------------------------------------------------------|
| getDomains                        | Retrieves the domains registered in the FlexOffers account.                           |
| getAdvertiserTerms                | Fetches the terms of the advertisers available on the platform.                       |
| applyToAdvertiser                 | Allows the client to apply to an advertiser in FlexOffers.                            |
| getAdvertisers                    | Fetches a list of advertisers that match given parameters.                            |
| createDeepLink                    | Generates a deep link to a specific URL in an advertiser's website.                   |
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

## Contributing

Contributions are welcome! Please read the [contributing guide](./CONTRIBUTING.md) to get started.

## License

This package is open source and available under the [MIT License](https://opensource.org/licenses/MIT).

```

This will be continued for each function with the relevant example. It's also a good practice to include a contributing guide in your repository if you're looking for contributions from the community.
