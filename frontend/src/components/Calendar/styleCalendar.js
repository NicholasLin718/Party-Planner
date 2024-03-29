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
    return day.isBefore(new Date(), 'day');
}

function isLastMonth(day, selectedDay) {
    return day.isBefore(selectedDay.clone().startOf('month'), 'day');
}
function isNextMonth(day, selectedDay) {
    return day.isAfter(selectedDay.clone().endOf('month'), 'day');
}
function isToday(day) {
    return day.isSame(new Date(), 'day');
}

export default function dayStyles(day, selectedDay, select) {
    if (isToday(day)) return 'today cursor-pointer';
    if (isNextMonth(day, selectedDay) || isLastMonth(day, selectedDay))
        return 'opacity-0 cursor-not-allowed';
    if (isBeforeToday(day, selectedDay)) return 'disable';
    // if(select && isSelected(day, selectedDay)) return "selected";
    return ' cursor-pointer';
}
