export default function buildCalendar(selectedDay){
    const startDay = selectedDay.clone().startOf("month").startOf("week");
    const endDay = selectedDay.clone().endOf("month").endOf("week");
    const day = startDay.clone().subtract(1, "day");
    const calendar = [];
    while(day.isBefore(endDay, "day")){
        calendar.push(Array(7)
            .fill(0)
            .map(() => day.add(1, "day").clone()));
    }

    return calendar;
}