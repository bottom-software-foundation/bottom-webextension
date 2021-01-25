(async () => {
  await wasm_bindgen(
    browser.extension.getURL("./bottom-web/site/bottom_wasm_bg.wasm")
  );
  document.dispatchEvent(new CustomEvent('wasmBottomifyReady'));
})();

function replaceSelection(cb) {
  let selection = window.getSelection();
  if (selection.rangeCount) {
    let range = selection.getRangeAt(0);
    let content = range.extractContents();
    replaceText(content, cb);
    range.deleteContents();
    range.insertNode(content);
  }
}

browser.runtime.onMessage.addListener((r) => {
  if (r.type == "bottomifySelection") {
    replaceSelection(wasm_bindgen.encode);
  } else if (r.type == "regressSelection") {
    replaceSelection(wasm_bindgen.decode);
  } else if (r.type == "bottomifyDocument") {
    replaceText(document.body, wasm_bindgen.encode);
  } else if (r.type == "regressDocument") {
    replaceText(document.body, wasm_bindgen.decode);
  }
  return Promise.resolve({ success: true });
});
