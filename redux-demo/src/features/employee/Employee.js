import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {
    getData,
    addEmp,
    updateEmp
} from './employeeSlice';
import { EmpTable } from './empTable'
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const columns = [
    { id: 'name', label: 'Name', minWidth: 50 },
    { id: 'degree', label: 'Degree', minWidth: 50 },
    {
        id: 'password',
        label: 'Password',
        minWidth: 50,
        align: 'right',
        format: (value) => value.toLocaleString(),
    },
    { id: 'delete', label: 'Delete', minWidth: 50 },
    { id: 'edit', label: 'Edit', minWidth: 50 },

];


export const Employee = () => {
    const classes = useStyles();

    const [empObj, setEmp] = React.useState({})
    const [error, setError] = React.useState({name:false, degree:false, password:false})

    // createSelector Demo
    const selectNumOfEmp = createSelector(
        state => state.employee.empData,
        empData => empData.filter(e => e.name)
    )
    // const empLen = useSelector(selectNumOfEmp);

    const emp = useSelector((state)=>{return state.employee.empData});
    const dispatch = useDispatch();

    React.useEffect(()=>{
        dispatch(getData());
    }, emp);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmp({...empObj,[name]:value});
        setError({...error, [name]:false})
    }

    const validate = (data) => {
        let errors = {};
        if (!data.name) {
            errors.name = true;
        }
        if (!data.degree) {
            errors.degree = true;
        }
        if (!data.password) {
            errors.password = true;
        }
        return errors;
    };

    const addEmployee = () => {
        setError(validate(empObj));
        if(empObj.name && empObj.degree && empObj.password)
            dispatch(addEmp(empObj)).then((res)=>{
                setEmp({name:'', degree:'', password:''});
            });
    }

    const editEmployee = (editEmp) => {
        setEmp(editEmp)
    }

    const updateEmployee = () => {
        dispatch(updateEmp(empObj._id, empObj)).then(()=>{
            setEmp({name:'', degree:'', password:''});
        });
    }
    return (
        <div>
            <h1>Employee Data</h1>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField error={error['name']} id="outlined-basic" label="Name" variant="outlined" name="name" value={empObj.name} onChange={handleChange} />
                <TextField error={error['password']} id="outlined-basic" label="Password" variant="outlined" name="password" value={empObj.password} onChange={handleChange} />
                <TextField error={error['degree']} id="outlined-basic" label="Degree" variant="outlined" name="degree" value={empObj.degree} onChange={handleChange} />
                {
                    (empObj._id) ? <Button onClick={ updateEmployee } size="large" variant="contained" color="primary">
                        Update Employee
                    </Button>
                    : <Button onClick={ addEmployee } size="large" variant="contained" color="primary">
                        Add Employee
                    </Button>
                }

            </form>
            <EmpTable employee={ emp } columns={ columns} editEmployee= { editEmployee }/>
        </div>
    )
}