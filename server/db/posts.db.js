const supabaseCli = require("../services/supabase.service");

const searchPostsByTitle = async (title) => {
  const { data, error } = await supabaseCli
    .from("posts")
    .select("*")
    .ilike("title", `%${title}%`);

  if (error) {
    console.error(error);
    return error;
  }
  return data;
};

module.exports = {
  searchPostsByTitle,
};