# TokenOne Binplorer Check Script Status

Status: Script Added

Network: BNB Smart Chain
Token Contract:
0x5591a8E9a5001f6052D9d749518AE1e6287b7955

Script:
scripts/check-binplorer.ts

API Key Handling:
- BINPLORER_API_KEY is loaded from local .env
- No API key is hardcoded in the script
- .env and API key files are not tracked by Git

Purpose:
Check TokenOne metadata, holders, transfers, logo, website, and price status through Binplorer API.

Safety:
Do not commit .env or local API key files.
