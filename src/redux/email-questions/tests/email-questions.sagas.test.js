import {
  answerEmailQuestion,
  deleteEmailQuestions,
  getAllEmailQuestions,
  getEmailQuestionById,
  getPendingEmailQuestionsCount,
  makeEmailQuestionsSpam
} from '../email-questions.operations';

describe('email questions sagas test', () => {
  it(' should not throw error', () => {
    expect(getAllEmailQuestions).not.toThrow();
    expect(getEmailQuestionById).not.toThrow();
    expect(deleteEmailQuestions).not.toThrow();
    expect(makeEmailQuestionsSpam).not.toThrow();
    expect(answerEmailQuestion).not.toThrow();
    expect(getPendingEmailQuestionsCount).not.toThrow();
  });
});
