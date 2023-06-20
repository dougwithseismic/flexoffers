import flexoffers from ".";

const getProducts = async () => {
  const params = {
    page: 1,
    pageSize: 20,
  };

  const products = await flexoffers.products
    .getProducts(params)
    .catch((error: unknown) => {
      console.error(error);
    });
  console.log(products);
};

flexoffers.init("");
getProducts();
