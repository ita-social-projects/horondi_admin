import { getItems, setItems } from '../../utils/client';

export const getOrderById = (id) => {
  const query = `
		query ($id:ID!){
			getOrderById(id: $id) {
				...on Order {
					status
					recipient {
						firstName
						lastName
						email
						phoneNumber
					}
					user_id
					userComment
					delivery {
						sentOn
						sentBy
						invoiceNumber
						courierOffice
						region
						district
						city
						regionId
						districtId
						cityId
						street
						house
						flat
						byCourier
						messenger
  					messengerPhone
  					worldWideCountry
  					stateOrProvince
  					worldWideCity
  					worldWideStreet
  					cityCode
						cost
					}
					items {
						product {
							_id
							basePrice
							name {
								lang
								value
							}
							description {
								lang
								value
							}
							pattern {
								name {
									value
								}
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
						fixedPrice
					}
					itemsPriceWithDiscount
					promoCodeId
					certificateId
					itemsDiscount
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
					recipient {
						firstName
						lastName
						email
						phoneNumber
					}
					user_id
					userComment
					delivery {
						sentOn
						sentBy
						invoiceNumber
						courierOffice
						region
						district
						regionId
						districtId
						cityId
						city
						street
						house
						flat
						messenger
						messengerPhone
						worldWideCountry
						stateOrProvince
						worldWideCity
						worldWideStreet
						cityCode
						byCourier
						cost
					}
					items {
						product {
							_id
							basePrice
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
								name
							}
							sidePocket
						}
						isFromConstructor
						fixedPrice
					}
					paymentMethod
					paymentStatus
					isPaid
					itemsPriceWithDiscount
					promoCodeId
					itemsDiscount
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

export const addOrder = (order) => {
  const query = `
  mutation($order: OrderInput!) {
	addOrder(order: $order) {
	  ... on Order {
		_id
		items {
		  product {
			name {
			  lang
			  value
			}
			images {
			  primary {
				thumbnail
			  }
			}
		  }
		  fixedPrice
		  quantity
		  options {
			size {
			  name
			}
		  }
		}
		totalItemsPrice
		totalPriceToPay
		fixedExchangeRate
		fixedExchangeRate
		paymentStatus
	  }
	  ... on Error {
		statusCode
		message
	  }
	}
  }
  `;
  return setItems(query, { order });
};

export const getAllOrders = async (skip, limit, filter, sort) => {
  const query = `
  query($limit: Int, $skip: Int, $filter: OrderFilterInput, $sort: JSONObject) {
	getAllOrders(limit: $limit, skip: $skip, filter: $filter, sort: $sort) {
	  items {
		_id
		recipient {
		  firstName
		  lastName
		  email
		  phoneNumber
		}
		user_id
		status
		paymentStatus
		orderNumber
		dateOfCreation
		totalItemsPrice
		totalPriceToPay
		fixedExchangeRate
	  }
	  count
	}
  }
    `;

  const result = await getItems(query, {
    skip,
    limit,
    filter,
    sort
  });

  return result?.data?.getAllOrders;
};

export const getOrdersByUser = async (skip, limit, filter, sort, userId) => {
  const query = `
      query($limit: Int, $skip: Int, $filter: OrderFilterInput, $sort:JSONObject, $userId: ID!) {
        getOrdersByUser(limit: $limit, skip: $skip, filter: $filter, sort: $sort, userId: $userId) {
          items {
            _id
            recipient {
              firstName
              lastName
              email
              phoneNumber
            }
			user_id
            status
            paymentStatus
            orderNumber
            dateOfCreation
            totalItemsPrice
            totalPriceToPay
			fixedExchangeRate
          }
          count
        }
      }
    `;

  const result = await getItems(query, {
    skip,
    limit,
    filter,
    sort,
    userId
  });

  return result?.data?.getOrdersByUser;
};

export const deleteOrder = async (id) => {
  const query = `
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
    `;

  const result = await setItems(query, { id });

  return result?.data?.deleteOrder;
};

export const getNovaPoshtaCities = async (city) => {
  const query = `
      query($city: String) {
        getNovaPoshtaCities(city: $city) {
          description
		  cityID
        }
      }
    `;
  const result = await getItems(query, { city });

  return result?.data?.getNovaPoshtaCities;
};
export const getNovaPoshtaWarehouses = async (city) => {
  const query = `
      query($city: String) {
        getNovaPoshtaWarehouses(city: $city) {
          description
		  number
        }
      }
    `;

  const result = await getItems(query, { city });

  return result?.data?.getNovaPoshtaWarehouses;
};

export const getUkrPostRegions = async () => {
  const query = `
      query {
        getUkrPoshtaRegions {
          REGION_UA
          REGION_ID
        }
      }
    `;
  const result = await getItems(query);

  return result?.data?.getUkrPoshtaRegions;
};

export const getUkrPoshtaDistrictsByRegionId = async (id) => {
  const query = `
      query($id: ID!) {
        getUkrPoshtaDistrictsByRegionId(id: $id) {
          DISTRICT_UA
          DISTRICT_ID
        }
      }
    `;
  const result = await getItems(query, { id });

  return result?.data?.getUkrPoshtaDistrictsByRegionId;
};

export const getUkrPoshtaCitiesByDistrictId = async (id) => {
  const query = `
      query($id: ID!) {
        getUkrPoshtaCitiesByDistrictId(id: $id) {
          CITY_UA
          CITY_ID
        }
      }
    `;
  const result = await getItems(query, { id });

  return result?.data?.getUkrPoshtaCitiesByDistrictId;
};
export const getUkrPoshtaPostOfficesByCityId = async (id) => {
  const query = `
      query($id: ID!) {
        getUkrPoshtaPostofficesCityId(id: $id) {
          POSTCODE
          STREET_UA_VPZ
        }
      }
    `;
  const result = await getItems(query, { id });

  return result?.data?.getUkrPoshtaPostofficesCityId;
};
