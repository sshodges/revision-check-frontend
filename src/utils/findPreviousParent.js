const findPreviousParent = (parent, documents, folders) => {
  let item = folders.concat(documents).filter((item) => item._id === parent);
  if (item.length === 0) {
    return null;
  }
  return item[0].parent;
};

export default findPreviousParent;
