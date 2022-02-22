function findSum(n) {
  let x = 0, i = 1;
  while (i <= n) {
      if (i % 3 === 0 || i % 5 === 0) {
          x += i;
      };
      ++i;
  }
  /*
  for (let i = 0; i <= n; ++i) {
    if (i % 3 === 0) {
      x += i;
    }
    else if (i % 5 === 0) {
      x += i;
    }
*/
 return x;
}

console.log(findSum(15))