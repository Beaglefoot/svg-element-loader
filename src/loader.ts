function svgElementLoader(svg: string): string {
  const trimmed = svg.trim().replace(/\r?\n/g, '');

  return `
    export default (function() {
      var tempNode = document.createElement('div');
      tempNode.innerHTML = '${trimmed}';

      return tempNode.firstChild;
    })();
  `;
}

export default svgElementLoader;
