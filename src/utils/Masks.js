export const maskPostcode = (postcode) => {
  if (!postcode) return "";

  const parsedPostcode = postcode.replace(/\D+/g, "");

  const firstPart = parsedPostcode.slice(0, 5);
  const lastPart = parsedPostcode.slice(5);

  if (postcode.length > 5) {
    return `${firstPart}-${lastPart}`;
  }

  return `${firstPart}${lastPart}`;
};
