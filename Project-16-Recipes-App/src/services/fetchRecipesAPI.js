const fetchRecipesAPI = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('REQUEST ERROR "fetchRecipesAPI": ', error);
  }
};

export default fetchRecipesAPI;
