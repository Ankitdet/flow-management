import _ from 'lodash'

/* export const prepareKeys = (listItems: any, uniqByField: string): any => {
    const uniq = _.uniqBy(listItems, uniqByField)
    const requiredField = _.map(uniq, o => _.pick(o, [uniqByField]))
    return requiredField
} */

export const prepareKeys = (listItems: any[], uniqByFields: string[]): any[] => {
    const uniq = _.uniqWith(listItems, (a, b) => {
        return _.isEqual(_.pick(a, uniqByFields), _.pick(b, uniqByFields))
    })
    const requiredFields = _.map(uniq, o => _.pick(o, uniqByFields))
    const result = _.reject(requiredFields, _.isEmpty)
    return result
}

export const prepareKeysNew = (listItems: any[], uniqByFields: string[]): any[] => {
    // Step 1: Find unique items based on custom comparison function
    const compareFunc = (a: any, b: any) => _.isEqual(_.pick(a, uniqByFields), _.pick(b, uniqByFields))
    const uniqueItems = _.uniqWith(listItems, compareFunc)

    // Step 2: Extract required fields from unique items
    const requiredFields = _.map(uniqueItems, item => _.pick(item, uniqByFields))

    // Step 3: Filter out items without required fields
    const result = _.filter(requiredFields, item => _.every(uniqByFields, field => _.has(item, field)))

    return result
}

export function matchArrays<T, V>(jsonArray: T[], responseArray: V[], uniqByField: string, keyName: string): T[] {
    return _.map(jsonArray, jsonObj => {
        const matchingResponse = _.find(responseArray, { [uniqByField]: jsonObj[uniqByField] })
        return matchingResponse ? { ...jsonObj, [keyName]: matchingResponse } : jsonObj
    })
}
