export const locate = (lat: number, lon: number, zoom: number) => {
  chrome.tabs.query({ url: "https://www.marinetraffic.com/*" }).then((r) => {
    if (r.length === 0) {
      chrome.tabs.create({
        url: `https://www.marinetraffic.com/en/ais/home/centerx:${lon}/centery:${lat}/zoom:${zoom}`
      });
      return;
    }

    const tab = r[0];

    // TODO!!

    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: (long, lat, zoom) => {
        // @ts-ignore
        mtMap.setView([lat, long], zoom)
      },
      args: [lon, lat, zoom],
      // @ts-ignore
      world: "MAIN",
    });

    chrome.windows.update(tab.windowId, { focused: true }, (window) => {
      chrome.tabs.update(tab.id!, { active: true });
    });
  });
};
