// helper function to compare 2 strings and find the difference between them
function getDifference(a, b)  {
  var i = 0;
  var j = 0;
  var result = "";
  while (j < b.length)
  {
   if (a[i] != b[j] || i == a.length) 
      result += b[j];
   else
      i++;
   j++;
  }
  return result;
}

export default getDifference