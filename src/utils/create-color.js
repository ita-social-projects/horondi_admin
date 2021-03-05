export const handleNameInLanguageTabs = (condition, styles) => {
  if (condition) {
    return styles.errorTab;
  }
  return styles.tabs;
};
