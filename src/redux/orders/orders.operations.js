import { gql } from '@apollo/client';
import { client, getItems } from '../../utils/client';

const getAllOrders = async (skip, limit, filter) => {
  const result = await client.query({
    query: gql`
      query($limit: Int, $skip: Int, $filter: FilterInput) {
        getAllOrders(limit: $limit, skip: $skip, filter: $filter) {
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
      limit,
      filter: {
        orderStatus: filter.length ? filter : null
      }
    }
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

export { getAllOrders, getOrderById };
