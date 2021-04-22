import { getItems, setItems } from '../../utils/client';

const getAllEmailQuestions = async ({ filter, skip }) => {
  const query = `
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
    `;

  const { data } = await getItems(query, {
    filter: {
      emailQuestionStatus: filter.length ? filter : null
    },
    skip
  });

  return data.getAllEmailQuestions;
};
const getPendingEmailQuestionsCount = async () => {
  const query = `
      query {
        getPendingEmailQuestionsCount
      }
    `;

  const { data } = await getItems(query);

  return data.getPendingEmailQuestionsCount;
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

  const { data } = await getItems(query, { id });

  return data.getEmailQuestionById;
};
const deleteEmailQuestions = async (questionsToDelete) => {
  const query = `
      mutation($questionsToDelete: [String]) {
        deleteEmailQuestions(questionsToDelete: $questionsToDelete) {
          _id
        }
      }
    `;

  const { data } = await setItems(query, { questionsToDelete });

  return data.deleteEmailQuestions;
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

  const { data } = await setItems(query, { questionId, adminId, text });

  return data.answerEmailQuestion;
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

  const { data } = await setItems(query, { questionsToSpam, adminId });

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
