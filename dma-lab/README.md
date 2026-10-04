# DMA Lab

Live page: https://www.minigrowlab.com/dma-lab/

The current website requires a password. The application, 27 B2B modules, PDF viewer, and 12 original course PDFs are shipped as authenticated AES-GCM encrypted files in `protected/`. The browser derives its decryption key using PBKDF2-SHA-256 and 600,000 iterations. The access page does not contain the password or key.

After unlocking, original PDFs and PDF viewer modules are downloaded and decrypted only when needed. Language preferences, saved reasoning, and video collections remain in their existing browser storage. Access is remembered within the current tab for up to 12 hours; use the Lock button to require the password again.

The editable originals remain in the local project, with the prior serving versions also recoverable from Git. Older public repository revisions are not made private by this webpage password.

To update, revise the retained source, rebuild the encrypted assets with the intended password, and publish the matching access page and encrypted files together. Never copy plaintext course assets back into this serving folder. The publishing helper mirrors file removals to prevent obsolete plaintext assets from being restored.
