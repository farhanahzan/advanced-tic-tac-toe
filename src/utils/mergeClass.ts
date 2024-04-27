const mergeClass = (...classNames: unknown[]) =>
  classNames.filter(Boolean).join(' ');

export default mergeClass;
