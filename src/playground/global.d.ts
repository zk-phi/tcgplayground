/// <reference types="vite/client" />

type MouseEventHandler = (e: MouseEvent) => void;

// --- game state

type StackAttributes = {
  flipped: boolean,
  reversed: boolean,
  tapped: boolean,
  laid: boolean,
};

type Stack = StackAttributes & { id: number, cards: string[] };

// --- game configurations

type Handlers = {
  onClick?: MouseEventHandler,
  onContextMenu?: MouseEventHandler,
  onDragStart?: MouseEventHandler,
  onDragEnter?: MouseEventHandler,
  onDragLeave?: MouseEventHandler,
  onDragOver?: MouseEventHandler,
  onDrop?: MouseEventHandler,
  draggable?: boolean,
};

type IndexedHandlers = (ix: number) => Handlers;

type AreaHandlers = {
  area: Handlers,
  stack: IndexedHandlers,
};

type HandlerConfig = { [K in string]: AreaHandlers };

type Area = {
  area: string,
  label: string,
  width?: number,
  stacked?: boolean,
  expandThreshold?: number,
  optional?: boolean,
};

type LayoutRow = (Area | LayoutConfig)[];
type LayoutConfig = LayoutRow[];

type Configuration = { layout: LayoutConfig, handlers: HandlerConfig };
