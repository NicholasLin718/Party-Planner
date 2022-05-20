// export default function buildCalendar(selectedDay){
//     const startDay = selectedDay.clone().startOf("month").startOf("week");
//     const endDay = selectedDay.clone().endOf("month").endOf("week");
//     const day = startDay.clone().subtract(1, "day");
//     const calendar = [];
//     //iterate through until we hit the end date
//     while(day.isBefore(endDay, "day")){
//         calendar.push(Array(7)
//             .fill(0)
//             .map(() => day.add(1, "day").clone()));
//     }
//     //return matrix
//     return calendar;
// }




export default function buildCalendar(selectedDay){
    const startDay = selectedDay.clone().startOf("month").startOf("week");
    let endDay = selectedDay.clone().endOf("month").endOf("week");
    const lastDay = selectedDay.clone().add(12, "month").endOf("week");
    const day = startDay.clone().subtract(1, "day");
    // const day2 = endDay.clone().subtract(1, "month")
    // console.log(endDay.format("LLLL"));
    // console.log(lastDay.format("LLLL"));
    // console.log(day.format("LLLL"));
    const calendar = [];
    //iterate through until we hit the end date
    while(endDay.isBefore(lastDay, "day")){
        const month = [];
        while(day.isBefore(endDay, "day")){
            // console.log(day.format("LLLL"));
            month.push(Array(7)
                .fill(0)
                .map(() => day.add(1, "day").clone()));
        }
        // console.log(month);
        calendar.push(month);
        endDay = endDay.add(1, "month").clone();
    }
    console.log(calendar);

    //return matrix
    return calendar;
}
