export const globalDragEndHooks = [];
export const globalClickHooks = [];

export const globalHandlers = {
  onDragEnd: (e) => {
    globalDragEndHooks.forEach(hook => hook(e));
    e.stopPropagation();
  },
  onClick: (e) => {
    globalClickHooks.forEach(hook => hook(e));
    e.stopPropagation();
  },
};
