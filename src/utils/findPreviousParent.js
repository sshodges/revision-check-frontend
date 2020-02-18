const findPreviousParent = (parent, documents, folders) => {
  let item = folders.concat(documents).filter(item => item.id === parent);
  if (item.length === 0) {
    return 0;
  }
  return item[0].parent;
};

export default findPreviousParent;
