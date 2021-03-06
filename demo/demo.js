import React from 'react';
import ReactDOM from 'react-dom';

import Table from '../src/Table';

function averageAge(rows) {
  const total = rows.reduce((prev, next) => {
    return prev + next.age;
  }, 0);
  return Math.round(total / rows.length);
}

const Demo = React.createClass({
  getInitialState: function () {
    return {
      fields: [
        {key: 'name', label: 'Name'},
        {key: 'age', label: 'Age', summary: averageAge},
        {key: 'fav_color', label: 'Favourite Colour'}
      ],
      data: [
        {name: 'François Duras', age: 43, fav_color: 'bleue'},
        {name: 'Isabelle Laval', age: 29, fav_color: 'rouge'},
        {name: 'Catherine Dupont', age: 27, fav_color: 'rose'}
      ]
    };
  },
  addRow: function () {
    const data = this.state.data.slice();
    data.push({name: 'Foo', age: 20, fav_color: 'purple'});
    this.setState({data});
  },
  removeRow: function () {
    const data = this.state.data.slice();
    data.splice(0, 1);
    this.setState({data});
  },
  render: function () {
    return (<div>
      <p>
        <button onClick={this.addRow}>add row</button>
        <button onClick={this.removeRow}>remove row</button>
        <a href="#" onClick={() => this.refs.table.download('coolstuff.csv')}>Download as csv</a>
      </p>
      <Table ref="table" fields={this.state.fields} data={this.state.data} fieldsEditable />
      <Table fields={['name', 'age', 'fav_color']} data={this.state.data} fieldsEditable />
      <Table fields={null} data={null} />
    </div>);
  }
});

ReactDOM.render(<Demo />, document.getElementById('app'));
