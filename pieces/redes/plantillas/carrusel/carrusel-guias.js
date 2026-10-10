// Dibuja las zonas seguras sólo cuando la URL trae ?guias (así se renderiza la versión -guias.png).
// La versión limpia nunca las tiene: sin el parámetro, este archivo no hace nada.
(() => {
  if (!new URLSearchParams(location.search).has('guias')) return;
  const zonas = [
    { clase: 'guia-margen', etiqueta: 'margen mínimo · 72 px' },
    { clase: 'guia-contador-ig', etiqueta: 'contador de IG · estimado' },
  ];
  // Sólo la portada aparece en la grilla del perfil, que la recorta a 3:4.
  if (document.documentElement.dataset.lamina === 'portada') {
    zonas.push({ clase: 'guia-grilla', etiqueta: 'grilla del perfil 3:4 · 34 px por lado' });
  }
  document.documentElement.classList.add('guias');
  for (const zona of zonas) {
    const capa = document.createElement('div');
    capa.className = `guia ${zona.clase}`;
    capa.dataset.etiqueta = zona.etiqueta;
    capa.setAttribute('aria-hidden', 'true');
    document.body.append(capa);
  }
})();
