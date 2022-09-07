export default function constructorItemPrice(item) {
  return item.absolutePrice || item.relativePrice;
}
