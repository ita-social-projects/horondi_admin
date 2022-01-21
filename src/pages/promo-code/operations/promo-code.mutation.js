import { gql } from '@apollo/client';

export const addPromoCodes = gql`
  mutation ($promoCode: PromoCodeInput!) {
    addPromoCode(promoCode: $promoCode) {
      ... on PromoCode {
        _id
      }
    }
  }
`;

export const deletePromoCodeByID = gql`
  mutation ($id: ID!) {
    deletePromoCode(id: $id) {
      ... on PromoCode {
        _id
      }
    }
  }
`;
