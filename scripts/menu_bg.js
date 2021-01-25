browser.runtime.onInstalled.addListener(() => {
  browser.contextMenus.create({
    id: "bottomify-selection",
    title: "Bottomify Selection",
    contexts: ["selection"],
    onclick: async (info, tab) => {
      await browser.tabs.sendMessage(tab.id, { type: "bottomifySelection" });
    },
  });

  browser.contextMenus.create({
    id: "regress-selection",
    title: "Regress Selection",
    contexts: ["selection"],
    onclick: async (info, tab) => {
      await browser.tabs.sendMessage(tab.id, { type: "regressSelection" });
    },
  });

  browser.contextMenus.create({
    id: "bottomify-document",
    title: "Bottomify Document",
    onclick: async (info, tab) => {
      await browser.tabs.sendMessage(tab.id, { type: "bottomifyDocument" });
    },
  });

  browser.contextMenus.create({
    id: "regress-document",
    title: "Regress Document",
    onclick: async (info, tab) => {
      await browser.tabs.sendMessage(tab.id, { type: "regressDocument" });
    },
  });
});
