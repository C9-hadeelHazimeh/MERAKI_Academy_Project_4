import React, { useContext } from 'react'
import { RoleContext } from './Register';
import { UserContext } from '../App';


const Schedule = () => {
    
 const roles= useContext(UserContext);


    console.log(roles)
  return (


    <div>Schedule</div>
  )
}

export default Schedule