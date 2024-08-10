declare module 'd3-node' {
  import * as d3 from 'd3';

  class D3Node {
    constructor(options?: {
      selector?: string;
      styles?: string;
      container?: string;
      svgStyles?: string;
      d3Module?: typeof d3;
    });

    d3: typeof d3;
    document: Document;
    window: Window;
    createSVG(width: number, height: number): d3.Selection<SVGSVGElement, unknown, null, undefined>;
    svgString(): string;
  }

  export default D3Node;
}
