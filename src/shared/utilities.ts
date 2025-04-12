export const randToken = function () {
  return Math.random().toString(36).substring(2);
};

const icon = await createImageBitmap(
  await (await fetch(chrome.runtime.getURL("/icons/logo16.png"))).blob()
);

export const updateIcon = (active: boolean) => {
  if (active) {
    const canvas = new OffscreenCanvas(16, 16);
    const context = canvas.getContext("2d")!;
    context.drawImage(icon, 0, 0);
    context.font = "8px Arial";
    context.fillText("🛳️", 6, 14);
    const imageData = context.getImageData(0, 0, 16, 16);
    chrome.action.setIcon({ imageData: imageData });
  } else {
    chrome.action.setIcon({ path: "/icons/logo16.png" });
  }
};

export const bearing = (coords: number[]) => {
  const [lat1, lon1, lat2, lon2] = coords.map((d) => (d * Math.PI) / 180);
  const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
  return Math.trunc(((Math.atan2(y, x) * 180) / Math.PI + 360) % 360);
};
