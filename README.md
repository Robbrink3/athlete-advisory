# Athlete Advisory — working prototype (v2)

A mobile-first NIL and scholarship advisor for student athletes. Plain files, no build step, hosted on GitHub Pages.

## Install on iPhone
Open the GitHub Pages link in **Safari** → Share → **Add to Home Screen**. New users go through a short setup.

## What's real in this version
- **Setup for a new user**: profile, priorities, trusted circle, passcode and Face ID, private AI.
- **Private AI with no key and no cost**: Scout runs a small language model on the device (WebLLM on WebGPU). It downloads once (about 0.7 GB on phone size) and then works offline. Needs iOS 26 Safari on iPhone, or a recent Chrome, Edge or Safari on a computer.
- **Reads text from photos on the device** (Tesseract): offers, supplement labels, report cards, post photos.
- **Documents**: real files (PDF, Word, photos) stored encrypted in the browser's database on this device, with an in-app viewer.
- **Face ID / fingerprint**: uses the phone's built-in biometrics through passkeys. The app never sees face data. Passcode backup. Locks when you leave the app.
- **Voice**: talk to Scout; answers read aloud in a calm British male voice when the device has one (Daniel on iPhone). Money and contract answers aren't read aloud unless earbuds are on.
- Offers with risky-term detection and comparison, deal rules from signed contracts, post check with photos from your library, money and tax set-aside, schools, grades, trusted circle, guardian-approved sharing, and level previews (Free, NIL add-on, University, NIL Deal Plus) in Me → Plan.

## Limits
Data lives only on the device and browser where it was entered; clearing Safari website data erases it. The on-device model is small: it can be wrong, so every decision goes to your attorney, registered agent or school compliance office. Nothing here is legal, tax or financial advice.
