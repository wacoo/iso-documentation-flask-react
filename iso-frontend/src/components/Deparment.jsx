import { useDispatch, useSelector } from "react-redux";
import Table from "./Table";
import { useEffect, useState } from "react";
import { addDepartment, fetchDepartments } from "../feature/department/departmentSlice";

const Deparment = () => {

    const [deptInput, setDeptInput] =useState('');
    const [msg, setMsg] = useState('');
    const [load, setLoad] = useState(false);
    const [notifClass, setNotifClass] = useState('no_notif');
    const [notifId, setNotifId] = useState('no_notif');
    const dispatch = useDispatch();

    const user = sessionStorage.getItem('user');
    let access_level = 0;
    if (user) {
        access_level = JSON.parse(user)?.access_level;
    }
    
    useEffect(() => {
        dispatch(fetchDepartments());
    }, [dispatch]);

    const departments = useSelector((state) => state.departments.departments) ?? [];
    const deptPostRes = useSelector((state) => state.departments.deptPostRes) ?? {};
    useEffect(() => {
        if (load) {
            if (deptPostRes.message) {
                setMsg(deptPostRes.message);
                setNotifClass('notification');
                setNotifId('success');
            } else if (deptPostRes.error){
                setMsg(deptPostRes.error);
                setNotifClass('notification');
                setNotifId('failure');
            }
            setLoad(false);
            dispatch(fetchDepartments());
            resetResult();
        }
        
    }, [dispatch, deptPostRes]);

    const resetResult = () => {
        setTimeout(() => {
            setMsg('');
            setNotifClass('no_notif');
            setNotifId('no_notif');
        }, 5000)
    }

    const columns = ['Name', 'Action'];
    let data = [];
    if (departments.length > 0) {
        data = Array.isArray(departments) && departments.map((dept) => ({
            Name: dept.name,
            Action: <button type="button">Update</button>,
        }));
    }

    const handleSubmit = (value, e) => {
        e.preventDefault();
        dispatch(addDepartment({'name': value}));
        setLoad(true);
    }

    if (access_level < 1) {
        return (
            <div className="home-content-wrapper">
                <h1>ERROR:401</h1>
                <div className="input">
                    <p>Sorry, you don't have access to this page!</p>
                </div>
            </div>
        )
    }
    return (
        <div className="home-content-wrapper">
            <div className={notifClass}>
                <p id={notifId}>{msg}</p>
            </div>
            <h1>DEPARTMENT</h1>
            <div className="input">
                <form action="">
                    <label htmlFor="name">Name</label>
                    <div className="one-input">
                        <input type="text"  name="name" id="name" placeholder="Name" onChange={(e) => setDeptInput(e.target.value)}/>
                        <button type="submit" onClick={(e) => handleSubmit(deptInput, e)}  className="submit2">Add</button>
                    </div>    
                </form>    
            </div>
            {data.length > 0 && <Table columns={columns} data={data} />}
        </div>
    );
}

export default Deparment;