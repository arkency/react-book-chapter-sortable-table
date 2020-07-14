import React, { useState } from 'react';
import { Table } from 'react-bootstrap';

function SortableHeader(props) {
  const [order, updateOrder] = useState(null);

  const setOrder = () => {
    if (order == null || order === "v") {
      updateOrder("^");
    }
    else {
      updateOrder("v");
    }
  }

  const handleHeaderClick = event => {
    event.preventDefault();
    setOrder();
    props.onClick(props.attribute, order);
  }

  let indicator;
  if (order) {
    indicator = " " + order;
  }

  return (
    <th>
      <a onClick={handleHeaderClick}>{props.title}</a>
      {indicator}
    </th>
  );
}

function SortableTable(props) {
  const [records, updateRecords] = useState(props.initialRecords);

  const wrap = array => 
    array.map((item, index) => ({ key: item, position: index }));

  const unwrap = array =>
    array.map(item => item.key);

  const getComparator = (attribute, order) => {
    if (order === "^") {
      return function(a, b){
        let diff = b.key[attribute].localeCompare(a.key[attribute]);
        if (diff === 0) {
          return a.position - b.position;
        }
        return diff;
      };
    }
    else {
      return function(a, b){
        let diff = a.key[attribute].localeCompare(b.key[attribute]);
        if (diff === 0) {
          return a.position - b.position;
        }
        return diff;
      };
    }
  }

  const sort = (attribute, order) => {
    const comparator = getComparator(attribute, order);
    let sortedRecords = [...records]
    sortedRecords = wrap(sortedRecords);
    sortedRecords.sort(comparator);
    sortedRecords = unwrap(sortedRecords);
    updateRecords(sortedRecords);
  }

  const renderRow = (record, index) =>
    <tr key={index}>
      <th>{index + 1}</th>
      <th>{record.firstName}</th>
      <th>{record.lastName}</th>
      <th>{record.birthDate}</th>
    </tr>;

  return (
    <Table striped bordered condensed hover>
      <thead>
        <tr>
          <th>#</th>
          <SortableHeader title="First Name" attribute="firstName" onClick={sort} />
          <SortableHeader title="Last Name" attribute="lastName" onClick={sort} />
          <SortableHeader title="Birth Date" attribute="birthDate" onClick={sort} />
        </tr>
      </thead>
      <tbody>
        {records.map(renderRow)}
      </tbody>
    </Table>
  );
}

SortableTable.defaultProps = {
  initialRecords: [
      {firstName: "Angus", lastName: "Young", birthDate: "1955-03-31"},
      {firstName: "Malcolm", lastName: "Young", birthDate: "1953-01-06"},
      {firstName: "George", lastName: "Young", birthDate: "1946-11-06"},
      {firstName: "Bon", lastName: "Scott", birthDate: "1946-07-09"},
      {firstName: "Phil", lastName: "Rudd", birthDate: "1954-05-19"},
      {firstName: "Cliff", lastName: "Williams", birthDate: "1949-12-14"}
  ]
};

export default SortableTable;
