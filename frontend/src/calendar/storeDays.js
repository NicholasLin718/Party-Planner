let arr = [];

function storeDays(day, select){
    if(!select) {  //value is opposite here -> explained in Day.jsx
        arr.push(day.format("LLLL"));
        console.log(arr);
    }
    else{
        const result = arr.filter(d  => !(d === day.format("LLLL")));
        arr = result;
        console.log(arr); 
    }
}

export {arr, storeDays};