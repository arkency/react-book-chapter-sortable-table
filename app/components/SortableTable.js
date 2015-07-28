import React from 'react';
import { Table } from 'react-bootstrap';

class SortableHeader extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.sort(this.props.attribute);
  }

  render () {
    return (
      <th><a onClick={this.handleClick}>{this.props.title}</a></th>
    );
  }
}

class SortableTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = { records: this.props.initialRecords };

    this.sort = this.sort.bind(this);
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

  sort(attribute) {
    let { records } = this.state;
    records.sort(function(first, second){
      return first[attribute].localeCompare(second[attribute]);
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
            <SortableHeader title="First Name" attribute="firstName" sort={this.sort} />
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
