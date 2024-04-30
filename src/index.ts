interface JsonpRes<T> {
  code: JsonpResCode;
  data: T | null;
}

type JsonpResCode = 200 | 400 | 500;

type JsonpOptions = {
  timeout?: number;
  callbackName?: string;
};

const Jsonp = <T extends any>(url: string, params: Record<string, any>, JsonpOptions: JsonpOptions = {}) => {
  return new Promise<JsonpRes<T>>((resolve) => {
    let callbackName = "jsonp_callback_" + Math.random().toString(36).slice(2);

    if (JsonpOptions.callbackName) callbackName = JsonpOptions.callbackName;

    window[callbackName] = function (data: T) {
      // Clean Event
      cleanup();

      // Return Data
      if (data) {
        resolve({
          code: 200,
          data,
        });
      } else {
        resolve({
          code: 400,
          data: null,
        });
      }
    };

    // Object Params To QueryString
    const queryString = Object.keys(params)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join("&");

    // Create Script Tag
    const script = document.createElement("script");
    script.src = queryString ? `${url}?${queryString}&callback=${callbackName}` : `${url}?callback=${callbackName}`;

    // If Error Evnet
    script.onerror = () => {
      cleanup();
      resolve({
        code: 500,
        data: null,
      });
    };

    // If Timeout Event
    const timeout = setTimeout(() => {
      cleanup();
      resolve({
        code: 500,
        data: null,
      });
    }, JsonpOptions.timeout); // 10 秒后超时

    // Clean Event
    function cleanup() {
      clearTimeout(timeout);
      script.remove();
      delete window[callbackName];
    }

    // 将 script 标签添加到 DOM
    document.body.appendChild(script);
  });
};

export default Jsonp;
