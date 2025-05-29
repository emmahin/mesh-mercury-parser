# Mesh Mercury Parser

A minimal Express-based wrapper for the open-source Mercury Parser. Ready for deployment to Fly.io.

## Usage

POST to `/parser` with JSON:
```json
{
  "url": "https://example.com/article"
}
```

Response will contain the parsed title, content, and metadata.
