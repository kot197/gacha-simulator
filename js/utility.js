
export function isEmpty(value) {
    return (
      value === undefined || 
      value === null || 
      value === "" || 
      (Array.isArray(value) && value.length === 0) || 
      (typeof value === "object" && Object.keys(value).length === 0)
    );
}