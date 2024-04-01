export const dateToMs = (date?: string): number => {
    // Get the current date and time in ISO string format
    const isoString = date ? new Date(date).toISOString() : new Date().toISOString()

    // Convert the ISO string to a Date object
    const dateObject = new Date(isoString)

    // Get the timestamp in milliseconds
    const timestampInMilliseconds = dateObject.getTime()

    return timestampInMilliseconds
}

// Always create SK blindly... even you don't know initially..
