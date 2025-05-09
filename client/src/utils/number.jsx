import numeral from 'numeral'

export const numberFormat = (number) => {
    return numeral(number).format('0,0')
}