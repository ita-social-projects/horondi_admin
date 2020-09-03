export const omitTypename = (payload, options = { deleteId: false }) => {
  if (options.deleteId) {
    try {
      delete payload._id;
    } catch (e) {
      throw new Error(e.message);
    }
  }
  return JSON.parse(JSON.stringify(payload), (key, value) =>
    key === '__typename' ? undefined : value
  );
};
