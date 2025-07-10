# Get It Done 📝

**Get It Done** is a sleek, installable task board designed to help you track daily goals with clarity and momentum. Built as a Progressive Web App (PWA), it works offline, feels native, and keeps you focused.

---

## 🚀 Features

- Drag-and-drop task management across columns
- Smooth entrance animations for task cards
- Auto-updating `updatedDate` field for edits
- Responsive design for desktop and mobile
- Installable via browser (PWA-ready)
- Local-first experience with GitHub Pages deployment

---

## 📦 Installation

You can install **Get It Done** directly from your browser:

1. Visit [https://seobryn.github.io/todo-list](https://seobryn.github.io/todo-list)
2. Click the browser’s install prompt (usually in the address bar or menu)
3. Launch it like a native app!

---

## 🛠️ Local Development

```bash
pnpm install
pnpm run dev
```

To build for production:

```bash
pnpm run build
```

---

## 📁 Project Structure

```
src/
├── components/       # TaskCard, Modal, FAB, etc.
├── styles/           # Modular CSS files
├── assets/           # Icons and images
├── App.tsx           # Main layout
└── index.html        # Entry point with manifest link
```

---

## 🧪 Tech Stack

- Preact + TypeScript
- Vite for bundling
- pnpm for package management
- GitHub Actions for deployment
- GitHub Pages for hosting

---

## 📄 Manifest & PWA

Includes `manifest.json` and `sw.js` for installability and offline support.  
Icons are optimized for splash screens and home screen launch.

---

## 📬 Contributing

Pull requests are welcome! If you’d like to suggest features or improvements, feel free to open an issue.

---

## 🧠 Author

Made with care by [Jose](https://github.com/seobryn) — focused on accessibility, polish, and open-source spirit.

---

## 📜 License

[AGPL-3.0-only](LICENSE)
