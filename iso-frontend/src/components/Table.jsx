const Table = (props) => {
  const { columns, data } = props;

  console.log(data);
  return (
    <table className="table-content">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <td key={index}>{column}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 &&
          data.map((item, index) => (
            <tr key={index}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>{item[column]}</td>
              ))}
              <td>
                {columns.map((column, colIndex) => (
                  column.startsWith("Button") && (
                    <button key={colIndex} type="button">
                      {item[column]}
                    </button>
                  )
                ))}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

  export default Table;