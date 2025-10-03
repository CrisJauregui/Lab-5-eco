const supabaseCli = require("../services/supabase.service");

const getAllProducts = async () => {
  const { data, error } = await supabaseCli.from("products").select("*");
  if (error) {
    console.error(error);
    return error;
  }
  return data;
};

const getCheapProducts = async () => {
  const { data, error } = await supabaseCli
    .from("products")
    .select("*")
    .lt("price", 50);

  if (error) {
    console.error(error);
    return error;
  }
  return data;
};

const getElectronicsProducts = async () => {
  const { data, error } = await supabaseCli
    .from("products")
    .select("*")
    .gt("price", 30)
    .eq("category", "Electronics");

  if (error) {
    console.error(error);
    return error;
  }
  return data;
};

const getProductsPaginated = async (page) => {
  const itemsPerPage = 10;
  const from = (page - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  const { data, error } = await supabaseCli
    .from("products")
    .select("*")
    .range(from, to);

  if (error) {
    console.error(error);
    return error;
  }
  return data;
};

const getProductsByUserId = async (userId) => {
  const { data, error } = await supabaseCli
    .from("products")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error(error);
    return error;
  }
  return data;
};

module.exports = {
  getAllProducts,
  getCheapProducts,
  getElectronicsProducts,
  getProductsPaginated,
  getProductsByUserId,
};