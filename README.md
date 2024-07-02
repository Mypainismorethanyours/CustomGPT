```shell
# Dependency installation
npm install
# Start the service
npm run dev
```
After starting, visit `http://localhost:3000/`

## Demo
https://github.com/Mypainismorethanyours/CustomGPT/assets/109569168/a9846267-612c-400a-a0d3-ea9a63f5c342


# Cloudflare worker

```
async function handleRequest(request) {
  const url = new URL(request.url);
  url.host = "api.openai.com";
  return fetch(url, {
    headers: request.headers,
    method: request.method,
    body: request.body,
  });
}
addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
```
