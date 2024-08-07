import React from 'react';
import { useState } from 'react';
import axios from 'axios';
// import { Spin } from 'antd';
import '../App.css';

export default function Matricule() {

  const [files,setFiles] = useState([])
  const [matricule,setMatricule] = useState("")

  const fetchFiles = async (variable)=>{
    await axios.get(`https://profilacademiqueess.onrender.com/api/v1/files/${variable}/get`,{headers:{'Access-Control-Allow-Origin' : '*',
  'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',}})
    .then(function(response){
      console.log('matricule is: ' +variable);
      console.log(response.data);
      setFiles(response.data);
    })
    .catch(function(error){
      console.info(error)
    })
  }

  
  return (
    <div className="App">
      <div className="title">
        <h1>Mon Profil Academique</h1>
      </div>
      <div className="searchbar">
        <input className='search' type="search" name="" id="" placeholder='matricule' onChange={(e) => setMatricule(e.target.value)}/>
        <button className="btnGo"  onClick={()=>fetchFiles(matricule)}>Go</button>
      </div>

      <div>
    
            {

            files.length === 0? <div className="App"> 
            
            <h3>No Files Yet</h3></div> :
            files.map((item,index)=>{
            return(
                <div className="files" key={index}> 
                <h3>{item.name}</h3> 
                <button onClick={() => {
            const base64String = item.data; // Assuming this is a base64-encoded string
            const byteCharacters = atob(base64String);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);

            // Convert byte array to string safely
            let binary = '';
            byteArray.forEach((byte) => {
                binary += String.fromCharCode(byte);
            });

            // Create a data URI from the byte array
            const dataURI = 'data:' + byteArray.type + ';base64,' + btoa(binary);

            // Create a temporary anchor element
            const tempLink = document.createElement('a');
            tempLink.href = dataURI;
            tempLink.download = item.name; // Set the desired filename here
            tempLink.style.display = 'none'; // Hide the link visually but keep it accessible

            // Append the anchor to the body
            document.body.appendChild(tempLink);
            // Trigger the download by simulating a click
            tempLink.click();

            // Optionally, remove the anchor from the DOM immediately after the download starts
            setTimeout(() => {
                document.body.removeChild(tempLink);
            }, 100); // Adjust the timeout as needed

            setFiles([]);
            }} className='btnGo'>Download</button>

                </div>
            )
            })
            
            }
    </div>
    </div>
  );
}