export const formatDate = (date?: string) => {
  if (date === undefined) return;
  const formatedDate = new Date(date);
  return `${formatedDate.getDate()}/${formatedDate.getMonth() + 1}/${formatedDate.getFullYear()}`;
};
