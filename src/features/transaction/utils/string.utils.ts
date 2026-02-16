export const stringUtils = {
  uppercase: (str: string) => str.toUpperCase(),
  dateFormat: (date: string) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.toLocaleString('id-ID', { month: 'long' });
    const year = newDate.getFullYear();
    return `${day} ${month} ${year}`;
  },
};
