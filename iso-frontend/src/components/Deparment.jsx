import { useDispatch, useSelector } from "react-redux";
import Table from "./Table";
import { useEffect } from "react";
import { fetchDepartments } from "../feature/department/departmentSlice";

const Deparment = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDepartments());
    }, [dispatch]);

    const departments = useSelector((state) => state.departments.departments) ?? [];
    console.log("Departments have changed:", departments);
    const columns = ['name', 'Action'];
    let data = [];
    if (departments.length > 0) {
        data = departments.map((dept) => ({
            name: dept.name,
            Action: <button type="button">Update</button>,
        }));
    }

    return (
        <div className="home-content-wrapper">
            <h1>Department</h1>
            <div className="input">
                <form action="">
                    <label htmlFor="name">Name</label>
                    <div className="one-input">
                        <input type="text"  name="name" id="name" placeholder="Name"/>
                        <button type="submit">Add</button>
                    </div>    
                </form>    
            </div>
            {data.length > 0 && <Table columns={columns} data={data} />}
        </div>
    );
}

export default Deparment;