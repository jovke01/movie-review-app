export const formatDate = (date?: string) => {
  if (!date) return 'Date not specified';
  const formatedDate = new Date(date);
  return `${formatedDate.getDate()}/${formatedDate.getMonth() + 1}/${formatedDate.getFullYear()}`;
};
