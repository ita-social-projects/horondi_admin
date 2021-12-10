import useQuestionsAnswersHandlers from './use-questions-answers-handlers';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: () => ['text', () => 'text']
}));

describe('use-questions-answers test', () => {
  it('should call useState', () => {
    const result = useQuestionsAnswersHandlers();
    expect(result.uaAnswer).toBe('text');
  });
});
