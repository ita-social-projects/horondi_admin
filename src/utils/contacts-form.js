export const setMapImageHandler = (files, setMapFn, values, valuesKey) => {
  if (files && files[0]) {
    setMapFn({
      name: files[0].name,
      imageUrl: URL.createObjectURL(files[0])
    });
  }
  [values[valuesKey]] = files;
};

export const setInputsContactHandler = (schedule, address) => [
  { label: schedule, name: 'schedule' },
  { label: address, name: 'address' }
];
