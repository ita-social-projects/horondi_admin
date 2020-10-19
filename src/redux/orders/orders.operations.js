import {getItems,setItems} from '../../utils/client'

export const getOrderById = (id) => {
  const query = `
    query getOrder($id: ID){
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
