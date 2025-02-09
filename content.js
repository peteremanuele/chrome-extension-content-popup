{
  console.log("content.js loaded");
  /*
  The purpose of content.js is to interact with the DOM of the user's current tab.
  We typically send and receive messages to communicate with popup.js.
*/

  // Find all divs with "someClass" in the DOM
  let messageDivs = [...document.querySelectorAll(".someClass")];
  console.log("messageDivs found:", messageDivs);

  // Convert div elements into a simpler object array for messaging
  let messageData = messageDivs.map((div, index) => ({
    id: `msg-${index + 1}`, // Generate a unique ID
    preview: div.textContent.slice(0, 30), // Extract part of the content as preview
  }));

  // If we find messages, send them to popup.js
  if (messageData.length > 0) {
    chrome.runtime.sendMessage({
      action: "message-from-content",
      obj: messageData, // Sending serialized data
    });
  } else {
    console.log("No divs found");
  }

  // Listen for messages from popup.js
  chrome.runtime.onMessage.addListener((message) => {
    console.log("content.js received message:", message);

    if (message.action === "message-from-popup") {
      console.log(`Processing message ID: ${message.messageId}`);

      // Find and highlight the clicked element in the DOM
      let targetDiv = messageDivs.find(
        (div, index) => `msg-${index + 1}` === message.messageId
      );
      if (targetDiv) {
        targetDiv.style.backgroundColor = "yellow"; // Example: Highlight element
      }
    }
  });
}
