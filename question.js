/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */

var rotate = function (matrix) {
  let rowObj = {};

  matrix.forEach((row, i) => {
    rowObj[i + 1] = row;
  });

  const answer = matrix.map((row, i) => {
    let newRow = [];
    let n = matrix.length;
    console.log(n);
    while (n > 0) {
      newRow.push(rowObj[n][i]);
      n--;
    }

    return newRow;
  });

  matrix.splice(0);
  matrix.push(...answer);
};
