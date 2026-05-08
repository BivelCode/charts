export interface SeriesData {
  legend: string;
  color?: string;
  values: (number | null | 'empty')[];
}

export interface Series {
  labels: string[];
  data: SeriesData[];
}

export interface RenderingBorderConfig {
  enabled?: boolean;
  width?: number;
  fill?: 'solid' | 'monochrome' | 'gradient';
  color?: string[];
  opacity?: number | number[];
}

export interface RenderingConfig {
  width?: number | 'auto';
  spacing?: number;
  fill?: 'solid' | 'monochrome' | 'gradient';
  colors?: string[] | string;
  opacity?: number | number[];
  radius?: number;
  radiusApplication?: 'start' | 'end' | 'both';
  emptyValue?: 'skip' | 'zero' | 'gap';
  border?: RenderingBorderConfig;
}

export interface GridAxisConfig {
  enabled?: boolean;
  position?: 'bottom' | 'top' | 'left' | 'right';
  tickLength?: number;
  tickColor?: string;
  tickWidth?: number;
  lineEnabled?: boolean;
  lineColor?: string;
  lineWidth?: number;
}

export interface GridConfig {
  enabled?: boolean;
  stroke?: string;
  strokeWidth?: number;
  dashArray?: string;
  xAxis?: GridAxisConfig;
  yAxis?: GridAxisConfig;
}

export interface TextStyleConfig {
  enabled?: boolean;
  position?: 'top' | 'bottom';
  align?: 'left' | 'center' | 'right';
  fontFamily?: string;
  fontWeight?: string | number;
  fontSize?: number;
  foreColor?: string[];
}

export interface DataLabelsConfig {
  enabled?: boolean;
  position?: 'top' | 'center' | 'bottom';
  fontFamily?: string;
  fontWeight?: string | number;
  fontSize?: number;
  foreColor?: string[];
  format?: (value: number) => string;
}

export interface LegendConfig {
  enabled?: boolean;
  position?: 'bottom';
  align?: 'left' | 'center' | 'right';
  fontFamily?: string;
  fontWeight?: string | number;
  fontSize?: number;
  foreColor?: string[];
  interactive?: boolean;
}

export interface AxisLabelConfig {
  enabled?: boolean;
  position?: 'top' | 'bottom';
  rotate?: number;
  fontFamily?: string;
  fontWeight?: string | number;
  fontSize?: number;
  foreColor?: string[];
}

export interface ChartConfig {
  type: 'column';
  subType?: 'basic' | 'stacked';
  title?: string;
  subtitle?: string;
  titleStyle?: TextStyleConfig;
  subtitleStyle?: TextStyleConfig;
  width?: string | number;
  height?: string | number;
  spacing?: number;
  padding?: { top: number; right: number; bottom: number; left: number };
  theme?: 'light' | 'dark' | string;
  responsive?: boolean;
  backgroundColor?: string;
  grid?: GridConfig;
  rendering?: RenderingConfig;
  dataLabels?: DataLabelsConfig;
  legend?: LegendConfig;
  xLabel?: AxisLabelConfig;
  yLabel?: AxisLabelConfig;
}

export interface Plugin {
  id: string;
  version: string;
  apiVersion: '1';
  hooks?: Record<string, unknown>;
}

export interface BivelChartsConfig {
  series: Series[];
  chart: ChartConfig;
  plugins?: Plugin[];
}
