import {createUploadLink} from 'apollo-upload-client';
import {ApolloClient, gql, InMemoryCache} from '@apollo/client';

import {getFromLocalStorage} from '../services/local-storage.service.js';
import {config} from '../configs';
import {LOCAL_STORAGE} from '../consts/local-storage';
import {AUTH_ERRORS} from "../error-messages/auth";
import regenerateAuthTokens from "../helpers/regenerateAuthTokenPair";

const introspectionResult = require('../fragmentTypes.json');
const {IntrospectionFragmentMatcher} = require('apollo-cache-inmemory');

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: introspectionResult
});

export const REACT_APP_API_URL =
    window.env && window.env.REACT_APP_API_URL
        ? window.env.REACT_APP_API_URL
        : process.env.REACT_APP_API_URL;

export const client = new ApolloClient({
    link: createUploadLink({uri: REACT_APP_API_URL}),
    cache: new InMemoryCache({
        addTypename: false,
        fragmentMatcher
    })
});

const formError = (err) => err.message.replace('GraphQL error: ', '');

export const getItems = async (query, variables = {}) => {
    try {
        const token = getFromLocalStorage(LOCAL_STORAGE.AUTH_ACCESS_TOKEN);

        const queryResult = await client.query({
            query: gql`
                ${query}
                `,
            variables,
            context: {
                headers: {
                    token
                }
            },
            fetchPolicy: config.fetchPolicy
        });

        if (queryResult['data'] &&
            Object.values(queryResult['data'])[0]?.message === AUTH_ERRORS.ACCESS_TOKEN_IS_NOT_VALID) {

            const tokenResult = await regenerateAuthTokens();

            if (tokenResult) {
                return await getItems(query, variables);
            }

        } else {
            return queryResult
        }
    } catch (e) {
        throw  new Error(`Помилка: ${config.errorMessages[formError(e)]}`);
    }

};

export const setItems = async (query, variables) => {
    try {
        const token = getFromLocalStorage(LOCAL_STORAGE.AUTH_ACCESS_TOKEN);

        const mutationResult = await client.mutate({
            mutation: gql`
               ${query}
             `,
            variables,
            context: {
                headers: {
                    token
                }
            },
            fetchPolicy: config.fetchPolicy
        });

        if (mutationResult['data'] &&
            Object.values(mutationResult['data'])[0]?.message === AUTH_ERRORS.ACCESS_TOKEN_IS_NOT_VALID) {

            const tokenResult = await regenerateAuthTokens();

            if (tokenResult) {
                return await setItems(query, variables);
            }

        } else {
            return mutationResult
        }
    } catch (e) {
        throw new Error(`Помилка: ${config.errorMessages[formError(e)]}`);
    }
};
