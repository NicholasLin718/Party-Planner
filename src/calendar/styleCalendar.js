/*
    Used for styling each day, separated into 3 categories
*/

function isSelected(day, selectedDay){
    return (selectedDay.isSame(day, "day") && selectedDay.isSame(day, "month")  && selectedDay.isSame(day, "year"));
}
function isBeforeToday(day){
    return day.isBefore(new Date(), "day");
}
function isToday(day){
    return day.isSame(new Date(), "day");
}

export default function dayStyles(day, selectedDay, select){
    if(isBeforeToday(day)) return "before";
    if(select && isSelected(day)) return "selected";
    if(isToday(day)) return "today";
    return "";
}