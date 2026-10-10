#!/usr/bin/env bash
# Pasa una plantilla HTML a PNG con el tamaño exacto de la pieza.
# Uso: _base/render.sh [--plantilla <carpeta>] <plantilla.html> <ancho> <alto> <salida.png>
# Con --plantilla, la pieza puede vivir en cualquier carpeta: se renderiza una copia con
# <base href> en esa carpeta, así sus rutas relativas (../../_base/brand.css) resuelven contra
# la plantilla de la que salió. Sin --plantilla, se renderiza el archivo tal cual.
# Chrome headless a veces no termina después de escribir la captura: se espera
# el archivo y se cierra el proceso.
set -euo pipefail
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
template_dir=""
if [ "${1:-}" = "--plantilla" ]; then
  template_dir="$(cd "$2" && pwd)"
  shift 2
fi
html_path="$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"
output_path="$4"
work_dir="$(mktemp -d)"
trap 'rm -rf "$work_dir"' EXIT
profile_dir="$work_dir/perfil"
if [ -n "$template_dir" ]; then
  # El ?guias queda en la URL de la copia: lo lee el script de la pieza.
  html_file="${html_path%%\?*}"
  html_query="${html_path#"$html_file"}"
  html_copy="$work_dir/pieza.html"
  BASE_HREF="file://$template_dir/" perl -pe '$done ||= s|<head>|<head><base href="$ENV{BASE_HREF}">|' \
    "$html_file" > "$html_copy"
  grep -q '<base href' "$html_copy" || { echo "$html_file no tiene <head>" >&2; exit 1; }
  html_path="$html_copy$html_query"
fi
rm -f "$output_path"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --user-data-dir="$profile_dir" --window-size="$2,$3" --virtual-time-budget=10000 \
  --screenshot="$output_path" "file://$html_path" >/dev/null 2>&1 &
chrome_pid=$!
for attempt in $(seq 1 120); do
  [ -s "$output_path" ] && break
  sleep 0.25
done
sleep 0.5
kill "$chrome_pid" 2>/dev/null || true
wait "$chrome_pid" 2>/dev/null || true
[ -s "$output_path" ] || { echo "no se generó $output_path" >&2; exit 1; }
echo "$output_path"
