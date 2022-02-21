export default async function ajax(url, bodyObj = {}, headers = {}) {
  const body = new URLSearchParams();
  Object.keys(bodyObj).forEach(key => {
    body.append(key, bodyObj[key]);
  });
  return await fetch(
    url,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        ...headers,
      },
      body: body.toString(),
    }
  )
}