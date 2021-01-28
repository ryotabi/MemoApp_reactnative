import { format } from 'date-fns';

export default function dateToString(date) {
    if (!date) {
        return '';
    }
    return format(date, 'yyyy年M月d日 HH時mm分');
}
