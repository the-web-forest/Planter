import { subHours } from 'date-fns';

export default class TimeHelper {
    public static getBrazilTime(): Date {
        return subHours(new Date(), 3);
    }
}