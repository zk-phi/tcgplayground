export const globalDragEndHooks: MouseEventHandler[] = [];
export const globalClickHooks: MouseEventHandler[] = [];

export const globalHandlers = {
  onDragEnd: (e: MouseEvent) => {
    globalDragEndHooks.forEach(hook => hook(e));
    e.stopPropagation();
  },
  onClick: (e: MouseEvent) => {
    globalClickHooks.forEach(hook => hook(e));
    e.stopPropagation();
  },
};
