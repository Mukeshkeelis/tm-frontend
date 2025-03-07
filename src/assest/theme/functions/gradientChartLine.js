

/**
  The gradientChartLine() function helps you to create a gradient color for the chart line
 */


import rgba from "../../theme/functions/rgba";

function gradientChartLine(chart, color, opacity = 1) {
  const ctx = chart.getContext("2d");
  const gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
  const primaryColor = rgba(color, opacity).toString();

  gradientStroke.addColorStop(1, '#2e7d32');
  gradientStroke.addColorStop(0.3, '#1b5e20');
  gradientStroke.addColorStop(0, "#073A0E");

  return gradientStroke;
}

export default gradientChartLine;
