export const safelyParseJson = (stringToParse) => {
  let result;
  try {
    result = JSON.parse(stringToParse || '');
  } catch (err) { /**/ }

  return result;
};
