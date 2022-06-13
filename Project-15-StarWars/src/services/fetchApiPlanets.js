const urlPlanetsApi = 'https://swapi-trybe.herokuapp.com/api/planets/';

const fetchPlanetsApi = async () => {
  const response = await fetch(urlPlanetsApi);
  const result = response.json();
  return result;
};

export default fetchPlanetsApi;
