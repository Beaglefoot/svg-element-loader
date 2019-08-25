import ts from 'typescript';
import compiler from './compiler';

describe('svg-element-loader', () => {
  it('should compile', async () => {
    let didCompile = false;

    try {
      await compiler('fixtures/icon.svg');
      didCompile = true;
    } catch (err) {}

    expect(didCompile).toBe(true);
  });

  it('should output javascript code with export assignment', async () => {
    const stats = await compiler('fixtures/icon.svg');
    const output = stats.toJson().modules[0].source;

    const sourceFile = ts.createSourceFile('icon.svg', output, ts.ScriptTarget.ES2015);

    let hasExport = false;

    sourceFile.forEachChild(node => {
      if (node.kind === ts.SyntaxKind.ExportAssignment) {
        hasExport = true;
      }
    });

    expect(hasExport).toBe(true);
  });

  it('should hold SVG Element which can be inserted into DOM', async () => {
    const stats = await compiler('fixtures/icon.svg');
    const output = stats.toJson().modules[0].source;

    const sourceFile = ts.createSourceFile('icon.svg', output, ts.ScriptTarget.ES2015);

    let svg: SVGElement;

    sourceFile.forEachChild(node => {
      if (node.kind === ts.SyntaxKind.ExportAssignment) {
        // There has to be a way to traverse better than that...
        const iife = node.getChildAt(2, sourceFile).getText(sourceFile); // eslint-disable-line
        svg = eval(iife);
      }
    });

    document.body.appendChild(svg);

    const circle = document.querySelector('circle');
    expect(circle).toBeTruthy();
  });
});
