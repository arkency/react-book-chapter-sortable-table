import './styles.css';

import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import SortableTable from './components/SortableTable';

const APP_ROOT = document.createElement('div');
document.body.appendChild(APP_ROOT);

ReactDOM.render(<SortableTable />, APP_ROOT);
