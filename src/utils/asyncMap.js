export default async function (arr, callback) {
  return await Promise.all(arr.map(callback));
}
