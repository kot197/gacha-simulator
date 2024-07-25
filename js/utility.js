
export function isEmpty(value) {
    return (
      value === undefined || 
      value === null || 
      value === "" || 
      (Array.isArray(value) && value.length === 0) || 
      (typeof value === "object" && Object.keys(value).length === 0)
    );
}

export function removeElementsExceptByIds(containerId, keepIds) {
  const container = document.getElementById(containerId);
  const children = Array.from(container.children);

  children.forEach(child => {
      if (!keepIds.includes(child.id)) {
          container.removeChild(child);
      }
  });
}