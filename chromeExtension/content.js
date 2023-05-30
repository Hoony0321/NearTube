(async () => {
  const src = chrome.runtime.getURL("content_main.js");
  const contentScript = await import(src);
  contentScript.main();
})();
