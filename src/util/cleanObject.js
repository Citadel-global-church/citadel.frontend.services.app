export function cleanObject(obj) {
  const cleaned = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    if (value !== null && value !== undefined && value !== "") {
      cleaned[key] = value;
    }
  });
  console.log("🚀 ~ file: cleanObject.js:13 ~ cleanObject ~ cleaned:", cleaned);
  return cleaned;
}
