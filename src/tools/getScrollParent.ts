const METRICS_BY_AXIS = {
  horizontal: {
    size: 'offsetWidth',
    scroll: 'scrollWidth',
  },
  vertical: {
    size: 'offsetHeight',
    scroll: 'scrollHeight',
  },
};

function isScrollable(node, axis, threshold = 5) {
  const m = METRICS_BY_AXIS[axis];

  return node[m.scroll] - node[m.size] > threshold;
}

export function getScrollParent(node, axis = 'vertical') {
  if (node == null) return null;
  if (node.tagName === 'BODY' || isScrollable(node, axis)) return node;

  return getScrollParent(node.parentNode, axis);
}
