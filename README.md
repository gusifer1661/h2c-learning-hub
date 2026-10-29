# H2C Learning Hub

Mobile-first static web app that helps you browse curated YouTube videos for the **Bambu Lab H2C** (setup, Vortek, AMS, Bambu Studio, modeling, laser, materials, troubleshooting, tips).

Not affiliated with Bambu Lab. Video links open on YouTube.

## Open on iPhone (GitHub Pages)

1. Push this folder (`h2c-guide-app/`) to a GitHub repository (as the repo root, or keep it in a subfolder).
2. In the repo: **Settings → Pages**
   - Source: **Deploy from a branch**
   - Branch: `main` (or `master`)
   - Folder: `/` (root) if these files are at the repo root, or `/docs` if you move them there
3. Wait a minute, then open the Pages URL on your iPhone Safari, for example:
   - `https://YOUR_USERNAME.github.io/YOUR_REPO/`
4. Optional: Share → **Add to Home Screen** for an app-like icon.

### Local / offline-ish use

- Once the page has loaded over the network once, the HTML/CSS/JS stay cached by Safari for that visit, but **Watch on YouTube** still needs internet.
- You can also AirDrop/`git clone` the folder and open `index.html` in Safari; some browsers restrict `file://` module quirks—GitHub Pages is the reliable path.

## Files

| File | Role |
|------|------|
| `index.html` | Page shell |
| `styles.css` | Dark mobile-first UI |
| `app.js` | Category chips, search, cards |
| `videos.js` | Curated catalog (`window.H2C_VIDEOS`) |

No build step. Plain static files.

## Laser note

**Laser Cutting** and **Laser Engraving** sections often use **H2D / H2S / H2-series** laser and Bambu Suite videos when H2C-specific tutorials are scarce. Confirm your H2C configuration supports the laser module before following those guides.

## Credits

Video metadata curated for personal learning. Original titles and channels belong to their creators; open each link on YouTube for the full content.
