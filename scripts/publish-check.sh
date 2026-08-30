#!/usr/bin/env bash
# Pre-publish gate: confidentiality sweep + link check.
#
# Patterns come from .claude/redactions.txt, which is gitignored — the list of
# confidential clients must not itself be committed to a repo with a public
# remote.
#
# Usage:
#   bash scripts/publish-check.sh            # check the local build in .next/
#   bash scripts/publish-check.sh <url>      # also check a deployed site
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LIST="$ROOT/.claude/redactions.txt"
FAIL=0

if [[ ! -f "$LIST" ]]; then
  echo "FAIL  .claude/redactions.txt is missing — cannot verify confidentiality."
  exit 1
fi

PATTERN="$(grep -vE '^\s*(#|$)' "$LIST" | paste -sd'|' -)"

echo "== confidentiality sweep (built output) =="
if [[ -d "$ROOT/.next" ]]; then
  if hits=$(grep -rliE "$PATTERN" "$ROOT/.next/server" "$ROOT/public" 2>/dev/null); then
    echo "FAIL  redacted terms found in the build:"
    echo "$hits" | sed 's/^/        /'
    FAIL=1
  else
    echo "ok    no redacted terms in .next/server or public/"
  fi
else
  echo "warn  no .next/ build found — run 'npx next build' first"
fi

SITE="${1:-}"
if [[ -n "$SITE" ]]; then
  echo
  echo "== deployed site: $SITE =="
  body=$(curl -sL --max-time 30 "$SITE") || body=""
  if [[ -z "$body" ]]; then
    echo "FAIL  could not fetch $SITE"
    FAIL=1
  elif echo "$body" | grep -qiE "$PATTERN"; then
    echo "FAIL  redacted terms served from production"
    FAIL=1
  else
    echo "ok    production page clean"
  fi

  echo
  echo "== outbound links =="
  # Only external links; internal routes are covered by the build.
  # Exclude backslash too: escaped URLs in inlined JSON otherwise yield a second,
  # backslash-suffixed copy of every link.
  links=$(echo "$body" | grep -oE 'https?://[^"'"'"'<> \\]+' | sed 's#/$##' \
    | grep -v "$(echo "$SITE" | sed 's#https\?://##')" | sort -u)
  if [[ -z "$links" ]]; then
    echo "warn  no outbound links found to check"
  fi
  while IFS= read -r url; do
    [[ -z "$url" ]] && continue
    code=$(curl -s -o /dev/null -w '%{http_code}' -L --max-time 20 "$url" 2>/dev/null)
    if [[ "$code" == "200" ]]; then
      printf 'ok    %-6s %s\n' "$code" "$url"
    else
      printf 'FAIL  %-6s %s\n' "${code:-000}" "$url"
      FAIL=1
    fi
  done <<< "$links"
fi

echo
if [[ "$FAIL" -eq 0 ]]; then
  echo "PASS  safe to publish"
else
  echo "BLOCKED  fix the failures above before publishing"
fi
exit "$FAIL"
