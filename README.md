# Athlete Advisory (prototype)

A mobile-first prototype of an NIL and scholarship advisor for student athletes. One page, no build step.

**Levels (switch with the Demo level menu):** Free · NIL add-on · University · NIL Deal Plus.

## Run it
Open `index.html`, or host it with GitHub Pages: Settings → Pages → Deploy from branch → `main` / root.
On a phone, open the Pages link and use Share → Add to Home Screen to install it like an app.

## What works in the browser
- Offer upload (PDF, Word, text, photo) with instant risky-term detection and side-by-side comparison
- Scan with the phone camera; supplement label check against a list of banned ingredients
- Ask "Scout" by text or voice (browser speech), with privacy reminders
- Deal rules from signed contracts, used in post checks
- Money and tax set-aside, updates feed, trusted circle with relationship rules, guardian-approved sharing
- Passcode lock plus Face ID or fingerprint unlock (device biometrics through passkeys)

## AI
Full answers need an Anthropic API key, pasted in Profile → AI connection. It is stored only in that browser.
**Never commit an API key to this repository.** A production app keeps keys on a server.

## Prototype limits
Data is saved in the browser on this device only. Nothing here is legal, tax or financial advice.
All names, deals, schools and agencies in the sample data are fictional.
