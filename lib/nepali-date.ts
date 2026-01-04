import NepaliDate from 'nepali-date-converter';

export function formatToNepaliDate(date: Date | number | string) {
    const d = new Date(date);
    const nDate = new NepaliDate(d);

    const months = [
        'Baishakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin',
        'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'
    ];

    const monthIndex = nDate.getMonth();
    const monthFull = months[monthIndex];
    const monthShort = monthFull.substring(0, 3).toUpperCase();

    return {
        month: monthFull,
        monthShort: monthShort,
        day: nDate.getDate(),
        year: nDate.getYear(),
        formatFull: `${monthFull} ${nDate.getDate()}, ${nDate.getYear()}`,
        formatShort: `${nDate.getDate()} ${monthShort}, ${nDate.getYear()}`,
        formatNumeric: `${nDate.getYear()}-${(nDate.getMonth() + 1).toString().padStart(2, '0')}-${nDate.getDate().toString().padStart(2, '0')}`
    };
}
