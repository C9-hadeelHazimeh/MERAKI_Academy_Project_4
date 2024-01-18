import React, { useContext, useState } from 'react'
import { UserContext } from "../App";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Modal from 'react-bootstrap/Modal';


const Clinic = () => {
const [message, setmessage] = useState("");
const [mesageStatus, setMessageStatus] = useState(false);
const [errormessage, setErrormessage] = useState("");
const [showmodal,setShowModal]=useState(false);
 
 const [clinic,setClinic]=useState(null);
 const [clinics] = useState(['Derma', 'Dentist', 'general']);
 const {token}=useContext(UserContext);
 const [image, setImage ] = useState("");
const [url, setUrl] = useState("");

  const addDoctor = () => {
    const selectedClinic = clinic || clinics[0];
    console.log(url);
  const newDoctor={image:url,clinicName:selectedClinic}
  
    axios
      .post(`http://localhost:5000/clinics/create`, newDoctor, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })

      .then((result) => {
        console.log(result);
         setMessageStatus(true);
        setmessage(result.data.message);
        setShowModal(true)
      })
      .catch((err) => {
        console.log(err);
        setMessageStatus(false);
        setErrormessage(err.response.data.message);
        setShowModal(true)
      });
  };

  const uploadImage = () => {
    
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "nmatt2gf")
    data.append("cloud_name","dvmoaseij")
    axios.post("https://api.cloudinary.com/v1_1/dvmoaseij/image/upload",
   data
    )
    // .then(resp => resp.json())
    .then((data) => {

    console.log(data)
    setUrl(data.data.url)
    
    })
    .catch(err => console.log(err))
    }






  return (
    <div className='about'>
    
{showmodal && (
    <div className="modal show" style={{ display: 'block', position: 'initial' }}>
      <Modal.Dialog>
        <Modal.Body>
          {mesageStatus? <p>{message}</p>:<p>{errormessage}</p>}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => {setShowModal(false)}}>
            Close
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  )}



  <Form className='upload-image'>
  <div style={{textAlign:"center"}}><h4 style={{margin:"2rem"}}>Add Doctor to a clinic</h4></div>

  <Form.Select
          style={{ width: "50%" }}
          value={clinic || ""}
          onChange={(e) => setClinic(e.target.value)}
        >
          <option value="">Select Clinic</option>
          {clinics.map((clinicOption, index) => (
            <option key={index} value={clinicOption}>
              {clinicOption}
            </option>
          ))}
        </Form.Select>

     {/* <Form.Select 
     style={{width:"50%"}}
    
     value={clinic} onChange={(e) => setClinic(e.target.value)}>

        <option value="">Select Clinic</option>
        
        {clinics.map((clinicOption, index) => (
          <option key={index} value={clinicOption}>
            {clinicOption}
          </option>
        ))}

</Form.Select>  */}
<div className='imageUpload'>
<h4>Upload an image</h4>

<input 

 type="file" onChange= {(e)=>{
  
  setImage(e.target.files[0])}}></input>
<button
className='button'
onClick={((e)=>{
  e.preventDefault()
  uploadImage()

})}
>upload</button>

<img  className="clinicImg" src={url}/>

     
</div >

        <Form.Group as={Row} className="mb-3">
          
            <Button onClick={addDoctor}
            className='button-2'
              
              
              >Add doctor Information</Button>
          
        </Form.Group>
      </Form> 




    </div>
  )
}

export default Clinic