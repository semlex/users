import dayjs from 'dayjs';

export const getFormattedDate = (
  date: string | undefined | null,
  outputFormat = 'DD.MM.YYYY HH:mm',
  inputFormat?: string,
) => {
  return dayjs(date).isValid() ? dayjs(date, inputFormat).format(outputFormat) : '';
};
