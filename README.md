# Harexs-Jsonp

A simple promiseify jsonp

## Useage

> npm install @harexs/jsonp

> yarn install @harexs/jsonp

> pnpm install @harexs/jsonp

```js
import Jsonp from "@harexs/jsonp";

Jsonp(url, params, options).then((res) => {
  if (res.code === 200) {
    //success
  } else if (res.code === 400) {
    // success but response empty
  } else if (res.code === 500) {
    // script error and file load fail
  }
});

// await
const res = await Jsonp(url, params, options);
```

## Example

```js
Jsonp("http://127.0.0.1/api/print", { url: "xx", fileName: "xx" }, { timeout: 10000 }, options).then((res) => {
  console.log(res.data);
});
```

## Type

```ts
interface JsonpRes<T> {
  code: JsonpResCode;
  data: T | null;
}

type JsonpResCode = 200 | 400 | 500;

type JsonpOptions = {
  timeout?: number;
  callbackName?: string;
  insertDom?: HTMLElement; //  default document.body
};
```
