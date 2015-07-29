import React from 'react';
import { Table } from 'react-bootstrap';

class SortableHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = { order: null };

    this.handleClick = this.handleClick.bind(this);
    this.setOrder = this.setOrder.bind(this);
  }

  setOrder() {
    let { order } = this.state;
    if (order == null || order === "v") {
      this.setState({ order: "^" });
    }
    else {
      this.setState({ order: "v" });
    }
  }

  handleClick(event) {
    event.preventDefault();
    this.setOrder();
    this.props.sort(this.props.attribute, this.state.order);
  }

  render () {
    let indicator;
    if (this.state.order) {
      indicator = " " + this.state.order;
    }
    return (
      <th>
        <a onClick={this.handleClick}>{this.props.title}</a>
        {indicator}
      </th>
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

  sort(attribute, order) {
    let { records } = this.state;
    records = records.map(function(record, index) {
      return { key: record, position: index };
    });
    if (order === "^") {
      records.sort(function(first, second){
        let diff = second.key[attribute].localeCompare(first.key[attribute]);
        if (diff === 0) {
          return first.position - second.position;
        }
        return diff;
      });
    }
    else {
      records.sort(function(first, second){
        let diff = first.key[attribute].localeCompare(second.key[attribute]);
        if (diff === 0) {
          return first.position - second.position;
        }
        return diff;
      });
    }
    records = records.map(function(record, index) {
      return record.key;
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
            <SortableHeader title="Last Name" attribute="lastName" sort={this.sort} />
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
      {firstName: "George", lastName: "Young", birthDate: "1946-11-06"},
      {firstName: "Bon", lastName: "Scott", birthDate: "1946-07-09"},
      {firstName: "Phil", lastName: "Rudd", birthDate: "1954-05-19"},
      {firstName: "Cliff", lastName: "Williams", birthDate: "1949-12-14"}
  ]
};

export default SortableTable;
