// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// const Display = () => {
//     const [task, setTask] = useState('');
//     const [taskOwner, setTaskOwner] = useState('');
//     /*DEFAULT DATA FETCHING CODE*/
//     const { code } = useParams();
//     const [data, setData] = useState({});
//     const [loading, setLoading] = useState(true);
//     async function getRoom() {
//         const response = await fetch('http://localhost:5000/pages/' + code);
//         const res = await response.json();
//         setData(res);
//         setLoading(false);
//         console.log(res);
//     }
//     useEffect(() => {
//         getRoom();
//     }, []);
//     const onTaskChange = (e) => {
//         setTask(e.target.value);
//     };
//     const onTaskOwnerChange = (e) => {
//         setTaskOwner(e.target.value);
//     };

//     const handleSubmit = () => {};
//     /*END OF DATA FETCH*/

//     // let tasksList = [
//     //     { task: 'Clean your balls', completed: false, taskOwner: 'Nicholas' },
//     //     { task: 'Clean your walls', completed: false, taskOwner: 'Joe' },
//     //     { task: 'Clean your halls', completed: false, taskOwner: '' }
//     // ];
//     return (
//         <div>
//             <label>New Task</label>
//             <input
//                 type='text'
//                 onChange={onTaskChange}
//                 className='w-[100%] px-3 py-3'
//             />
//             <label>New Task Owner</label>
//             <input
//                 type='text'
//                 onChange={onTaskOwnerChange}
//                 className='w-[100%] px-3 py-3'
//             />
//             <button
//                 onClick={() => {}}
//                 className='w-auto px-2 py-2 rounded bg-rose-100 border-2 border-rose-200 hover:bg-rose-300 ease-in duration-150'
//             />
//         </div>
//     );
// };

// export default Display;
