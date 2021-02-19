import { config } from '../configs';

const { languages } = config;

const createSize = (data) => ({
  name: data.name,
  simpleName: [
    { lang: languages[0], value: data.simpleNameUa },
    { lang: languages[1], value: data.simpleNameEn }
  ],
  heightInCm: data.heightInCm,
  widthInCm: data.widthInCm,
  depthInCm: data.depthInCm,
  volumeInLiters: data.volumeInLiters,
  weightInKg: data.weightInKg,
  available: data.available,
  additionalPrice: data.additionalPrice
});

export default createSize;
