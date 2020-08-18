export const shortAnimeName = (name, size) => {
  name = name.toLowerCase();
  name = name.charAt(0).toUpperCase() + name.slice(1);
  if (name.length < size) {
    return name;
  } else {
    return name.substr(0, size) + '...';
  }
};

export const filterString = (string) => {
  return string.replace(/[|&;$%@"<>()+,]/g, '');
};
