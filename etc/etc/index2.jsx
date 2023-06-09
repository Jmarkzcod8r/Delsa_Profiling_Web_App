
import axios from "axios";
import { useRouter } from "next/router"
import {React , useEffect, useState}from 'react'
import { Getuserinfo } from "../functions global/Getuserinfo";
import Image from "next/image";
import Usernav from "./Components/Usernav";
import Swal from "sweetalert2";
import {db} from '../firebase/firebase-config'
import {doc , setDoc} from "firebase/firestore"
import { getAuth , onAuthStateChanged, signOut} from "firebase/auth"
import Add from './Icons/Add.svg';
import Copy from './Icons/Copy.png';
import Save from './Icons/Save.png';
import shredder from './Icons/shredder.png';
import Clr from './Icons/Clear.png';
import Del from './Icons/Delete.png'
import Hide from './Icons/hidden.png'
import Out from './Icons/Out.png'
import Archive from './Icons/Archive.png'
import Info from './Icons/info.png'
import Blank from './Icons/Blank.png'
import Feedback from './Icons/feedback.png'
import changes from './Icons/changes.png'
import { ForphotoURL } from "./Components/Usernav";
import {thisbase} from "../functions global/geturl";
import { list } from "postcss";

export default function Index  (){

  //------------ Declaring Varibles ----------------

  const [photoURL, setPhotoURL]=useState('')
  const [title,setTitle]=useState('')
  // This is the log we will be showing to the main container in the middle.

  const [name, setName]=useState('')
  const [log, setLog]=useState('')
  const [highlight, setHighlight] = useState('')
  const [desc, setDesc]=useState('')
  const [comments, setComments]=useState('')
  const [date,setDate]=useState('')
  const [_id, set_id]=useState('temp id')
  const [mainlist, setMainlist] = useState([])
  const [credemail,setCredemail] = useState('')
  const [feedback,setFeedback] = useState ('temp feedback')
  const [countwords, setCountwords] = useState(0)

  const [selectedButton, setSelectedButton] = useState(false);
  const buttons = ['Button 1', 'Button 2', 'Button 3'];

  const [archive, setArchive] = useState(false);
  const [showList, setShowList] = useState(true);

  const router = useRouter();

  // const Sweetshow =()=> {

  //   var temp='';
  //   const swaldata = Swal.fire({
  //     title: 'Login Form',
  //     html: `<input type="text" id="login" class="swal2-input" placeholder="Username">
  //     <input type="password" id="password" class="swal2-input" placeholder="Password">`,
  //     confirmButtonText: 'Sign in',
  //     focusConfirm: false,
  //     preConfirm: () => {
  //       const login = Swal.getPopup().querySelector('#login').value
  //       const password = Swal.getPopup().querySelector('#password').value
  //       if (!login || !password) {
  //         Swal.showValidationMessage(`Please enter login and password`)
  //       }
  //       return { login: login, password: password }
  //     }
  //   }).then((result) => {setFeedback(result);
  //     },['']);

  // }

  var thisbasez = thisbase()
  const api = axios.create({
      baseURL: thisbasez,
    });

async function getData() {
const data = await api.get(`/clients`+`/`+credemail)
  let clientslist = data.data.clients;
  setMainlist(data.data.clients.reverse())

}


let emaillist=[]

useEffect(()=> {

  const ForphotoURL =async ()=>{
    const [userInfo] = await Getuserinfo()
    setPhotoURL(userInfo.photoURL)
  };

  ForphotoURL();
   async function Dbadd(){
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await api.get(`/clients`+`/`+user.email)
        setMainlist(data.data.clients.reverse())
        setCredemail(user.email)
        emaillist.push(user.email);

        const uid = user.uid;
        await setDoc(doc(db, "Firebase-test users", "num4"), {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified
        });
      } else {
      console.log('error');
      }
            });
                // console.log('sendingss');

              };
    Dbadd()
    Datenow();
    getData();

                                            },[]) //------------> End of Use Effect
  const signOut = () => {
    localStorage.clear();
    router.push("/login");
    console.log('here at login');
  }

function Clear(){setComments('');setDesc('');setLog('');setHighlight('');}

// const Savedb = async (e) => {e.preventDefault();  Datenow();
async function Savedb(e){e.preventDefault();  Datenow();
  try {
    setName('@archive')
    await axios.post(thisbasez+"/clients", {log, desc, comments, date, name, highlight, credemail}, {
      headers: {'Content-Type': 'application/json',  } }) ;
          }
  catch (error) {console.error(error.response.data);};
      getData();  alert('New Entry Created') }

function Datenow(){var today = new Date();

function thisday(){
    // var typeday = today.getDay();
    // if (typeday === 0) { return 'Mon'  };
    // if (typeday === 1) { return 'Tue'  };
    // if (typeday === 2) { return 'Wed'  };
    // if (typeday === 3) { return 'Thu'  };
    // if (typeday === 4) { return 'Fri'  };
    // if (typeday === 5) { return 'Sat'  };
    // if (typeday === 6) { return 'Sun'  };
    //     }

        var typeday = today.getDay();
        if (typeday === 1) { return 'Mon'  };
        if (typeday === 2) { return 'Tue'  };
        if (typeday === 3) { return 'Wed'  };
        if (typeday === 4) { return 'Thu'  };
        if (typeday === 5) { return 'Fri'  };
        if (typeday === 6) { return 'Sat'  };
        if (typeday === 0) { return 'Sun'  };
            }
    var tday = thisday()

function thisMonth(){
  var typedy = today.getMonth();
  var typeday = typedy+1
  if (typeday === 1) { return 'Jan'  };
  if (typeday === 2) { return 'Feb'  };
  if (typeday === 3) { return 'Mar'  };
  if (typeday === 4) { return 'Apr'  };
  if (typeday === 5) { return 'May'  };
  if (typeday === 6) { return 'Jun'  };
  if (typeday === 7) { return 'Jul'  };
  if (typeday === 8) { return 'Aug'  };
  if (typeday === 9) { return 'Sep'  };
  if (typeday === 10) { return 'Oct'  };
  if (typeday === 11) { return 'Nov'  };
  if (typeday === 12) { return 'Dec'  };

        }
  var Mnth = thisMonth()
  // const date = today.getFullYear() + ' / ' + Mnth + ' / ' + today.getDate() + ' ( ' + tday + ' )';
  const date = today.getDate() + '-' + Mnth + '-' + today.getFullYear() + ' ( ' + tday + ' )';
    setDate(date)}

    function Inchangelog(e){
      e.preventDefault();
      setLog(e.target.value);
      // console.log(e.target.value);

        // console.log(x);
      setCountwords(e.target.value.replace(/^\s+|\s+$|\s+(?=\s)/g, "").split(' ').length)

    }

    function Inchangedesc(e){
      e.preventDefault();
      setDesc(e.target.value)
    }

    function Inchangecomm(e){
      e.preventDefault();
      setComments(e.target.value)
    }

    function Inchangehighlight(e){
      e.preventDefault();
      setHighlight(e.target.value)
    }

    if (typeof window !== 'undefined'){
    var textareas = document.getElementsByTagName('textarea');
    var count = textareas.length;
    for(var i=0;i<count;i++){
        textareas[i].onkeydown = function(e){
            if(e.key==='Tab' ){
                e.preventDefault();
                var s = this.selectionStart;
                this.value = this.value.substring(0,this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
                this.selectionEnd = s+1;
            }
        }
    } }

   async function NewPage(){
      try {

        await axios.post(thisbasez+"/clients", {log:'', desc:'', comments:'', date, name:'', highlight:'', credemail}, {
          headers: {'Content-Type': 'application/json',  } }) ;
              }
      catch (error) {console.error(error.response.data);};
          getData();  alert('Blank Entry Created');

      // Clear();
      // setTimeout(Savedb() , 1000);


      // let i;
      // for (i= 0; i<2 ; i++){
      //   Clear()
      //   if (i===1){
      //     Savedb();
      //     break
      //   }

      // }

    }

    // function ClearNav (){

    //     var x = document.getElementById("Unav");
    //     if (x.style.display === "none") {
    //       x.style.display = "block";
    //     } else {
    //       x.style.display = "none";
    //     }

    // }

    const handleUpdateClient = async (e) => {e.preventDefault();
      try {
        await api.put(`clients/${_id}`, { log, desc, comments, name, highlight }).then (
          alert('Entry Updated')
        )
            } catch (error) {
              console.log(error);
                                      };
      getData();

    };

    const Delete = async(e)=>{
      e.preventDefault();
      try {
        await api.delete(`/clients/${_id}`)
      } catch (err) {
        console.log('err:',err);
      };
      Clear();
      getData()

    }

    // const Testfunction = async(e,resv) => {
    //   e.preventDefault();
    //   try {
    //     await axios.post(thisbasez+"/clients/feedback", {feedback:{resv}, date, credemail}, {
    //       headers: {'Content-Type': 'application/json',  } }) ;
    //           }
    //   catch (error) {console.error(error.response.data);};
    //       getData();  alert('Blank Entry Created');

    // }

    const Swalfeed =()=>{
      Swal.fire({
        title: "Feedbox!",
        text: "Suggesstion, Comments and Recommendations are very much appreciated",
        input: 'textarea',
        showCancelButton: true
    }).then(async (result) => {
        if (result.value) {
          console.log('this is result:',result);
          try {
            const data = await axios.post(thisbasez+"/clients/feedback", {feedback:(result.value), date, credemail}, {
              headers: {'Content-Type': 'application/json',  } }) ;
              console.log('data:',data.data.status);
              Swal.fire({
                title:'Status:',
                text:data.data.status,
              })

                  }

          catch (error) {console.error(error.response.data);};
              getData();

        }
    });
    }

    function countWord() {
      // Get the input text value
      var words = document
      .getElementById("tarea2").value;

      // Initialize the word counter
      var count = 0;

      // space character
      var split = words.split(' ');

      // Loop through the words and
      // increase the counter when
      // each split word is not empty
      for (var i = 0; i < split.length; i++) {
      if (split[i] != "") {
      count += 1;
      }
      }

      document.getElementById("show")}

    // const handleClick = () => {
    //   setSelected(!selected);
    // };
    const toggleList = () => {
      setShowList(!showList);
    };

    const toggleArchive = () => {
      setArchive(!archive); }

    // const Savedbarchive = async (e) => {e.preventDefault();  Datenow();
    //   try {
    //     // setName('@archive');
    //     await axios.post(thisbasez+"/clients", {log, desc, comments, date, name:'@archive', highlight, credemail}, {
    //       headers: {'Content-Type': 'application/json',  } }) ;
    //           }
    //   catch (error) {console.error(error.response.data);};
    //       getData();  alert('New Entry Created') }

    // const Shred = async (e) => {e.preventDefault();  Datenow();
    //   try {
    //     // setName('')
    //     await axios.post(thisbasez+"/clients", {log, desc, comments, date, name, highlight, credemail}, {
    //       headers: {'Content-Type': 'application/json',  } }) ;
    //           }
    //   catch (error) {console.error(error.response.data);};
    //       getData();  alert('New Entry Created') }

    const AddtoArchive = async (e) => {e.preventDefault();
      try {
        await api.put(`clients/${_id}`, { log, desc, comments, name:`${archive?name:'@archive'}` , highlight }).then (
          alert('Added to Archive')
        )
            } catch (error) {
              console.log(error);
                                      };
      getData();

    };

    const RemovedFromArchive = async (e) => {e.preventDefault();
      try {
        await api.put(`clients/${_id}`, { log, desc, comments, name:'', highlight }).then (
          alert('Removed From Archive')
        )
            } catch (error) {
              console.log(error);
                                      };
      getData();

    };





    const buttonStyles = {
      boxShadow: "none",
      ":active": {
        boxShadow: "0 0 10px #fff",
      },
      ":focus": {
        boxShadow: "0 0 10px #fff",
      },
      ":hover": {
        backgroundColor: "blue",
        color: "white",
      }
    };

    const Rename=()=>{
      Swal.fire({
        title: "Rename!",
        text: "Suggesstion, Comments and Recommendations are very much appreciated",
        input: 'textarea',
        showCancelButton: true
    }).then(async (result) => {
        if (result.value) {
          console.log('this is result:',result);
          try {
            // setName((result.value))
            await api.put(`clients/${_id}`, { log, desc, comments, name: (result.value) + ' @archive', highlight }).then (
              alert('Renamed and Saved to Archive!')
            )
                } catch (error) {
                  console.log(error);
                                          };
        getData();

        }
    });
    }

  return (
   <div className="block" >



      <button className=" right-0 p-2 mr-8 bg-blue-300 bg-opacity-40 rounded-full mt-2 mb-0 hover:scale-110 hover:bg-blue-400 drop-shadow-lg flex absolute m-2 bg-blue-300" onClick={Swalfeed}>
   <p>&nbsp; Send
    Feedback &nbsp;</p>
    <Image src={Feedback} alt="Clear" width={40} height={40} className="hover:scale-110 z-1000"/>
    </button>

       <img
      className='top-0 left-0 w-screen h-screen object-cover fixed -z-10'

      src={"https://cdn.pixabay.com/photo/2016/05/26/12/56/waterfalls-1417102_1280.jpg"}
      alt=' '  />

    <div id="Unav" className="h-20"><Usernav/>

     </div>

     <div className="absolute top-16 flex left-[55%] bg-blue-4000 ">Word Count:
     <span id="show">{countwords}</span>
     {/* <Image src={Feedback} alt="Clear" width={40} height={40} className="hover:scale-110 z-1000"/> */}
     </div>

    <div  className=" sm:block md:flex md:flex-row z-1000 relative w-full top-0  pt-3 lg:h-screen h-auto md:h-screen " >

                <div className="w-[100%] lg:w-[31.25%] relative flex flex-col  content-center items-center lg:p-2  lg:ml-4 mr-7
                       bg-white bg-opacity-80 backdrop-blur-lg rounded-xl drop-shadow-lg space-y-2" class="space-y-2">
                <div className="relative  grid w-[100%] grid-cols-5 justify-self-auto items-end p-1 mr-0 pb-4">
                  <div className="col-span-2  top-0 relative mb-16 ml-3">
                    <button onClick={signOut} ><Image src={Out} alt="Clear" width={40} height={40} className="hover:scale-110"/> </button>
                    </div>{archive}
                <img src={photoURL} alt="photome" className=" relative justify-self-center mt-5 rounded-full "/>
                </div>


                     <div  className="flex flex-row bg-blue-200 px-6 py-2 rounded-full">
                     <button onClick={Delete} title="Delete" className="mr-2"><Image src={Del} alt="Clear" width={40} height={40} className="hover:scale-110"/></button>
                     {/* <button onClick={Swalfeed} className="mx-2"><Image src={Info} alt="Clear" width={40} height={40} className="hover:scale-110"/></button> */}
                     <button onClick={Clear} title="Clear" className="mx-2"><Image src={Clr} alt="Clear" width={40} height={40} className="hover:scale-110"/></button>
                      <button onClick={handleUpdateClient} disabled={archive} title={archive?"Button Disbaled When Archive is True ":"Update"} className="mx-2"><Image src={Save} alt="Add" width={40} height={40} className="hover:scale-110"/></button>
                      <button onClick={Savedb} title="Duplicate" className="mx-2"><Image src={Copy} alt="Add" width={40} height={40} className="hover:scale-110"/></button>
                      <button onClick={NewPage} title="New"className="ml-2"><Image src={Blank} alt="Clear" width={40} height={40} className="hover:scale-110"/></button>

                      </div>

                     <div className=" p-2">{/* {name} */}{/* {credemail} */}
                     <button onClick={toggleList} title="Hide/Show" className="mr-2"><Image src={Hide} alt="Clear" width={40} height={40} className="hover:scale-110"/></button>

                     <button onClick={toggleArchive}  title="Show Archive Files" className={`${archive ? "shine" : ""} mr-2`}><Image src={Archive} alt="Clear" width={40} height={40} className="hover:scale-110 ; focus: " style={buttonStyles}/></button>
                     <button onClick={AddtoArchive} title="Add to Archive" className={`${archive ? "shine" : ""} mr-2`}><Image src={Add} alt="Clear" width={40} height={40} className="hover:scale-110"/></button>
                     <button onClick={RemovedFromArchive} title="Remove from Archive"  className={`${archive ? "shine" : ""} mr-2`}><Image src={shredder} alt="Clear" width={40} height={40} className="hover:scale-110"/></button>
                     <button onClick={Rename} title="Rename" className ={archive? "shine mr-2":'mr-2'}><Image src={changes} alt="Clear" width={40} height={40} blurHeight={40} className="hover:scale-110"/></button>
                     </div>

                  <div className=' mt-5 w-[95%] block h-[200px] md:h-auto px-4 overflow-auto rounded-xl'>
                        {showList && (
                        mainlist
                              // .filter((el, index) => !archive || el.name === '@archive')
                              .filter((el, index) => !archive || el.name.includes('@archive'))
                              .map((el, index)=> (

                          <div  key={index*2} className="flex flex-row">

                          <button key={index*3} onClick={function Con(){
                            Savedb();
                            el.name? setName(el.name):setName('')
                            el._id? set_id(el._id):set_id('null');
                            el.log  ? setLog(el.log):setLog('');
                            el.desc ? setDesc(el.desc):setDesc('') ;
                            el.comments ? setComments (el.comments): setComments('');
                            el.highlight? setHighlight (el.highlight) : setHighlight('');
                            setSelectedButton(index*3);
                          }} className={`last:w-full min-h-10 bg-violet-300 opacity-[95%] p-2 rounded mt-2 hover:scale-105 my-button ${index*3===selectedButton ? 'selected': ''}`}   >
                          {el.name.replace('@archive','')? el.name.replace('@archive',''):el.date}
                             </button></div>
                      ))                  )}

                   </div>
                </div>

                <textarea id="tarea2" type="text" placeholder='Entry' value={log} oninput={countWord} onChange={Inchangelog}
                  className="mt-2 md:mt-0 w-[100%] lg:w-[37.5%] h-[20em] md:h-full lg:h-full relative flex bg-white bg-opacity-80 backdrop-blur-lg rounded-xl drop-shadow-lg p-4 justify-center  md:mr-9"/>
                <div className='mt-2 md:mt-0 w-[100%] lg:w-[31.25%] sm:block md:flex md:flex-col lg:pr-9 h-10 md:h-screen'>
                   <textarea id="tarea2" type="text" placeholder='What Do You Want To Write Or Talk About?' value={highlight} /* defaultValue={desc} */ onChange={Inchangehighlight}
                           className="w-full h-[200%]  relative flex bg-white mb-4 bg-opacity-80 backdrop-blur-lg rounded-xl drop-shadow-lg p-4 justify-center"/>
                <textarea id="tarea2" type="text" placeholder='What Insights Do You Want To Take Note Of?' value={desc} /* defaultValue={desc} */ onChange={Inchangedesc}
                           className="w-full h-[200%]  relative flex bg-white mb-4 bg-opacity-80 backdrop-blur-lg rounded-xl drop-shadow-lg p-4 justify-center"/>
                  <textarea id="tarea2" type="text" placeholder='Is There Something You Want To Be Thankful For Today?' value={comments} /* defaultValue={comments} */ onChange={Inchangecomm}
                           className="w-full h-[200%]  relative flex bg-white bg-opacity-80 backdrop-blur-lg rounded-xl drop-shadow-lg p-4 justify-center"/>

                </div>
                      </div>
          </div>

  )
}


