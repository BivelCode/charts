import type { BivelChartsConfig } from './config.js';

export interface NormalizedValue {
  raw: number | null;
  effective: number;
  isEmpty: boolean;
}

export interface NormalizedSeriesData {
  legend: string;
  color?: string;
  values: NormalizedValue[];
}

export interface NormalizedSeries {
  labels: string[];
  data: NormalizedSeriesData[];
}

export interface ComputedBar {
  dataIndex: number;
  seriesIndex: number;
  value: number;
  stackBase: number;
  stackTop: number;
  isEmpty: boolean;
}

export interface ComputedData {
  bars: ComputedBar[];
  minValue: number;
  maxValue: number;
  labelCount: number;
  seriesCount: number;
}

export interface BarRect {
  x: number;
  y: number;
  width: number;
  height: number;
  dataIndex: number;
  seriesIndex: number;
  isEmpty: boolean;
  color: string;
  radius: number;
  radiusApplication: 'start' | 'end' | 'both';
  opacity: number;
  borderEnabled: boolean;
  borderWidth: number;
  borderColor: string;
  borderOpacity: number;
}

export interface YTick {
  value: number;
  y: number;
  label: string;
}

export interface LayoutData {
  chartArea: { x: number; y: number; width: number; height: number };
  bars: BarRect[];
  xScale: (index: number) => number;
  yScale: (value: number) => number;
  groupWidth: number;
  barWidth: number;
  yTicks: YTick[];
}

export interface GridLineData {
  x1: number; y1: number; x2: number; y2: number;
  stroke: string;
  strokeWidth: number;
  dashArray: string;
}

export interface GridRenderData {
  lines: GridLineData[];
}

export interface AxisLineData {
  x1: number; y1: number; x2: number; y2: number;
  color: string;
  width: number;
}

export interface TickRenderData {
  x1: number; y1: number; x2: number; y2: number;
  color: string;
  width: number;
}

export interface AxesRenderData {
  xLine: AxisLineData | null;
  yLine: AxisLineData | null;
  xTicks: TickRenderData[];
  yTicks: TickRenderData[];
}

export interface LabelTextData {
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  fontWeight: string | number;
  fill: string;
  rotate: number;
  anchor: 'start' | 'middle' | 'end';
}

export interface LabelsRenderData {
  xLabels: LabelTextData[];
  yLabels: LabelTextData[];
}

export interface TitleTextData {
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  fontWeight: string | number;
  fill: string;
  anchor: 'start' | 'middle' | 'end';
}

export interface TitlesRenderData {
  title: TitleTextData | null;
  subtitle: TitleTextData | null;
}

export interface RenderInstructions {
  containerWidth: number;
  containerHeight: number;
  chartArea: { x: number; y: number; width: number; height: number };
  bars: BarRect[];
  yTicks: YTick[];
  categories: string[];
  labelPositions: number[];
  grid: GridRenderData;
  axes: AxesRenderData;
  axisLabels: LabelsRenderData;
  titles: TitlesRenderData;
  theme: 'light' | 'dark';
  backgroundColor: string;
}

export interface PipelineContext {
  config: BivelChartsConfig;
  containerWidth: number;
  containerHeight: number;
  normalized: NormalizedSeries | null;
  computed: ComputedData | null;
  layout: LayoutData | null;
  meta: Record<string, Record<string, unknown>>;
}
