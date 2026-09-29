"""Local preview server that mirrors the production Vercel config.

Applies the same Content-Security-Policy and `cleanUrls` behaviour declared in
vercel.json so that CSP violations and extensionless links surface locally
instead of only after deploying. Not part of the deployed site.
"""

import http.server
import json
import os
import socketserver

ROOT = os.path.dirname(os.path.abspath(__file__))

with open(os.path.join(ROOT, "vercel.json"), encoding="utf-8") as handle:
    CONFIG = json.load(handle)

GLOBAL_HEADERS = [
    (header["key"], header["value"])
    for rule in CONFIG["headers"]
    if rule["source"] == "/(.*)"
    for header in rule["headers"]
]


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def translate_path(self, path):
        resolved = super().translate_path(path)
        # cleanUrls: /about -> about.html
        if not os.path.exists(resolved) and not resolved.endswith(".html"):
            candidate = resolved.rstrip("/") + ".html"
            if os.path.isfile(candidate):
                return candidate
        return resolved

    def end_headers(self):
        for key, value in GLOBAL_HEADERS:
            self.send_header(key, value)
        super().end_headers()

    def log_message(self, fmt, *args):
        super().log_message(fmt, *args)


if __name__ == "__main__":
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("127.0.0.1", 4322), Handler) as httpd:
        print("Preview with production headers on http://127.0.0.1:4322")
        httpd.serve_forever()
