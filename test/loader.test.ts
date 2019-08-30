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
        let svgElementBuilder: string;

        node.forEachChild(innerNode => {
          svgElementBuilder = innerNode.getText(sourceFile);
        });

        svg = eval(svgElementBuilder);
      }
    });

    document.body.appendChild(svg);

    const circle = document.querySelector('circle');
    expect(circle).toBeTruthy();
  });
});
