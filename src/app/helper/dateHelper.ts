
import moment, { Moment } from 'moment';
export namespace DateHelpers {

  export function formatDefaultDateTime(date: Date | string | Moment) {
    if (!date || date == '0001-01-01T00:00:00Z') return null;
    return moment(date).format("DD/MM/YYYY HH:mm:ss")
  }
  export function formatVNTimezone(date: Date | string) {
    const utcDate = moment.utc(date); // Example UTC date
    return utcDate.utcOffset(7);
  }
  export function formatVNTimezoneToDefaultDateTime(date: Date | string ) {
    if (!date || date == '0001-01-01T00:00:00Z') return null;
    const utcDate = moment.utc(date); // Example UTC date
    const localTime =  utcDate.utcOffset(7);
    return formatDefaultDateTime(localTime);
  }
}
