import D3Node from 'd3-node';
import { loadExistingData } from '../utils/data';

function downsampleData(data: any[], maxPoints: number) {
  const sampledData = [];
  const step = Math.ceil(data.length / maxPoints);

  for (let i = 0; i < data.length; i += step) {
    sampledData.push(data[i]);
  }

  return sampledData;
}

export function generateGraph(): string {
  const data = loadExistingData();

  // Set the dimensions and margins of the graph
  const margin = { top: 60, right: 30, bottom: 50, left: 60 };
  const width = 1280 - margin.left - margin.right;
  const height = 800 - margin.top - margin.bottom;

  // Calculate maxPoints based on the width of the graph (e.g., 1 point per 10 pixels)
  const maxPoints = Math.floor(width / 30);

  // Apply downsampling if necessary
  let sampledData = data;
  if (data.length > maxPoints) {
    sampledData = downsampleData(data, maxPoints);
  }

  const d3n = new D3Node(); // Create a D3 Node instance
  const d3 = d3n.d3;

  // Parse the date and price data
  const xExtent = d3.extent(sampledData, d => new Date(d.date));
  const yExtent = d3.extent(sampledData, d => d.price);

  // Expand the yExtent slightly to improve visibility
  const yPadding = (yExtent[1] - yExtent[0]) * 0.02; // Use a smaller padding to capture small variations
  const yDomain = [yExtent[0] - yPadding, yExtent[1] + yPadding];

  const x = d3.scaleTime()
    .domain(xExtent as [Date, Date])
    .range([0, width]);

  const y = d3.scaleLinear()
    .domain(yDomain as [number, number])
    .range([height, 0]);

  // Create the SVG container
  const svg = d3n.createSVG(width + margin.left + margin.right, height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // Add X axis
  svg.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(x).ticks(6).tickFormat((domainValue, _) => d3.timeFormat("%b %d, %H:%M")(domainValue as Date)));

  // Add Y axis with a custom format to show more decimal places
  svg.append('g')
    .call(d3.axisLeft(y).ticks(6).tickFormat(d => (d as number).toFixed(6))); // Converting to number before formatting

  // Add the line for price with smoother stroke
  svg.append('path')
    .datum(sampledData)
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 2)
    .attr('d', d3.line<any>()
      .x(d => x(new Date(d.date)))
      .y(d => y(d.price))
    );

  // Add points to the line with smaller radius and better colors
  svg.selectAll('dot')
    .data(sampledData)
    .enter().append('circle')
    .attr('cx', d => x(new Date(d.date)))
    .attr('cy', d => y(d.price))
    .attr('r', 2.5)
    .attr('fill', d => d.valueChange >= 0 ? 'green' : 'red');

  // Add title
  svg.append('text')
    .attr('x', (width / 2))             
    .attr('y', 0 - (margin.top / 2))
    .attr('text-anchor', 'middle')  
    .style('font-size', '20px')
    .style('font-weight', 'bold')
    .text('Preço do Dólar ao Longo do Tempo');

  // Add X axis label
  svg.append('text')
    .attr('x', (width / 2))
    .attr('y', height + margin.bottom - 10)
    .attr('text-anchor', 'middle')
    .style('font-size', '14px')
    .text('Data');

  // Add Y axis label
  svg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - margin.left + 15)
    .attr('x', 0 - (height / 2))
    .attr('text-anchor', 'middle')
    .style('font-size', '14px')
    .text('Preço (R$)');

  // Add grid lines with more subtle appearance
  svg.append('g')
    .attr('class', 'grid')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(x)
      .ticks(6)
      .tickSize(-height)
      .tickFormat('' as any)
    );

  svg.append('g')
    .attr('class', 'grid')
    .call(d3.axisLeft(y)
      .ticks(6)
      .tickSize(-width)
      .tickFormat('' as any)
    );

  // Optionally, remove the trend line if not useful
  // Return the generated SVG as a string
  return d3n.svgString();
}
