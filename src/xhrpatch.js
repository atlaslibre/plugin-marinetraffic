// inject a minimal hook for XHR and fetch requests
// and pass them through the isolation bridge to the backend

(function () {
  const liveHandler = (response) => {
    message = JSON.parse(response);
    console.assert(message.type === 1, message);
    window.postMessage({ type: "live", data: message.data.rows });
  };

  const playbackHandler = (response) => {
    message = JSON.parse(response);
    window.postMessage({ type: "playback", data: Object.values(message) });
  };

  const trackHandler = (response, url) => {
    message = JSON.parse(response);
    window.postMessage({ type: "track", data: {track: message, url} });
  };

  const detailsHandler = (response) => {
    message = JSON.parse(response);
    window.postMessage({ type: "details", data: message.values });
  };

  const handlers = {
    "https://www.marinetraffic.com/map/getplaybackjson": playbackHandler,
    "https://www.marinetraffic.com/getData/get_data_json": liveHandler,
    "https://www.marinetraffic.com/en/ais/get_info_window_json?asset_type=ship&": detailsHandler,
    "https://www.marinetraffic.com/map/gettrackjson/shipid:": trackHandler,
  };

  const originalXhr = window.XMLHttpRequest.prototype.open;

  window.XMLHttpRequest.prototype.open = function () {
    this.addEventListener("load", function () {
      for (const [prefix, handler] of Object.entries(handlers)) {
        if (this.responseURL.startsWith(prefix)) {
          const responseBody = this.responseText;
          handler(responseBody, this.responseURL);
          break;
        }
      }
    });
    return originalXhr.apply(this, arguments);
  };
})();
