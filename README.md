# URL Shortener API

This is a simple URL shortener API built using Express, MongoDB, and DNS lookup. It allows you to shorten long URLs and retrieve the original URL using a shortened version.

## Features

1. **POST /api/shorturl** — Accepts a URL and returns a shortened URL.
2. **GET /api/shorturl/:shortUrl** — Redirects to the original URL using the shortened URL.

## Requirements

- Node.js
- MongoDB (for storing original and shortened URLs)

## Installation

### 1. Clone this repository

```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
