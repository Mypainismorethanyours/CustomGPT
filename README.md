```shell
# Dependency installation
npm install
# Start the service
npm run dev
```
After starting, visit `http://localhost:3000/`

## Demo
https://private-user-images.githubusercontent.com/109569168/344869195-bd877f77-af8e-420c-af9a-7751bf9a6f17.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTk4OTI0OTIsIm5iZiI6MTcxOTg5MjE5MiwicGF0aCI6Ii8xMDk1NjkxNjgvMzQ0ODY5MTk1LWJkODc3Zjc3LWFmOGUtNDIwYy1hZjlhLTc3NTFiZjlhNmYxNy5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNzAyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDcwMlQwMzQ5NTJaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1jNDUzNzQ0NzhiY2UyOWJiZWNjNWMzZWQ3MGYyNzRhYWU3NWVlMzk4M2VlZDMxZGUzZDZiNDk2NDg1NzJkNzg1JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.MqdxoZs9hezwJWYD7z_P5oEKFogfzmmNz_x2QWSpZ3M
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
