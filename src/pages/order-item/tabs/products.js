import React, {useState} from 'react';
import {useStyles} from '../order-item.styles';
import TableContainerGenerator from '../../../containers/table-container-generator';
import TableContainerRow from '../../../containers/table-container-row';
import { Modal } from '@material-ui/core';
import labels from '../../../configs/labels'
import tableHeadRowTitles from '../../../configs/table-head-row-titles';

const Products = ({data,setFieldValue}) => {
  const classes = useStyles()
  const {orderProduct, sizeValues} = labels
  const {items} = data
  const {orderProductTitles} = tableHeadRowTitles
  const initialItem = {additions:[],colors:[],size:{},closureColor:'',quantity:0}
  const [selectedItem, setSelectedItem] = useState(initialItem)
  const {additions,colors,size,closureColor,quantity,...rest} = selectedItem

  const productItems = items
    && items.map((product,index) => (
      <TableContainerRow
        key={product.name[0].value}
        num={index + 1}
        name={product.name[0].value}
        quantity={product.quantity}
        price={product.actualPrice[0].value*product.quantity+'₴'}
        showAvatar={false}
        deleteHandler={() => setFieldValue('items',items.filter(({name})=>name[0].value!==product.name[0].value))}
        editHandler={() => setSelectedItem(product)}
      />
    ))

  const renderList = (items, label) => {
    if (!items.length) return null;
    return (
      <div>
        <label htmlFor={label}><b>{label}:</b></label>
        <ul id={label} className={classes.renderList}>
          {items.map(item => (
            <li key={item[0].value}>{item[0].value}</li>
          ))}
        </ul>
      </div>
    );
  };

  const sizes = Object.entries(sizeValues).map(([key,value])=>[{value:`${value}: ${size[key]}`}])

  return (
    <div className={classes.products}>
      <TableContainerGenerator
        id='contactTable'
        tableTitles={orderProductTitles}
        tableItems={productItems}
      />
      <Modal
        open={!!selectedItem.name}
        onClose={()=>setSelectedItem(initialItem)}
      >
        <div className={classes.selectedProduct}>
          <h2 className={classes.productHeading}>{selectedItem.name && selectedItem.name[0].value}</h2>
          {selectedItem && Object.keys(rest).map(item => (
            <div className={classes.productField} key={item}>
              <label htmlFor={item}>
                <b>{orderProduct[item]+':'}</b>
              </label>
              <span id={item}>{selectedItem[item].length ? selectedItem[item][0].value : 'Не вказано'}</span>
            </div>
          ))}
          <div className={classes.productField}>
            <label htmlFor='closureColor'>
              <b>Колір замка:</b>
            </label>
            <span id='closureColor'>{closureColor || 'Не вказано'}</span>
          </div>
          {renderList(additions,'Додатки')}
          {renderList(colors,'Кольори')}
          {renderList(sizes,'Розмір')}
        </div>
      </Modal>
    </div>
  );
};

export default Products;
