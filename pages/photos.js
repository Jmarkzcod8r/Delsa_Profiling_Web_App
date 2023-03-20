// import React, { useState } from 'react';
// import Dropzone from 'react-dropzone';
// import axios from 'axios';

// export default function Photos() {


//   const [file, setFile] = useState(null);

//   const onDrop = (acceptedFiles) => {
//     setFile(acceptedFiles[0]);
//   };

//   const uploadFile = async () => {
//     // Create a new FormData object
//     const formData = new FormData();
//     formData.append('file', file);

//     console.log("formdata: ", formData)
//     try {
//       // Make a POST request to the server
//       const response = await axios.post('/api/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h1>Upload your photo</h1>
//       <Dropzone onDrop={onDrop} >
//         {({getRootProps, getInputProps}) => (
//           <div  className='bg-pink-300 h-20' {...getRootProps()}>
//             <input {...getInputProps()}/>
//             <p>Drag and drop your photo here, or click to select a file</p>
//           </div>
//         )}
//       </Dropzone>
//       <button onClick={uploadFile} disabled={!file}>
//         Upload
//       </button>
//     </div>
//   );
// }
