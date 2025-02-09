console.log("popup.js loaded");
/*
  popup.js is meant to interact with popup.html
  Typically, we handle logic for the popup window here.
  To use other scripts like content.js, we send and receive messages.
*/

/*
  Start by injecting content.js when the popup opens.
  This allows us to communicate between the tab's DOM and the plugin popup.
*/
document.addEventListener("DOMContentLoaded", async () => {
  // Query the active tab once (needed before sending messages)
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab) {
    console.error("No active tab found.");
    return;
  }

  // Inject content.js ONCE when the popup opens
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"],
  });

  // Get the message list container in the popup.html
  const messageList = document.getElementById("message-list");
  if (!messageList) return;

  //  Example: Send a message when clicking the message list
  messageList.addEventListener("click", (event) => {
    const li = event.target.closest("li"); // Ensure it's an <li>
    if (!li) return;

    console.log("Clicked:", li.dataset.messageId);

    // Send the selected messageId to content.js
    chrome.tabs.sendMessage(tab.id, {
      action: "message-from-popup",
      messageId: li.dataset.messageId,
    });
  });
});

// ✅ Message listener should be outside DOMContentLoaded so it always listens.
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "message-from-content") {
    console.log("Received messages:", message.obj);

    // Get the message list container in popup.html
    const messageList = document.getElementById("message-list");
    if (!messageList) return;

    // Clear existing list before updating
    messageList.innerHTML = "";

    // Display received data
    message.obj.forEach(({ id, preview }) => {
      const li = document.createElement("li");
      li.textContent = preview ? `Preview: ${preview}...` : `ID: ${id}`;
      li.dataset.messageId = id;
      li.style.cursor = "pointer";
      li.style.padding = "8px";
      li.style.borderBottom = "1px solid #ccc";
      li.style.display = "block";

      messageList.appendChild(li);
    });
  }
});
