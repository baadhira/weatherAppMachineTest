import React from 'react';

const HistoricalData = ({ data }) => {
  return (
    <table className="mt-4 table-auto w-full">
      <thead>
        <tr>
          <th className="px-4 py-2">Date</th>
          <th className="px-4 py-2">Temperature</th>
          <th className="px-4 py-2">Description</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td className="border px-4 py-2">{item.date}</td>
            <td className="border px-4 py-2">{item.temperature}</td>
            <td className="border px-4 py-2">{item.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HistoricalData;
