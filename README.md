# The Private Table

A browser-based blackjack practice game with a $1,000 simulated bankroll, individual card-flip animations, and an end-of-session decision review.

## GitHub Pages

Publish this directory as the root of a repository. In Settings → Pages, select Deploy from a branch, then main and / (root). All application URLs are relative and work under a repository subpath.

No build, server, API keys, or dependencies are required. Session state remains in memory in the visitor’s browser and resets on reload. This is simulated play; there are no real-money transactions.

The narrative uses visible shoe history. Next-card risks and insurance use finite-shoe counts; full-hand expected values use an explicitly labeled infinite-deck approximation.
