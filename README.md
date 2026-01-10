# 🌈 CollectionOfAtoms.com

**CollectionOfAtoms.com** is the personal website of Jesse Caldwell — a digital home for projects, writing, and ways to get in touch. Built with React, it's styled with custom CSS, themed for dark mode, and fully responsive.

![favicon](public/favicon.ico)

---

## 🧰 Tech Stack

| Layer       | Technology          |
|-------------|---------------------|
| Frontend    | [React](https://reactjs.org/) (via `create-react-app`) |
| Routing     | [React Router DOM](https://reactrouter.com/) |
| Deployment  | [Vercel](https://vercel.com/) |
| Styling     | CSS (custom, no frameworks) |
| Favicon     | Custom icon (molecule-inspired human profile) |

---

## 🚀 Deployment

The site is automatically deployed to [https://collectionofatoms.com](https://collectionofatoms.com) using **[Vercel](https://vercel.com/)**. All pushes to the `main` branch of the GitHub repo trigger new deployments.

### 🔁 GitHub → Vercel Flow

1. **Repo**: [CollectionOfAtoms/CollectionOfAtoms.com](https://github.com/CollectionOfAtoms/CollectionOfAtoms.com)
2. **App Name on Vercel**: `collectionofatoms-app`
3. **Framework Preset**: `Create React App`
4. **Output directory**: `build` (handled automatically by Vercel)

---

## 💻 Local Development

```bash
# Clone the repo
git clone https://github.com/CollectionOfAtoms/CollectionOfAtoms.com.git
cd CollectionOfAtoms.com

# Install dependencies
npm install

# Start the development server
npm start
```
Open your browser to http://localhost:3000.

## 📁 Project Structure

``` bash
public/
├── index.html         # HTML template
├── favicon.ico        # Custom favicon (molecule profile)
src/
├── App.js             # App shell and router
├── App.css            # Global styles
├── pages/             # Individual page components
│   ├── Home.js
│   ├── About.js
│   ├── Projects.js
│   ├── Blog.js
│   └── Contact.js
```

## ✨ Features
- ⚫ Modern dark-mode look by default
- 📱 Mobile-first layout with animated hamburger menu
- 🔗 Active link highlighting
- 🧬 Custom-designed favicon and icon system
- ✉️ Contact form uses a `mailto:` link to open the visitor's email client (no backend email service)
- 🧩 Easily extensible for future enhancements
⸻

## 🧑‍💻 Author

Jesse Caldwell
GitHub: @CollectionOfAtoms￼
Site: https://CollectionOfAtoms.com￼
