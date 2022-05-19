function isSelected(day, selectedDay){
    return selectedDay.isSame(day, "day");
}
function isBeforeToday(day){
    return day.isBefore(new Date(), "day");
}
function isToday(day){
    return day.isSame(new Date(), "day");
}

export default function dayStyles(day, selectedDay){
    if(isBeforeToday(day)) return "before";
    if(isSelected(day, selectedDay)) return "selected";
    if(isToday(day)) return "today";
    return "";
}