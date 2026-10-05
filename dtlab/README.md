# DTlab

MiniGrowLab's digital business transformation learning module.

Entry: https://www.minigrowlab.com/dtlab/#models

The public folder contains only a password entry and authenticated AES-GCM encrypted files. Models, company cases, figures and original PDFs are encrypted, not hidden by a cosmetic password overlay. The browser derives the decryption key with PBKDF2-SHA-256 (600,000 iterations), decrypting figures and PDFs only when needed. Neither the password nor its key is in public source.

The current tab remembers access for up to twelve hours. Use Lock to require the password again. Chinese, English and bilingual modes remain available after unlocking.

The original private DTlab Site and editable source remain unchanged in audience. Course authors retain copyright. Do not upload plaintext course assets to this folder. Rebuild the encrypted edition with the local packaging script before publishing updates.
