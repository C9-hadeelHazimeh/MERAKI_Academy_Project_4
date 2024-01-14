import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App';

const GetClinic = () => {
const [clinics,setClinics]=useState([]);
const [message, setmessage] = useState("");
const [mesageStatus, setMessageStatus] = useState(false);
const [errormessage, setErrormessage] = useState("");

 const {token}=useContext(UserContext);
 
        useEffect(() => {
            axios
              .get(`http://localhost:5000/clinics/get`, {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              })
              .then((result) => {
                console.log("clinics", result);
               setClinics(result.date.doctorInfo);
               setmessage(result.data.message);
               setMessageStatus(true);
                
              })
              .catch((err) => {
                
                console.log(err);
        
              });
          }, []);
      
      


  return (
    <div>hvhv
        {clinics.map((oneClinic)=>{
            return <p>{oneClinic.image}</p>
        })
}


   <p>{message}</p>




    </div>
  )
}

export default GetClinic