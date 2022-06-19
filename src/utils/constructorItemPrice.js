export default function constructorItemPrice(item) {
  return item ? item.absolutePrice || item.relativePrice : null;
}
