import { useEffect, useState } from "react";
import { dlDocument } from "../feature/document/documentSlice";
import { useDispatch } from "react-redux";

const Table = (props) => {
  const dispatch = useDispatch();
  const { columns, data } = props;
  const [description, setDescription] = useState('');
  // console.log(data);

  useEffect(() => {

  }, [description]);

  const handleHover = (item) => {
    setDescription(item.description);
  }

  return (
    <>
      <p>{description}</p>
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
              <tr key={index} onMouseEnter={() => handleHover(item)}>
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
    </>
    
  );
};

  export default Table;