import React, {useState} from 'react';
import Column from './Column';
import LabelColumn from './LabelColumn';
import "./styles.css";
import { useSelector } from 'react-redux';
import { selectAllDays } from "../../features/CalendarSlice";
import { selectAllRange } from "../../features/TimeRangeSlice";
import ColumnPage from './ColumnPage';
import Pagination from './Pagination';
const Selector = () => {
  const printList = [{isoTime: '2022-06-29T04:00:00.000Z', dayOfWeek: 3}, {isoTime: '2022-06-28T04:00:00.000Z', dayOfWeek: 2}, {isoTime: '2022-06-27T04:00:00.000Z', dayOfWeek: 1}, {isoTime: '2022-06-26T04:00:00.000Z', dayOfWeek: 0}, {isoTime: '2022-06-22T04:00:00.000Z', dayOfWeek: 3}, {isoTime: '2022-06-21T04:00:00.000Z', dayOfWeek: 2}, {isoTime: '2022-06-30T04:00:00.000Z', dayOfWeek: 4}, {isoTime: '2022-06-25T04:00:00.000Z', dayOfWeek: 6}, {isoTime: '2022-06-24T04:00:00.000Z', dayOfWeek: 5}];
  const [currentPage, setCurrentPage] = useState(1);
  const [columnsPerPage] = useState(5);

  // const printList = useSelector(selectAllDays);
  // const values = useSelector(selectAllRange);
  const orderedPrintList = printList.slice().sort((a,b) => a.isoTime.localeCompare(b.isoTime));
  console.log(printList);
  console.log(orderedPrintList);
  // const startValue = values.startValue;
  // const endValue = values.endValue;
  const startValue = {"hour": 7, "is_00": false};
  const endValue = {"hour": 15, "is_00": false};
  const renderedDays = printList.map((day, i) => (
    <div key={i}>{day.isoTime}</div>
  ));
  // console.log(values);

  const indexOfLastColumn = currentPage * columnsPerPage;
  const indexOfFirstColumn = indexOfLastColumn - columnsPerPage;
  const currentColumns = orderedPrintList.slice(indexOfFirstColumn, indexOfLastColumn);

  console.log(currentColumns);
  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <div>
      {renderedDays}
      <LabelColumn className="label" startValue={startValue} endValue={endValue}/>
      <div className="column-page">
          <ColumnPage startValue={startValue} endValue={endValue} currentColumns={currentColumns}/>
          <Pagination columnsPerPage={columnsPerPage} totalColumns={orderedPrintList.length} paginate={paginate}/>
      </div>
    </div>
  )
}

export default Selector;
