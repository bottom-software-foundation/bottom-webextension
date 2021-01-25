document.addEventListener("wasmBottomifyReady", () => {
  let getting = browser.storage.sync.get("enabled");
  getting.then(
    (item) => {
      console.log(item);
      if (!item.enabled) return;
      replaceText(document.body, wasm_bindgen.encode);
    },
    (err) => console.error(`Error: ${err}`)
  );
});

function replaceText(node, cb) {
  if (node.nodeType === Node.TEXT_NODE) {
    if (node.parentNode && node.parentNode.nodeName === "TEXTAREA") {
      return;
    }
    let content = node.textContent;
    content = cb(content);
    node.textContent = content;
  } else {
    for (let i = 0; i < node.childNodes.length; i++) {
      replaceText(node.childNodes[i], cb);
    }
  }
}
