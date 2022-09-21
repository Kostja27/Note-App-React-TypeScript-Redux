import React from 'react';
import './App.css';
import TableDate from "./components/TableDate/TableDate"
import TableStatistics from "./components/TableStatistics/TableStatistics"

function App() {
  return (
    <div className="Wrapper">
      <TableDate />
      <TableStatistics />
    </div>
  );
}

export default App;
