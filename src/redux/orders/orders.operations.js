import {getItems, setItems, client} from '../../utils/client'
import { gql } from '@apollo/client';

export const getOrderById = (id) => {
  const query = `
    query getOrder($id:ID!){
  getOrderById(id: $id) {
    ...on Order {
      _id
      status
      user {
        firstName
        lastName
        patronymicName
        email
        phoneNumber
      }
      dateOfCreation
      lastUpdatedDate
      adminComment
      userComment
      cancellationReason
      delivery {
        sentOn
        sentBy
        invoiceNumber
        courierOffice
        byCourier
        cost {
          currency
          value
        }
      }
      address {
        country
        region
        city
        zipcode
        street
        buildingNumber
        appartment
      }
      items {
        name {
          lang
          value
        }
        category{
          lang
          value
        }
        subcategory{
          lang
          value
        }
        model{
          lang
          value
        }
        colors{
          lang
          value
        }
        pattern{
          lang
          value
        }
        closure{
          lang
          value
        }
        closureColor
        size{
          heightInCm
          widthInCm
          depthInCm
          volumeInLiters
          weightInKg
          available
          additionalPrice {
            value
            currency
          }
          name
        }
        bottomMaterial{
          lang
          value
        }
        bottomColor{
          lang
          value
        }
        additions{
          lang
          value
        }
        actualPrice{
          currency
          value
        }
        quantity
      }
      totalItemsPrice {
        currency
        value
      }
      totalPriceToPay {
        currency
        value
      }
      isPaid
      paymentMethod
    }
    ...on Error {
      statusCode
      message
    }
  }
}
  `;
  return getItems(query, { id });
};

export const updateOrder = (data)=> {
  const query = `
    mutation updateOrder($id: ID!, $order:OrderInput!){
  updateOrder(id:$id,order:$order) {
  ...on Order {
      _id
      status
      user {
        firstName
        lastName
        patronymicName
        email
        phoneNumber
      }
      dateOfCreation
      lastUpdatedDate
      adminComment
      userComment
      cancellationReason
      delivery {
        sentOn
        sentBy
        invoiceNumber
        courierOffice
        byCourier
        cost {
          currency
          value
        }
      }
      address {
        country
        region
        city
        zipcode
        street
        buildingNumber
        appartment
      }
      items {
        name {
          lang
          value
        }
        category{
          lang
          value
        }
        subcategory{
          lang
          value
        }
        model{
          lang
          value
        }
        colors{
          lang
          value
        }
        pattern{
          lang
          value
        }
        closure{
          lang
          value
        }
        closureColor
        size{
          heightInCm
          widthInCm
          depthInCm
          volumeInLiters
          weightInKg
          available
          additionalPrice {
            value
            currency
          }
          name
        }
        bottomMaterial{
          lang
          value
        }
        bottomColor{
          lang
          value
        }
        additions{
          lang
          value
        }
        actualPrice{
          currency
          value
        }
        quantity
      }
      totalItemsPrice {
        currency
        value
      }
      totalPriceToPay {
        currency
        value
      }
      isPaid
      paymentMethod
    }
    ...on Error {
      statusCode
      message
    }
  }
}
  `
  return setItems(query,data)
}

export const getAllOrders = async (skip, limit) => {
  const result = await client.query({
    query: gql`
      query getPaginatedOrders($limit: Int, $skip: Int) {
        getAllOrders(limit: $limit, skip: $skip) {
          items {
            _id
            status
            dateOfCreation
            totalItemsPrice {
              currency
              value
            }
            totalPriceToPay {
              currency
              value
            }
          }
          count
        }
      }
    `,
    variables: {
      skip,
      limit
    }
  });
  const { data } = result;
  return data.getAllOrders;
};
