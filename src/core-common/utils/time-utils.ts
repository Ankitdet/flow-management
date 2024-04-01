import _ from 'lodash'


export function dateTimeToMilliseconds(date: Date): number {
    try {
        const isoDate = new Date(date).toISOString();
        const epochTime = Date.parse(isoDate);
        return epochTime;
    } catch (error) {
        console.error('Error converting date to milliseconds:', error);
        return NaN; // Return NaN to indicate failure
    }
}

export function milliSecondsToDateTime(epochTime: number): Date {
    try {
        const isoDate = new Date(epochTime).toISOString();
        return new Date(isoDate);
    } catch (error) {
        console.error('Error converting milliseconds to date:', error);
        return new Date(NaN); // Return an invalid date to indicate failure
    }
}

/* 

// Example usage:
const currentDate = new Date(); // Assuming you have a date object
console.log(currentDate)
const milliseconds = dateTimeToMilliseconds(currentDate);
console.log(milliseconds); // Output the milliseconds


console.log(milliSecondsToDateTime(milliseconds)) */