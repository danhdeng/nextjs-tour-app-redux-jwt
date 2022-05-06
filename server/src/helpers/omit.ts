/* eslint-disable arrow-spacing */
/* eslint-disable space-before-blocks */
/* eslint-disable space-before-function-paren */
/* eslint-disable semi */

function omit<T>(obj: T, property: keyof T | (keyof T)[]) {
  if (Array.isArray(property)) {
    const entries = Object.entries(obj).filter((item: any) => {
      const [key] = item.key;
      return !property.includes(key as keyof T);
    });
    return Object.fromEntries(entries);
  }
  const { [property]: unused, ...rest } = obj;
  return rest;
}

export default omit;
