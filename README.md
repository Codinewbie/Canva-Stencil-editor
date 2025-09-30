# 🖌️ Stencil Editor (React + Fabric.js + Redux + Tailwind)

A **Canvas-based Stencil Editor** inspired by Canva, built with **React, Vite, Redux, Tailwind CSS, and Fabric.js**.  
It allows users to **upload images**, place them into a **stencil frame**, and adjust them with **drag, zoom, and reset controls**.

---

## ✨ Features
- 📤 Upload images via the **Uploads Panel**.
- 🖼️ Drag & drop uploaded image into a **photo frame stencil**.
- 🔍 Zoom In/Out inside the stencil.
- 🎯 Move & Reposition images freely.
- ♻️ Reset to restore image position.
- ⚡ Built with **React + Redux + Fabric.js** for smooth performance.

---

📸 Screenshots

<img width="1920" height="917" alt="{483EE708-1DC5-433A-901D-2A7F479C929D}" src="https://github.com/user-attachments/assets/ea25c984-086b-44cb-bdfc-36d9ed644096" />
<img width="1908" height="924" alt="{9D23ADBD-6CE4-4802-A607-A87833793836}" src="https://github.com/user-attachments/assets/f624538b-cfb1-4a9f-86db-5bd8e43014b3" />



---

## 🛠️ Tech Stack
| Layer | Technology |
|-------|------------|
| Fast frontend development | React + Vite |
| Canvas manipulation | Fabric.js |
| State management | Redux Toolkit |
| Tailwind CSS | Styling |

---

## 🎥 Demo Video

Watch the demo video here:
▶️ Watch Demo : https://drive.google.com/file/d/110f1OMoirIwJzktxEmDdpRqYDIgO8YEu/view?usp=drive_link

---

## 📂 Project Structure
```
.
Stencil-Editor/
├── public/              # Static assets
├── src/
│   ├── components/
│   │   ├── CanvasEditor.jsx   # Fabric.js canvas + stencil logic
│   │   ├── LeftPanel.jsx      # Handles uploads & thumbnails
│   │   ├── Toolbar.jsx        # Zoom, Reset, Undo controls
│   ├── store/
│   │   ├── editorSlice.js     # Redux slice for editor state
│   │   └── store.js           # Redux store setup
│   ├── App.jsx                # Main layout
│   ├── main.jsx               # React entrypoint
│   ├── index.css              # Global styles (Tailwind included)
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

```bash
# 1️⃣ Clone Repository
git clone https://github.com/CodePandaAkhilesh/Stencil-Editor.git
cd Stencil-Editor

# 2️⃣ Install Dependencies
npm install
npm install fabric @reduxjs/toolkit react-redux
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 4️⃣ Run App in Development Mode
npm run dev
```

---


## 📞 Contact

- Akhilesh Verma – 📧 av14021999@gmail.com    

---

## 📜 License

- MIT License
