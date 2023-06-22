import { genders, majors } from 'constanst/index';
import moment from '../../node_modules/moment/moment';

export const formatCurrency = (number) => {
    const roundedNumber = Number(number).toFixed(0).toString();

    const parts = roundedNumber.split('.');
    const integerPart = parts[0];

    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    const formattedNumber = `${formattedInteger}VND`;

    return formattedNumber;
};

export const formatGender = (number) => {
    return genders[number - 1]?.label || 'NA';
};

export const formatMajor = (number) => {
    return majors[number - 1]?.label || 'NA';
};

export const formatTime = (str) => {
    const momentObj = moment(str);
    const newTimeStr = momentObj.format('DD/MM/YYYY HH:mm');

    return newTimeStr;
};

export const formatTimeDate = (str) => {
    if (!str) return 'NA';
    const momentObj = moment(str);
    const newTimeStr = momentObj.format('DD/MM/YYYY');

    return newTimeStr;
};
