import { gql } from '@apollo/client';
import { client, getItems } from '../../utils/client';

const getAllOrders = async () => {
  const result = await client.query({
    query: gql`
        query {
        getAllOrders {
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
          userComment
          completed
          adminComment
          cancellationReason
          delivery {
            sentOn
            sentBy
            byCourier
            courierOffice
            invoiceNumber
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
            category {
              lang
              value
            }
            subcategory {
              lang
              value
            }
            model {
              lang
              value
            }
            name {
              lang
              value
            }
            colors {
              lang
              value
            }
            pattern {
              lang
              value
            }
            closure {
              lang
              value
            }
            closureColor
            size {
              heightInCm
              widthInCm
              depthInCm
              volumeInLiters
              weightInKg
            }
            bottomMaterial {
              lang
              value
            }
            bottomColor {
              lang
              value
            }
            additions {
              lang
              value
            }
            actualPrice {
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
          },
          paymentMethod,
          isPaid
        }
      }
    `
  });
  const { data } = result;
  return data.getAllOrders;
};

const getOrderById = (id) => {
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

export {
  getAllOrders,
  getOrderById
};