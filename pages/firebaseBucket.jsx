// import { useState, useEffect } from "react";
import { storage } from "./firebaseAPI.jsx";
import Image from "next/image.js";
// import {
//   ref,
//   uploadBytes,
//   UploadTask,
//   listAll,
//   getDownloadURL,
//   list,
// } from "firebase/storage";
// import { v4 } from "uuid"; //--> This will enable us to generate random numbers


// function App() {
//   // State to store uploaded file
//   const [file, setFile] = useState(null); // progress
//   const [imagelist, setImagelist] = useState([]);
//   //   const [percent, setPercent] = useState(0); // Handle file upload event and update state

//   const imageListRef = ref(storage, "files/");

//   function handleChange(event) {
//     setFile(event.target.files[0]);
//   }

//   const handleUpload = () => {
//     if (!file) {
//       alert("Please upload an image first!");
//     }

//     const storageRef = ref(storage, `/files/${file.name + v4()} `); // progress can be paused and resumed. It also exposes progress updates. // Receives the storage reference and the file to upload.
//     // I may need to switch to uploadTask
//     uploadBytes(storageRef, handleUpload).then((snapshot) => {
//       alert("image uploaded");
//       getDownloadURL(snapshot.ref).then((url) => {
//         setImagelist((prev) => [...prev, url]);
//       });
//     });


//   };

//   useEffect(() => {
//     listAll(imageListRef).then((response) => {
//       console.log("response: ",response);
//       response.items.forEach((item) => {

//         getDownloadURL(item).then((url) => {
//           console.log("url: ",url);
//           setImagelist([...imagelist, url]);
//             console.log("imagelist: ",imagelist);
//         });
//       });
//     });
//     console.log("imagelistss: ",imagelist);
//   }, []);

//   return (
//     <div>
//       <input type="file" onChange={handleChange} accept="/image/*" />
//       <button onClick={handleUpload}>Upload to Firebase</button>

//       <br/>
//       {imagelist.map((url) => {
//         {/* <div className="bg-pink-400">sad
//           {url}asd */}
//           return <Image key={url} alt="" src={url} height={20} width={20} />
//         {/* </div>; */}
//       })}
//       cnvmbjghjk
//     </div>
//   );
// }
// export default App;

// import "./App.css";
import { useState, useEffect } from "react";
import {ref,  uploadBytes,  getDownloadURL,  listAll,  list,} from "firebase/storage";
// import { storage } from "./firebase";
import { v4 } from "uuid";

function App() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, "images/");
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  const lastImageUrl = imageUrls[imageUrls.length - 1];
  return (
    <div className="App">
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile}> Upload Image</button>
      {/* {imageUrls.map((url) => {
        return <Image src={url} key={url} height={50} width={50} alt=''/>;
      })} */}

      <Image src={lastImageUrl} height={50} width={50} alt=''/>

    </div>
  );
}

export default App;