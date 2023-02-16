import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://your-api-url.com/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Column 1</th>
          <th>Column 2</th>
          <th>Column 3</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            <td>{item.column1}</td>
            <td>{item.column2}</td>
            <td>{item.column3}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MyTable;
