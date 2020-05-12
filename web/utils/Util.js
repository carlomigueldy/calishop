
import { ExportToCsv } from 'export-to-csv';

/**
 * Converts integer into money format in USD.
 * 
 * @param { Integer } number 
 * @returns { String } e.g. $50.00
 */
export const moneyFormat = (number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(number)
}

/**
 * Maps date to UTC in ISO string format.
 * 
 * @param { String } date 
 * @return { String }
 */
export const dateFormatUTC = (date) => dateFormat(mapUTCDate(date))

/**
 * Formats date readable for Vuetify components.
 * 
 * @param { String } date 
 * @returns { String } e.g. 2020-04-28
 */
export const dateFormat = (date) => {
  return new Date(date)
    .toISOString()
    .substr(0, 10)
}

/**
 * Converts date into UTC timezone.
 * This solves timezone issues. 
 * 
 * @param { String } date 
 * @returns { String } e.g. 2020 04 28
 */
export const mapUTCDate = (date) => {
  const d = new Date(date)
  return `${d.getUTCFullYear()} ${d.getUTCMonth() + 1} ${d.getUTCDate()}`
}

/**
 * Checks if user is administrator.
 * 
 * @param { Object } user 
 * @returns { Boolean }
 */
export const isAdmin = (user) => (
  user.roles.includes('administrator')
)

/**
 * Capitalizes first letters of words in string.
 * 
 * Reference: https://stackoverflow.com/questions/2332811/capitalize-words-in-string
 * @param {string} str String to be modified
 * @param {boolean=false} lower Whether all other letters should be lowercased
 * @return {string}
 * @usage
 *   capitalize('fix this string');     // -> 'Fix This String'
 *   capitalize('javaSCrIPT');          // -> 'JavaSCrIPT'
 *   capitalize('javaSCrIPT', true);    // -> 'Javascript'
 */
export const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase())

/**
 * Export data into CSV.
 * 
 * @param { Array } data array of obj
 * @param { String } title title file 
 */
export const exportToCSV = (data, title = 'Data List', filename = 'generated') => {
  const options = { 
    title,
    filename,
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true, 
    showTitle: true,
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
  }
  const csvExporter = new ExportToCsv(options)
  return csvExporter.generateCsv(data)
}