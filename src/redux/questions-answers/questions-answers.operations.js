import { getItems, setItems } from '../../utils/client';

export const getAllQuestionsAnswers = async () => {
  const getAllQuestionsAnswersQuery = `
  query {
    getAllQuestionsAnswers {
      items {
        _id
        question {
            lang
            value
        }
        answer {
            lang
            value
        }
        translationsKey
      }
    }
  }
    `;

  const result = await getItems(getAllQuestionsAnswersQuery);

  return result?.data?.getAllQuestionsAnswers;
};
export const getQuestionsAnswersById = async (id) => {
  const getQuestionsAnswersByIdQuery = `
  query($id: ID!) {
    getQuestionsAnswersById(id: $id) {
        ... on QuestionsAnswers {
        _id
        question {
          value
        }
        answer {
          value
        }
      }
    }
  }
    `;

  const result = await getItems(getQuestionsAnswersByIdQuery, { id });

  return result?.data?.getQuestionsAnswersById;
};
export const createQuestionsAnswers = async (page) => {
  const createQuestionsAnswersMutation = `
      mutation($questionsAnswers: QuestionsAnswersInput!) {
        addQuestionsAnswers(questionsAnswers: $questionsAnswers) {
          ... on QuestionsAnswers {
            _id
          }
        }
      }
    `;

  const result = await setItems(createQuestionsAnswersMutation, {
    questionsAnswers: page
  });

  return result?.data?.addQuestionsAnswers;
};
export const deleteQuestionsAnswers = async (id) => {
  const deleteQuestionsAnswersMutation = `
      mutation($id: ID!) {
        deleteQuestionsAnswers(id: $id) {
          ... on QuestionsAnswers {
            _id
          }
        }
      }
    `;

  const result = await setItems(deleteQuestionsAnswersMutation, { id });

  return result?.data?.deleteQuestionsAnswers;
};
export const updateQuestionsAnswers = async ({ id, page }) => {
  const updateQuestionsAnswersMutation = `
      mutation($id: ID!, $questionsAnswers: QuestionsAnswersInput!) {
        updateQuestionsAnswers(
          id: $id
          questionsAnswers: $questionsAnswers
        ) {
          ... on QuestionsAnswers {
            _id
            question {
              value
            }
          }
        }
      }
    `;

  const result = await setItems(updateQuestionsAnswersMutation, {
    id,
    questionsAnswers: page
  });

  return result?.data?.updateQuestionsAnswers;
};
