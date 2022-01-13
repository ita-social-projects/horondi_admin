import * as questionsAnswerForm from './questions-answers-form';

const mockAnswer = {
  answer: [
    {
      value: 'test1'
    },
    {
      value: 'test2'
    }
  ]
};

const mockQuestion = {
  question: [
    {
      value: 'test1'
    },
    {
      value: 'test2'
    }
  ]
};

describe('Set questions and answers', () => {
  it('Set questions ua', () => {
    const result = questionsAnswerForm.uaSetQuestionsHandler(
      'test1',
      mockQuestion
    );
    expect(result).toBe('test1');
  });

  it('Set questions ua without condition', () => {
    const result = questionsAnswerForm.uaSetQuestionsHandler('', mockQuestion);
    expect(result).toBe('');
  });

  it('Set questions en', () => {
    const result = questionsAnswerForm.enSetQuestionsHandler(
      'test2',
      mockQuestion
    );
    expect(result).toBe('test2');
  });

  it('Set questions en without condition', () => {
    const result = questionsAnswerForm.enSetQuestionsHandler('', mockQuestion);
    expect(result).toBe('');
  });

  it('Set answers ua', () => {
    const result = questionsAnswerForm.uaSetAnswersHandler('test1', mockAnswer);
    expect(result).toBe('test1');
  });

  it('Set answers ua without condition', () => {
    const result = questionsAnswerForm.uaSetAnswersHandler('', mockAnswer);
    expect(result).toBe('');
  });

  it('Set answers en', () => {
    const result = questionsAnswerForm.enSetAnswersHandler('test2', mockAnswer);
    expect(result).toBe('test2');
  });

  it('Set answers en without condition', () => {
    const result = questionsAnswerForm.enSetAnswersHandler('', mockAnswer);
    expect(result).toBe('');
  });
});
