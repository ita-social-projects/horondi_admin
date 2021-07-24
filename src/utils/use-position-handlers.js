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
    // additionalPrice: values.additionalPrice,
    available: values.available
    // optionType: 'SIDE'
  });

  return {
    // pocketsImage,
    // setPocketsImage,
    createPosition
    // upload,
    // setUpload,
    // imageName,
    // setImageName
  };
};
export default usePositionHandlers;
