import { config } from '../configs';

const { languages } = config;

const usePositionHandlers = () => {
  const createPosition = (values) => ({
    name: [
      {
        lang: languages[0],
        value: values.uaName
      },
      {
        lang: languages[1],
        value: values.enName
      }
    ],
    available: values.available
  });

  return {
    createPosition
  };
};
export default usePositionHandlers;
