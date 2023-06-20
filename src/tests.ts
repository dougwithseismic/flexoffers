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

flexoffers.init("620e8c6d-26bc-4db5-b75d-dfc527770510");
getProducts();
