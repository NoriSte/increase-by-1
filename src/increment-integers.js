
module.exports = array => {
  if(!array || !array.length || isNaN(parseInt(array[0]))) {
    return;
  }

  let result = [];
  let start = parseInt(array[0]);
  result.push(start);
  for(let i = 1, n = array.length; i < n; i++) {
      result.push(start + i);
  }
  return result;
};
