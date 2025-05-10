import moment from 'moment/min/moment-with-locales'


export const dateThai_s = (date) => {
    return moment(date).locale('th').format('ll')
}

export const dateThai_L = (date) => {
    return moment(date).locale('th').format('LL')
}