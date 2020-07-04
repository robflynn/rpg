export const forEach = (array, callback) => {
  for (var n = 0; n < array.length; n++) {
    let item = array[n]

    callback(item)
  }
}