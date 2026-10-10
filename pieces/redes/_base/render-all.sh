#!/usr/bin/env bash
# Regenera todas las PNG de redes: cada línea de piezas.tsv pasa por render.sh, en orden.
# Uso: _base/render-all.sh   (desde cualquier carpeta; tarda unos 2 minutos)
# Hace falta Google Chrome en /Applications e internet para las fuentes de Google.
set -euo pipefail
base_dir="$(cd "$(dirname "$0")" && pwd)"
redes_dir="$(dirname "$base_dir")"
rendered=0
# piezas.tsv se lee por el descriptor 3 para que nada de render.sh consuma sus líneas.
while IFS=$'\t' read -r html width height png <&3; do
  [[ -z "$html" || "$html" == \#* ]] && continue
  "$base_dir/render.sh" "$redes_dir/$html" "$width" "$height" "$redes_dir/$png" >/dev/null
  echo "$png"
  rendered=$((rendered + 1))
done 3< "$base_dir/piezas.tsv"
echo "$rendered PNG regeneradas"
