// shields the website from getting access to chrome.runtime
// and globals variables offered by the plugin.

window.addEventListener("message", function (message) {
  // Remark about the guard:
  // service worker might not be available, but that is
  // typically only when dealing with reloads of the plugin
  // leading to noise
  if (message.data.type && !message.data.target) {
    if (chrome.runtime?.id){
      console.debug("Forwarding message of type", message.data.type);
      chrome.runtime.sendMessage({target: "background", ...message.data });
    }else{
      console.debug("Failed to forward message", message.data.type);
    }
  }
});