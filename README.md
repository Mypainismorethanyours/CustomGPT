```shell
# Dependency installation
npm install
# Start the service
npm run dev
```
After starting, visit `http://localhost:3000/`

## Demo
https://github.com/Mypainismorethanyours/CustomGPT/assets/109569168/bd877f77-af8e-420c-af9a-7751bf9a6f17
https://github.com/Mypainismorethanyours/CustomGPT/assets/109569168/eff6a384-7441-4817-b8c3-ea0fe8ab4fe2
https://github.com/Mypainismorethanyours/CustomGPT/assets/109569168/7c6027ba-3b29-4653-ba04-c3d01084e14b
https://github.com/Mypainismorethanyours/CustomGPT/assets/109569168/73c3a111-19e5-4734-9c1e-71d1f5325cff


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
