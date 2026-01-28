# Scripts

This folder contains small utilities used to support the site content (e.g. generating lightweight photo thumbnails).

## Python setup

Create and activate a virtual environment from the repository root:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

On Windows PowerShell:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

Install requirements:

```bash
pip install -r scripts/requirements.txt
```

## Example

Generate photo thumbnails:

```bash
python scripts/make_thumbs.py
```
