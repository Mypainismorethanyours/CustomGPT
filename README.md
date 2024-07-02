# #
## Overview
A GPT-like website which allows users to customize roles.

## Run
```shell
# Dependency installation
npm install
# Start the service
npm run dev
```
After starting, visit `http://localhost:3000/`

## Demo
![](https://github.com/Mypainismorethanyours/CustomGPT/blob/main/Demo/Demo1.png)
![](https://github.com/Mypainismorethanyours/CustomGPT/blob/main/Demo/Demo2.png)
![](https://github.com/Mypainismorethanyours/CustomGPT/blob/main/Demo/Demo3.png)
![](https://github.com/Mypainismorethanyours/CustomGPT/blob/main/Demo/Demo4.png)


## Cloudflare worker

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
