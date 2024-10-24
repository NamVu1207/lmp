export const getFormData = (target) => {
  const inputNames = [];
  const formData = new FormData(target);

  for (const item of target) {
    inputNames.push(item.name);
  }

  return inputNames.reduce((prevValue, currentValue) => {
    return {
      ...prevValue,
      [currentValue]: formData.get(currentValue),
    };
  }, {});
};
