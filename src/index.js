import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import './App.css';
import axios from 'axios';
import { Spin } from 'antd';

function FilePicker() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFiles([...event.target.files]);
  };
//   const formData = new FormData();
// formData.append(file, selectedFiles);
//   const postFiles = async() =>{
//     await axios.post("https://profilacademiqueess.onrender.com/api/v1/files/add/many", {params:{
// file:selectedFiles
//     }},
//        {
//       headers:{
//         'Content-Type': 'multipart/form-data'
//       }
//     }
//   )
//   .then(function(response){
//     console.log(response.data);
//   })
//   .catch(function(error){
//     console.log(error);
//   })
//   }

const postFiles = async () => {
  const formData = new FormData();
  selectedFiles.forEach((file, index) => {
    formData.append(`file`, file);
  });

  await axios.post("https://profilacademiqueess.onrender.com/api/v1/files/add/many", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  .then(function(response) {
    console.log(response.data);
  })
  .catch(function(error) {
    console.log(error);
  });
};



  // const uploadFiles = async (files) => {
  //   const formData = new FormData();
    
  //   // Append each file to formData
  //   files.forEach((file, index) => {
  //     formData.append( file,`file[${index}]`);
  //   });
  
  //   try {
  //     const response = await axios.post("https://profilacademiqueess.onrender.com/api/v1/files/add/many", formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     })
  //     .then(function(response){
  //       console.log('Files uploaded successfully', response.data);
  //     })
  //     .catch(function(error){
  //       console.log(error);
  //     })
      
  //   } catch (error) {
  //     console.error('Error uploading files:', error.response ? error.response.data : error.message);
  //   }
  // };

  return (
    <div className="admin">
      <input type="file" name='file'  multiple onChange={handleFileChange} />
      <ul>
        {Array.from(selectedFiles).map((file, index) => (
          
          <li key={index}>{file.name}</li>
          
        ))}
      </ul>
      {
        selectedFiles.length === 0 ? <span>No files yet</span>:
      <button onClick={()=>{postFiles()}}> Send Profiles
      </button>
}
    </div>
  );
}


function App() {

  const [files,setFiles] = useState([])
  const [matricule,setMatricule] = useState("")
  const [dLink,setDLink]=useState("")

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
        <a href='#' className="btnGo"  onClick={()=>fetchFiles(matricule)}>Go</a>
      </div>

      <div>
        {/* {

        files.length == 0? <div className="App"> 
        <Spin size="large" />
      <h3>No Files Yet</h3></div> :
        files.map((item,index)=>{
          return(
            <div className="files" key={index}>
              <h3>{item.name}</h3> <a  href="#" onClick={()=>{

const base64String = item.data; // Assuming this is a base64-encoded string
const byteCharacters = atob(base64String);
const byteNumbers = new Array(byteCharacters.length);
for (let i = 0; i < byteCharacters.length; i++) {
  byteNumbers[i] = byteCharacters.charCodeAt(i);
}
const byteArray = new Uint8Array(byteNumbers);
const blob = new Blob([byteArray], { type: 'application/octet-stream' });
const url = window.URL.createObjectURL(blob);

const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', item.name); // Set the desired filename here
  document.body.appendChild(link);
  link.click();
  setFiles([]);
          
              }} className='btnGo'>Download</a>
            </div>
          )
        })
          
      } */}








{

files.length == 0? <div className="App"> 
<Spin size="large" />
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



{/* <button onClick={() => {
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
  const dataURI = 'data:application/pdf;base64,' + btoa(binary);

  // Create a temporary anchor element
  const tempLink = document.createElement('a');
  tempLink.href = dataURI;
  tempLink.download = `${item.name}.pdf`; // Explicitly specifying the .pdf extension
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
}} className='btnGo'>Download</button> */}
    </div>
  )
})
  
}
      </div>
      
  
    </div>
  );
}
const router = createBrowserRouter([
  {
    path: '/admin',
    element: <FilePicker />,
  },
  {
    path: '/',
    element: <App />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
