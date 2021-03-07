export const list_to_obj = (lst, index_key) => {
  let obj = {};

  lst.forEach((item) => {
    if (obj[item[index_key]]) {
      obj[item[index_key]].push(item);
    } else {
      obj[item[index_key]] = [item];
    }
  });

  return obj;
};
