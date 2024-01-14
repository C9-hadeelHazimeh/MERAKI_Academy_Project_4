import React, { useContext } from 'react'


UserContext



const clinic = () => {
  const handlePatientCase = (patientId) => {
    console.log("patientIdin post case", patientId);
    const patientCase = { diagnosis, treatment };
 const {token}=useContext()
    axios
      .post(`http://localhost:5000/cases/create/${patientId}`, patientCase, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })

      .then((result) => {
        console.log(result);
        setAddpatientCase(result.data.addpatientCase);
        setMessageStatus(true);
        setmessage(result.data.message);
      })
      .catch((err) => {
        console.log(err);
        setMessageStatus(false);
        setErrormessage(err.response.data.message);
      });
  };






  return (
    <div>clinic</div>
  )
}

export default clinic