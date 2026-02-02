# 🌈 CollectionOfAtoms.com

**CollectionOfAtoms.com** is the personal website of Jesse Caldwell — a digital home for projects, writing, and ways to get in touch. Built with Next.js (App Router), styled with custom CSS, themed for dark mode, and fully responsive.

![favicon](public/CollectionOfAtoms_logo/Heart_favicon_64.png)

---

## 🧰 Tech Stack

| Layer       | Technology          |
|-------------|---------------------|
| Framework   | [Next.js](https://nextjs.org/) (App Router) |
| Rendering   | React Server Components + Client Components |
| Deployment  | [Vercel](https://vercel.com/) |
| Database    | [Neon](https://neon.tech/) (PostgreSQL) |
| Styling     | CSS (custom, no frameworks) |
| Favicon     | Custom icon (molecule-inspired human profile) |

---

## 🚀 Deployment

The site is automatically deployed to [https://collectionofatoms.com](https://collectionofatoms.com) using **[Vercel](https://vercel.com/)**. All pushes to the `main` branch of the GitHub repo trigger new deployments.

### 🔁 GitHub → Vercel Flow

1. **Repo**: [CollectionOfAtoms/CollectionOfAtoms.com](https://github.com/CollectionOfAtoms/CollectionOfAtoms.com)
2. **App Name on Vercel**: `collectionofatoms-app`
3. **Framework Preset**: `Next.js`
4. **Output directory**: `/.next` (handled automatically by Vercel)

---

## 💻 Local Development

```bash
# Clone the repo
git clone https://github.com/CollectionOfAtoms/CollectionOfAtoms.com.git
cd CollectionOfAtoms.com

# Install dependencies
npm install

# Start the development server
npm run dev
```
Open your browser to http://localhost:3000.

## 📁 Project Structure

``` bash
public/
├── CollectionOfAtoms_logo/         # Logos + favicon
├── content/posts/                  # Markdown blog posts
├── music/                          # Audio tracks
├── photos/                         # Photography assets
└── projects/                       # Project media
src/
├── app/                            # Next.js App Router
│   ├── layout.js                    # Root layout + fonts + metadata
│   ├── page.js                      # Home (server) + HomePageClient
│   ├── not-found.js                 # 404 page
│   ├── blog/                        # Blog index + [postId] route
│   ├── projects/                    # Project detail routes
│   └── ...                          # About, Contact, Music, Photography
├── components/                      # Shared UI (ClientLayout, PhotoGrid, BlogPost)
├── context/                         # Audio player context
├── data/                            # Tracks + posts metadata
├── App.css                          # Global styles
└── index.css                        # Base styles
```

## ✨ Features
- ⚫ Modern dark-mode look by default
- 📱 Mobile-first layout with animated hamburger menu
- 🔗 Active link highlighting
- 🧬 Custom-designed favicon and icon system
- ✉️ Contact form posts to Formspree (no custom backend)
- 🧩 Easily extensible for future enhancements

## 🗄️ Database

The site uses a Neon-hosted PostgreSQL database. Connection details are configured via environment variables in Vercel and local development:

- `DATABASE_URL` — Neon connection string (PostgreSQL)

Local setup example:

```bash
export DATABASE_URL="postgres://user:password@host.neon.tech/dbname?sslmode=require"
```
⸻

## 🧑‍💻 Author

Jesse Caldwell
GitHub: @CollectionOfAtoms￼
Site: https://CollectionOfAtoms.com￼
