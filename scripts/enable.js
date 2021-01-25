let enableInput = document.getElementById("enable");
let enableLabel = document.getElementById("enable_label");

enableInput.addEventListener("click", (event) => {
  browser.storage.sync.set({
    enabled: event.target.checked,
  });
  enableLabel.textContent =
    (event.target.checked ? "Disable" : "Enable") + " Page View";
});

document.addEventListener("DOMContentLoaded", () => {
  if (document.body.dataset.popup == "bottomify") {
    var styleNode = document.createElement("style");
    styleNode.rel = "stylesheet";
    styleNode.textContent = `@font-face { font-family: emoji; src: url('${browser.extension.getURL(
      "./styles/twemoji.ttf"
    )}'); }`;
    document.head.appendChild(styleNode);

    let content = document.getElementById("translation_content");

    document.getElementById("encode_btn").addEventListener('click', () => {
      content.value = wasm_bindgen.encode(content.value);
    });

    document.getElementById("copy_btn").addEventListener('click', async (event) => {
        await navigator.clipboard.writeText(content.value);
        event.target.textContent = "✅";
        setTimeout(() => event.target.textContent = "📋", 500);
    })

    document.getElementById("decode_btn").addEventListener('click', () => {
      content.value = wasm_bindgen.decode(content.value);
    });

    let getting = browser.storage.sync.get("enabled");
    getting.then(
      (item) => {
        enableInput.checked = item.enabled;
        enableLabel.textContent =
          (item.enabled ? "Disable" : "Enable") + " Page View";
      },
      (err) => {
        console.error(`Error: ${err}`);
      }
    );
  }
});

(async () => {
  await wasm_bindgen(
    browser.extension.getURL("./bottom-web/site/bottom_wasm_bg.wasm")
  );
})();
