# Content-Popup-Demo

This project is a **basic Chrome extension** that demonstrates how to send messages between a **popup script** (`popup.js`) and a **content script** (`content.js`).  

The extension extracts specific elements from a webpage and displays them in the popup UI. Clicking on a message in the popup **highlights the corresponding element** in the webpage.

This project serves as a **starter template** for developers who want to build Chrome extensions that interact with the page's DOM.

---

## 📁 **Project Structure**


content-popup-demo/  
│── tab.html           # Test webpage where the extension interacts  
│── plugin/            # Chrome extension source files  
│   ├── manifest.json  
│   ├── popup.html     
│   ├── popup.js       
│   ├── content.js     
│   ├── background.js  # (Optional for more advanced features)  
│   ├── icon.png       # Extension icon  

---

## 🚀 **Setup Instructions**
### **1️⃣ Load the plugin directory Extension in Chrome**
1. Open **Google Chrome**.
2. Go to `chrome://extensions/`.
3. Enable **Developer Mode** (toggle in the top-right corner).
4. Click **Load Unpacked**.
5. Select the `plugin/` folder inside this project.

---

### **2️⃣ Open the Test Webpage**
1. Open `tab.html` in a browser tab.
2. This page contains `<div>` elements that the extension will interact with.

---

### **3️⃣ Use the Extension**
1. Click on the **extension icon** in the Chrome toolbar.
2. The popup will list elements found on `tab.html`.
3. Clicking a message in the popup **highlights the corresponding element** in `tab.html`.

---

## 📌 **How It Works**
### **Content Script (`content.js`)**
- Runs in the context of the webpage.
- Extracts `<div class="someClass">` elements from `tab.html`.
- Sends these elements to the popup using `chrome.runtime.sendMessage()`.

### **Popup Script (`popup.js`)**
- Runs when the extension popup is opened.
- Requests the list of elements from `content.js`.
- Displays them as a clickable list in `popup.html`.
- Clicking a message **sends a message back to `content.js`** to highlight the element.

---

## 🔧 **Customization**
- Modify `content.js` to **extract different elements** from a webpage.
- Edit `popup.html` to **change the UI**.
- Add more permissions in `manifest.json` for **expanded features**.

---

## 🎯 **Why This Was Created**
This project was built to help developers **quickly start a Chrome extension** that interacts with a webpage’s DOM.  

Use it as a **starter template** to build **more advanced** browser extensions!

---

## 📝 **License**
This project is **open-source**. Feel free to use, modify, and improve it!

