# S S Lokesh Kodamanchili

**Data analytics. Workflow automation. AI.**

A personal portfolio documenting my journey from programming foundations to practical projects, internships, and my first hackathon-style experience.

## Inside the portfolio

- **Project Space 8.0:** seven-day Team 8 journey, Student 360, main-stage selection, and a photo gallery.
- **Projects:** Student 360 and SecureExam, CertiFlow, TimeCapsule, Citizen AI, EcoSense, and additional analytics and Power Apps work.
- **Learning:** internships, Technical Hub training, certifications, coding profiles, and education.
- **Connect:** email, LinkedIn, GitHub, Instagram, and an unchanged downloadable resume supplied by Lokesh.

## Run locally

No build step or package installation is required.

```sh
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Publish with GitHub Pages

In **Settings → Pages**, select **Deploy from a branch**, choose **main** and **/(root)**, then save. The project uses relative asset paths and can also be deployed on static hosts such as Vercel.

## Update content

| Content | File |
| --- | --- |
| Sections, project links, credential links, copy | `index.html` |
| Personal layouts and responsive overrides | `assets/portfolio.css` |
| Base reference styling | `assets/main.css` |
| Motion, smooth scroll, hero reveal, fog, and tilt | `assets/scripts.js` |
| Photo viewer, terminal, fallback controls | `assets/ui.js` |
| Music controls | `assets/music-player.js` |
| Resume | `assets/resume/Lokesh-Resume.pdf` |
| Profile and event photographs | `assets/img/` |
| Project images | `assets/projects/` |

YouTube is intentionally not shown. Add a real URL and link when available. Coding statistics are not hardcoded; profile links point to current platform information.

## Visual reference and media

The visual design and base motion/styling are adapted from [SriSatyaLokesh's portfolio](https://github.com/SriSatyaLokesh/SriSatyaLokesh.github.io), at Lokesh's explicit request. The original Interstellar audio is retained from that reference. This repository does not claim ownership or grant a new license for third-party design, code, music, brands, or assets. Personal photographs and resume were supplied by Lokesh; project logos/screenshots come from his repositories. The Student 360 image is a frame from its public project demo, not a personal coding score.

## Implementation notes

- Native expandable details and keyboard-accessible photo dialog.
- Motion CDN failures leave core controls usable; WebGL errors fall back to the static background.
- Responsive styles checked at desktop, 390 px, and 320 px widths.
- Reduced-motion CSS removes decorative transitions and cursor effects.
- The portfolio does not display CGPA. The resume is provided unchanged.
- Certification links are the credential URLs supplied in the LinkedIn posts; external services may redirect or require sign-in.

**Contact:** [satyalokesh.ks@gmail.com](mailto:satyalokesh.ks@gmail.com)
