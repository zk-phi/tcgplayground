export const globalDragEndHooks = [];
export const globalClickHooks = [];

export const globalHandlers = {
  onDragEnd: (e) => globalDragEndHooks.forEach(hook => hook(e)),
  onClick: (e) => globalClickHooks.forEach(hook => hook(e)),
};
