import { gql } from '@apollo/client';
import { client } from '../../utils/client';

const getAllEmailQuestions = async ({ filter, skip }) => {
  const result = await client.query({
    variables: {
      filter: {
        emailQuestionStatus: filter.length ? filter : null
      },
      skip
    },
    query: gql`
      query($filter: FilterInput, $skip: Int) {
        getAllEmailQuestions(filter: $filter, skip: $skip) {
          questions {
            _id
            senderName
            email
            text
            date
            status
            answer {
              text
              date
            }
          }
          count
        }
      }
    `
  });

  const { data } = result;
  return data.getAllEmailQuestions;
};

const getPendingEmailQuestionsCount = async () => {
  const result = await client.query({
    query: gql`
      query {
        getPendingEmailQuestionsCount
      }
    `
  });

  const { data } = result;
  return data.getPendingEmailQuestionsCount;
};

const getEmailQuestionById = async (id) => {
  const result = await client.query({
    variables: {
      id
    },
    query: gql`
      query($id: ID!) {
        getEmailQuestionById(id: $id) {
          ... on EmailQuestion {
            _id
            senderName
            email
            text
            date
            status
            answer {
              admin {
                _id
                email
                firstName
                lastName
              }
              text
              date
            }
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `,
    fetchPolicy: 'no-cache'
  });
  const { data } = result;

  if (data.getEmailQuestionById.message) {
    throw new Error(
      `${data.getEmailQuestionById.statusCode} ${data.getEmailQuestionById.message}`
    );
  }

  return data.getEmailQuestionById;
};

const deleteEmailQuestions = async (questionsToDelete) => {
  const result = await client.mutate({
    variables: { questionsToDelete },
    mutation: gql`
      mutation($questionsToDelete: [String]) {
        deleteEmailQuestions(questionsToDelete: $questionsToDelete) {
          _id
        }
      }
    `,
    fetchPolicy: 'no-cache'
  });

  const { data } = result;
  return data.deleteEmailQuestions;
};

const answerEmailQuestion = async ({ questionId, adminId, text }) => {
  const result = await client.mutate({
    variables: {
      questionId,
      adminId,
      text
    },
    mutation: gql`
      mutation($questionId: ID!, $adminId: ID!, $text: String!) {
        answerEmailQuestion(
          questionId: $questionId
          adminId: $adminId
          text: $text
        ) {
          ... on EmailQuestion {
            _id
            senderName
            email
            text
            date
            status
            answer {
              admin {
                _id
                email
                firstName
                lastName
              }
              text
              date
            }
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `,
    fetchPolicy: 'no-cache'
  });

  const { data } = result;

  if (data.answerEmailQuestion.message) {
    throw new Error(
      `${data.answerEmailQuestion.statusCode} ${data.answerEmailQuestion.message}`
    );
  }

  return data.answerEmailQuestion;
};

const makeEmailQuestionsSpam = async ({ questionsToSpam, adminId }) => {
  const result = await client.mutate({
    variables: {
      questionsToSpam,
      adminId
    },
    mutation: gql`
      mutation($questionsToSpam: [String], $adminId: ID!) {
        makeEmailQuestionsSpam(
          questionsToSpam: $questionsToSpam
          adminId: $adminId
        ) {
          _id
          senderName
          email
          text
          date
          status
          answer {
            admin {
              _id
              email
              firstName
              lastName
            }
            text
            date
          }
        }
      }
    `,
    fetchPolicy: 'no-cache'
  });

  const { data } = result;
  return data.makeEmailQuestionsSpam;
};

export {
  getAllEmailQuestions,
  getEmailQuestionById,
  deleteEmailQuestions,
  makeEmailQuestionsSpam,
  answerEmailQuestion,
  getPendingEmailQuestionsCount
};
