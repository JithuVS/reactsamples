import React, { useState, useEffect } from 'react'
import { Chart } from 'react-charts'

const axes = [
  { primary: true, type: 'linear', position: 'bottom' },
  { type: 'linear', position: 'left' }
];

const newData = [
  {
    label: "Series 1",
    data: [
      [0, 1],
      [1, 2],
      [2, 4],
      [3, 2],
      [4, 7],
    ],
  },
  {
    label: "Series 2",
    data: [
      [0, 3],
      [1, 1],
      [2, 5],
      [3, 6],
      [4, 4],
    ],
  },
];

const shuffle = (arr) => {
  arr.forEach((items, index) => {
    items.data[index][0] += 1;
    items.data[index][1] += 1;
  });
  return arr;
};

const MyChart  = (props) => {
  const [randomData, setRandomData] = useState(newData);

  return (
    <div
      style={{
        width: '400px',
        height: '300px'
      }}
    >
      <Chart data={randomData} axes={axes} />
    </div>
  )
};

export default MyChart;
