import { gql } from '@apollo/client';
import { getItems, setItems, client } from '../../utils/client';

export const getOrderById = (id) => {
  const query = `
		query ($id:ID!){
			getOrderById(id: $id) {
				...on Order {
					status
					user {
						firstName
						lastName
						email
						phoneNumber
					}
					userComment
					delivery {
						sentOn
						sentBy
						invoiceNumber
						courierOffice
						city
						street
						house
						flat
						byCourier
						cost {
							currency
							value
						}
					}
					items {
						product {
							_id
							basePrice {
								currency
								value
							}
							name {
								lang
								value
							}
							description {
								lang
								value
							}  
						}
						model {
							_id
							category {
								_id
								name {
									value
								}
							}
						}
						options {
							size {
								_id
								name
							}
							sidePocket
						}
						quantity
						 constructorBasics {
							_id
							name {
								lang
								value
							}
						}
						constructorPattern {
							_id
							name{
								value
							}
						}
						constructorFrontPocket {
							_id
							name {
								value
							}
						}
						constructorBottom {
							_id
							name {
								value
							}
						}
						isFromConstructor
						fixedPrice {
							currency
							value
						}
					}
					paymentMethod
					paymentStatus
					isPaid
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

export const updateOrder = (order, id) => {
  const query = `
		mutation ($order: OrderInput!, $id:ID!) {
			updateOrder (order: $order, id: $id) {
				...on Order {
					_id
					status
					user {
						firstName
						lastName
						email
						phoneNumber
					}
					userComment
					delivery {
						sentOn
						sentBy
						invoiceNumber
						courierOffice
						city
						street
						house
						flat
						byCourier
						cost {
							currency
							value
						}
					}
					items {
						product {
							_id
							basePrice {
								currency
								value
							}
							name {
								lang
								value
							}
							description {
								lang
								value
							}  
						}
						quantity
						options {
							size {
								_id
							}
							sidePocket
						}
						isFromConstructor
						fixedPrice {
							currency
							value
						}
					}
					paymentMethod
					paymentStatus
					isPaid
				}
				...on Error {
					statusCode
					message
				}
			}
		}
  `;
  return setItems(query, { order, id });
};

export const getAllOrders = async (skip, limit, filter) => {
  const result = await client.query({
    query: gql`
      query($limit: Int, $skip: Int, $filter: FilterInput) {
        getAllOrders(limit: $limit, skip: $skip, filter: $filter) {
          items {
            _id
            status
            orderNumber
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

export const deleteOrder = async (id) => {
  const result = await client.mutate({
    variables: { id },
    mutation: gql`
      mutation($id: ID!) {
        deleteOrder(id: $id) {
          ... on Order {
            _id
            orderNumber
            status
          }
          ... on Error {
            statusCode
            message
          }
        }
      }
    `,
    fetchPolicy: 'no-cache'
  });
  await client.resetStore();

  if (result.data.deleteOrder.message) {
    throw new Error(
      `${result.data.deleteOrder.statusCode} ${result.data.deleteOrder.message}`
    );
  }

  return result.data.deleteOrder;
};
