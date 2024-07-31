import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect,useState } from 'react';
import { Spin } from 'antd';

function App() {

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
      <h3>{item.name}</h3> <a  href="#" onClick={() => {
  const base64String = item.data; // Assuming this is a base64-encoded string
  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  
  // Create a data URI from the byte array
  const dataURI = 'data:' + byteArray.type + ';base64,' + btoa(String.fromCharCode.apply(null, byteArray));
  
  // Create a temporary anchor element
  const tempLink = document.createElement('a');
  tempLink.href = dataURI;
  tempLink.download = item.name; // Set the desired filename here
  
  // Append the anchor to the body and simulate a click
  document.body.appendChild(tempLink);
  tempLink.click();
  
  // Clean up by removing the anchor from the DOM
  document.body.removeChild(tempLink);
  
  setFiles([]);
}} className='btnGo'>Download</a>
    </div>
  )
})
  
}
      </div>
      
  
    </div>
  );
}

export default App;
