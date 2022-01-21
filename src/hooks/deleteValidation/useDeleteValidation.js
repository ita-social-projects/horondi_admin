import { useEffect, useState } from 'react';

function useDeleteValidation(queryFunction) {
  const [products, setProducts] = useState([]);
  const [queryData, getQueryData] = useState(false);

  const toggleRerender = () => getQueryData((prev) => !prev);
  useEffect(() => {
    async function fetchData() {
      handleData(await queryFunction());
    }
    fetchData();
  }, [queryData]);

  const handleData = (data) => {
    setProducts(
      data.items.map((item) => {
        const stringifiedItem = JSON.stringify(item);
        const ids = stringifiedItem
          .match(/"(_id)":"\d.{24}/gi)
          .map((el) => el.split(':')[1].replace(/"/gi, ''));
        return { _id: item._id, itemName: item.name[0], ids };
      })
    );
  };

  const deleteValidation = (id) =>
    products.map((item) =>
      item.ids.map(
        (_id) => id === _id && { itemName: item.itemName, itemId: item._id }
      )
    );
  return { deleteValidation, toggleRerender };
}
export default useDeleteValidation;
