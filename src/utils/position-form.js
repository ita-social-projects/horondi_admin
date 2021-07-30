export const getPositionInitialValues = (edit, position) => ({
  uaName: position.name[0].value || '',
  enName: position.name[1].value || '',
  available: position.available || false
});
