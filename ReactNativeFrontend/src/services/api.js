const api = 'http://localhost:4000/api';

export default async function request(url, test = false) {

  const response = await fetch(`${api}/${url}`);

  const jsonResponse = await (test ? response.status : response.json());

  return test ? jsonResponse: jsonResponse.data;
}
