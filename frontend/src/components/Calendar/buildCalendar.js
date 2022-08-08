export default function buildCalendar(selectedDay) {
    let startDay = selectedDay.clone().startOf('month').startOf('week');
    let endDay = selectedDay.clone().endOf('month').endOf('week');
    let day = startDay.clone().subtract(1, 'day');
    const calendar = [];
    //iterate through until we hit the end date
    for (let i = 0; i < 37; i++) {
        const month = [];
        while (day.isBefore(endDay, 'day')) {
            month.push(
                Array(7)
                    .fill(0)
                    .map(() => day.add(1, 'day').clone())
            );
        }
        calendar.push(month);
        let newSelectedDay = selectedDay.clone().add(1, 'month');
        startDay = newSelectedDay.clone().startOf('month').startOf('week');
        endDay = newSelectedDay.clone().endOf('month').endOf('week');
        day = startDay.clone().subtract(1, 'day');
        selectedDay = newSelectedDay;
        // endDay = day.clone().endOf("month").endOf("week");
        // day = day.clone().subtract(1, "week");
    }
    //return matrix
    return calendar;
}
