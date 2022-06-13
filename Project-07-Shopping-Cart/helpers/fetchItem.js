const fetchItem = async (ItemID) => {
  const urlItem = `https://api.mercadolibre.com/items/${ItemID}`;
  try {
    const response = await fetch(urlItem);
    const data = await response.json();
    return data;
    // console.log(data);
  } catch (msgError) {
    return new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
