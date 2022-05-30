// export default function buildCalendar(selectedDay){
//     console.log(selectedDay.format("LLLL"));
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
    let startDay = selectedDay.clone().startOf("month").startOf("week");
    let endDay = selectedDay.clone().endOf("month").endOf("week");
    let day = startDay.clone().subtract(1, "day");
    const calendar = [];
    //iterate through until we hit the end date
    for(let i = 0; i < 37; i++){
        const month = [];
        while(day.isBefore(endDay, "day")){
            month.push(Array(7)
                .fill(0)
                .map(() => day.add(1, "day").clone()));
        }
        calendar.push(month);
        let newSelectedDay = selectedDay.clone().add(1, "month");
        startDay = newSelectedDay.clone().startOf("month").startOf("week");
        endDay = newSelectedDay.clone().endOf("month").endOf("week");
        day = startDay.clone().subtract(1, "day");
        selectedDay = newSelectedDay;
        // endDay = day.clone().endOf("month").endOf("week");
        // day = day.clone().subtract(1, "week");
    }
    //return matrix
    return calendar;
}

// export default function buildCalendar(selectedDay){
//     const startDay = selectedDay.clone().startOf("month").startOf("week");
//     let endDay = selectedDay.clone().endOf("month").endOf("week");
//     const lastDay = selectedDay.clone().add(12, "month").endOf("week");
//     const day = startDay.clone().subtract(1, "day");
//     // const day2 = endDay.clone().subtract(1, "month")
//     // console.log(endDay.format("LLLL"));
//     // console.log(lastDay.format("LLLL"));
//     // console.log(day.format("LLLL"));
//     const calendar = [];
//     //iterate through until we hit the end date
//     console.log((day.isSame(endDay, "month")));
//     console.log(day.format("M"));
//     day.add(1, "month").clone();
//     console.log(day.format("LLLL"));
//     day.add(1, "month").clone();
//     console.log(day.format("LLLL"));
//     console.log((day.isSame(endDay, "month")));
//     console.log(endDay.format("LLLL"));
//     endDay = endDay.clone().endOf("month").endOf("week");
//     console.log(endDay.format("LLLL"));
//     endDay = endDay.clone().endOf("month").endOf("week");
//     console.log(endDay.format("LLLL"));
//     endDay = endDay.clone().endOf("month").endOf("week");
//     console.log(endDay.format("LLLL"));
//     endDay = endDay.clone().endOf("month").endOf("week");
//     console.log(endDay.format("LLLL"));
//     endDay = endDay.clone().endOf("month").endOf("week");
//     console.log(endDay.format("LLLL"));
//     endDay = endDay.clone().endOf("month").endOf("week");
//     console.log(endDay.format("LLLL"));
//     endDay = endDay.clone().endOf("month").endOf("week");
//     console.log(endDay.format("LLLL"));
//     endDay = endDay.clone().endOf("month").endOf("week");
//     console.log(endDay.format("LLLL"));
//     endDay = endDay.clone().endOf("month").endOf("week");
//     console.log(endDay.format("LLLL"));
//     endDay = endDay.clone().endOf("month").endOf("week");
//     console.log(endDay.format("LLLL"));
//     endDay = endDay.clone().endOf("month").endOf("week");
//     console.log(endDay.format("LLLL"));
//     endDay = endDay.clone().endOf("month").endOf("week");
//     // console.log(endDay.format("LLLL"));
//     // endDay = endDay.add(1, "month").clone();
//     console.log(endDay.format("LLLL"));
//     console.log("pog");

    
//     while(endDay.isBefore(lastDay, "day")){
//         const month = [];
//         // if(day.isSame(endDay, "month")){

//         // }
//         console.log(endDay.format("LLLL"));
//         while(day.isBefore(endDay, "day")){
//         // while(!(day.isSame(endDay, "month"))){
//             // console.log(day.format("LLLL"));
//             month.push(Array(7)
//                 .fill(0)
//                 .map(() => day.add(1, "day").clone()));
//         }
//         // console.log(month);
//         calendar.push(month);
//         // endDay = endDay.clone().endOf("month").endOf("week");
//         endDay = endDay.add(1, "month").clone();
//     }
//     console.log(calendar);

//     //return matrix
//     return calendar;
// }
