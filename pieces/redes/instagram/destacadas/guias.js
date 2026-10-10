// Versión -guias: abrir una destacada con ?guias dibuja encima el recorte del círculo de
// Instagram, la zona segura y la caja real del pictograma. Sin ?guias no se dibuja nada.
if (new URLSearchParams(location.search).has('guias')) {
  const box = document.querySelector('[data-slot="pictograma"]').getBoundingClientRect();
  const boxLabel = `pictograma · ${Math.round(box.width)} × ${Math.round(box.height)} · trazo 30 → 1,8 px a 64`;
  document.body.insertAdjacentHTML('beforeend', `
    <svg class="guides" viewBox="0 0 1080 1920" aria-hidden="true">
      <rect x="2" y="420" width="1076" height="1080"/>
      <circle cx="540" cy="960" r="538"/>
      <circle class="guide-safe" cx="540" cy="960" r="360"/>
      <rect class="guide-box" x="${box.x}" y="${box.y}" width="${box.width}" height="${box.height}"/>
      <line class="guide-axis" x1="540" y1="420" x2="540" y2="1500"/>
      <line class="guide-axis" x1="0" y1="960" x2="1080" y2="960"/>
      <text x="40" y="350">recorte de Instagram · círculo Ø1080 centrado</text>
      <text x="40" y="395">(cuadrado del centro 1080 × 1080, y 420–1500)</text>
      <text x="40" y="1570">zona segura · círculo Ø720</text>
      <text x="40" y="1615">${boxLabel}</text>
    </svg>`);
}
