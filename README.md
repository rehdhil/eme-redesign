# EME Redesign - High-Performance Landing Page

This is a premium, high-performance landing page for EME Education, built using **Next.js** and **React**. It features advanced 3D animations, interactive orbital timelines, and highly optimized mobile responsiveness.

## 🚀 Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Library:** [React 18](https://react.dev/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://greensock.com/gsap/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **3D Graphics:** [Three.js](https://threejs.org/) & [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- **Icons:** [Lucide React](https://lucide.dev/)

## ✨ Key Features

- **Dynamic Hero Section:** Featuring a scroll-linked scaling video and an interactive `ShootingStars` background.
- **Orbital Timeline:** A custom 3D interactive timeline built for desktop and mobile ("Why Choose EME?").
- **Placement Section:** An interactive card stack showing recently placed students.
- **Interactive Logo Cloud:** A fast, responsive marquee for high-profile hiring partners.
- **Review Summary:** A dynamic card with animated rating stars and live counting counters.
- **Mobile First Spacing:** Specifically tuned padding and margins for a seamless mobile experience.

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the result.

### Production

Build the optimized production bundle:
```bash
npm run build
```

## 📦 Deployment

The project is optimized for deployment on **Vercel**. Every push to the `main` branch will automatically trigger a new deployment.

### Configuring a Subdomain

1. In the **Vercel Dashboard**, go to **Settings > Domains**.
2. Add your desired subdomain (e.g., `plus.emeeducation.com`).
3. Add the provided **CNAME** record to your domain's DNS settings (GoDaddy, etc.).

## 🤝 Handover & Collaboration

To handover this project to another developer:
1. **GitHub:** Invite them as a 'Collaborator' in the Repository Settings.
2. **Vercel:** Add them as a 'Member' in the Vercel Project Settings.
3. **Environment Variables:** Ensure any future `.env` variables are communicated or set up in the Vercel Dashboard.

