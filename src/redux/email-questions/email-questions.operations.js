import { getItems, setItems } from '../../utils/client';

const getAllEmailQuestions = async (filter, pagination) => {
  const query = `
      query($filter: FilterInput, $pagination: Pagination) {
        getAllEmailQuestions(filter: pagination: $pagination) {
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
    `;
  debugger;
  const result = await getItems(query, { filter, pagination });

  return result?.data?.getAllEmailQuestions;
};
const getPendingEmailQuestionsCount = async () => {
  const query = `
      query {
        getPendingEmailQuestionsCount
      }
    `;

  const result = await getItems(query);

  return result?.data?.getPendingEmailQuestionsCount;
};
const getEmailQuestionById = async (id) => {
  const query = `
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
    `;

  const result = await getItems(query, { id });

  return result?.data?.getEmailQuestionById;
};
const deleteEmailQuestions = async (questionsToDelete) => {
  const query = `
      mutation($questionsToDelete: [String]) {
        deleteEmailQuestions(questionsToDelete: $questionsToDelete) {
          _id
        }
      }
    `;

  const result = await setItems(query, { questionsToDelete });

  return result?.data?.deleteEmailQuestions;
};
const answerEmailQuestion = async ({ questionId, adminId, text }) => {
  const query = `
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
    `;

  const result = await setItems(query, { questionId, adminId, text });

  return result?.data?.answerEmailQuestion;
};
const makeEmailQuestionsSpam = async ({ questionsToSpam, adminId }) => {
  const query = `
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
    `;

  const result = await setItems(query, { questionsToSpam, adminId });

  return result?.data?.makeEmailQuestionsSpam;
};

export {
  getAllEmailQuestions,
  getEmailQuestionById,
  deleteEmailQuestions,
  makeEmailQuestionsSpam,
  answerEmailQuestion,
  getPendingEmailQuestionsCount
};
