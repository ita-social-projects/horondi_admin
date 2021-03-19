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
    },
    fetchPolicy: 'no-cache'
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

export const getNovaPoshtaCities = async (city) => {
  const res = await client.query({
    variables: {
      city
    },
    query: gql`
      query($city: String) {
        getNovaPoshtaCities(city: $city) {
          description
        }
      }
    `,
    fetchPolicy: 'no-cache'
  });
  return res.data.getNovaPoshtaCities;
};
export const getNovaPoshtaWarehouses = async (city) => {
  const result = await client.query({
    variables: {
      city
    },
    query: gql`
      query($city: String) {
        getNovaPoshtaWarehouses(city: $city) {
          description
        }
      }
    `,
    fetchPolicy: 'no-cache'
  });

  return result.data.getNovaPoshtaWarehouses;
};

export const getUkrPostRegions = async () => {
  const res = await client.query({
    query: gql`
      query {
        getUkrPoshtaRegions {
          REGION_UA
          REGION_ID
        }
      }
    `,
    fetchPolicy: 'no-cache'
  });
  return res.data.getUkrPoshtaRegions;
};

export const getUkrPoshtaDistrictsByRegionId = async (id) => {
  const res = await client.query({
    variables: {
      id
    },
    query: gql`
      query($id: ID!) {
        getUkrPoshtaDistrictsByRegionId(id: $id) {
          DISTRICT_UA
          DISTRICT_ID
        }
      }
    `,
    fetchPolicy: 'no-cache'
  });
  return res.data.getUkrPoshtaDistrictsByRegionId;
};

export const getUkrPoshtaCitiesByDistrictId = async (id) => {
  const res = await client.query({
    variables: {
      id
    },
    query: gql`
      query($id: ID!) {
        getUkrPoshtaCitiesByDistrictId(id: $id) {
          CITY_UA
          CITY_ID
        }
      }
    `,
    fetchPolicy: 'no-cache'
  });
  return res.data.getUkrPoshtaCitiesByDistrictId;
};
export const getUkrPoshtaPostOfficesByCityId = async (id) => {
  const res = await client.query({
    variables: {
      id
    },
    query: gql`
      query($id: ID!) {
        getUkrPoshtaPostofficesCityId(id: $id) {
          POSTCODE
          STREET_UA_VPZ
        }
      }
    `,
    fetchPolicy: 'no-cache'
  });
  return res.data.getUkrPoshtaPostofficesCityId;
};
