/*
    Used for styling each day, separated into 3 categories
*/

function isSelected(day, selectedDay) {
    return (
        selectedDay.isSame(day, 'day') &&
        selectedDay.isSame(day, 'month') &&
        selectedDay.isSame(day, 'year')
    );
}
function isBeforeToday(day, selectedDay) {
    return (
        day.isBefore(new Date(), 'day') ||
        day.isBefore(selectedDay.clone().startOf('month'), 'day')
    );
}
function isNextMonth(day, selectedDay) {
    return day.isAfter(selectedDay.clone().endOf('month'), 'day');
}
function isToday(day) {
    return day.isSame(new Date(), 'day');
}

export default function dayStyles(day, selectedDay, select) {
    if (isBeforeToday(day, selectedDay)) return 'disable';
    if (isNextMonth(day, selectedDay)) return 'disable';
    // if(select && isSelected(day, selectedDay)) return "selected";
    if (select) {
        //STORE DAY TO DATABASE HERE
        // arr.push(day.format("LLLL"));
        // console.log(arr);
        return 'selected';
    }
    // if(!select) {
    //     let index = arr.indexOf(day);
    //     const result = arr.filter(d  => !(d === day.format("LLLL")));
    //     arr = result;
    //     console.log(arr); //USE THIS TO DELETE DAY -> SELECTEDDAY IS IRRELEVANT FOR THIS
    // }
    if (isToday(day)) return 'today';
    return '';
}
