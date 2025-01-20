export const globalDragEndHooks: MouseEventHandler[] = [];
export const globalClickHooks: MouseEventHandler[] = [];

export const globalHandlers = {
  onDragEnd: (e: MouseEvent) => {
    for (const hook of globalDragEndHooks) {
      hook(e);
    }
    e.stopPropagation();
  },
  onClick: (e: MouseEvent) => {
    for (const hook of globalClickHooks) {
      hook(e);
    }
    e.stopPropagation();
  },
};
