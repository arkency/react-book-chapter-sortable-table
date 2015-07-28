import React from 'react';
import { Table } from 'react-bootstrap';

class SortableTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = { records: this.props.initialRecords };

    this.handleClick = this.handleClick.bind(this);
  }

  createRow(record, index) {
    return (
      <tr key={index}>
        <th>{index + 1}</th>
        <th>{record.firstName}</th>
        <th>{record.lastName}</th>
        <th>{record.birthDate}</th>
      </tr>
    );
  }

  handleClick(event) {
    event.preventDefault();
    let { records } = this.state;
    records.sort(function(first, second){
      return first.firstName.localeCompare(second.firstName);
    });
    this.setState({ records: records });
  }

  render () {
    let {records} = this.state;
    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>#</th>
            <th><a onClick={this.handleClick}>First Name</a></th>
            <th>Last Name</th>
            <th>Birth Date</th>
          </tr>
        </thead>
        <tbody>
          {records.map(this.createRow)}
        </tbody>
      </Table>
    );
  }
}

SortableTable.defaultProps = {
  initialRecords: [
      {firstName: "Angus", lastName: "Young", birthDate: "1955-03-31"},
      {firstName: "Malcolm", lastName: "Young", birthDate: "1953-01-06"},
      {firstName: "Bon", lastName: "Scott", birthDate: "1946-07-09"},
      {firstName: "Phil", lastName: "Rudd", birthDate: "1954-05-19"},
      {firstName: "Cliff", lastName: "Williams", birthDate: "1949-12-14"}
  ]
};

export default SortableTable;
