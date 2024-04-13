import { useDispatch, useSelector } from "react-redux";
import "./myaccount.css"
import { FaCopy } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import userData from "../../helper/userInfo";
import { setUser } from "../../store/slices/auth";
import { useState,useEffect } from "react";
import axios from "axios";

import { setLoader } from "../../store/slices/auth";
import Loader from "../loader/Loader";
import { useNavigate } from "react-router-dom";

export default function MyAccount() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user,loader} = useSelector((state) => state.auth)
    if(!user) navigate('/login')
  
    const [deleteFile, setDeleteFile] = useState(false);
    const [deleteId,setDeleteId] = useState(null);

       async function getData(){
    dispatch(setLoader(true))
    const user_Info =   await userData(user._id);
     // console.log(user_Info)
        dispatch(setUser(user_Info.data.userData));
        localStorage.setItem('user123',JSON.stringify(user_Info.data.userData));
        dispatch(setLoader(false))

   }

   useEffect(()=>{
    getData();
      

   },[])
  

    async function delete_file() {
        dispatch(setLoader(true))
      const data =   await axios.post('https://databridge-1544.onrender.com/api/deleteFile',{
            id : user._id,
            linkCode : deleteId
        })

        console.log(data);

      const user_Info =   await userData(user._id);
     // console.log(user_Info)
        dispatch(setUser(user_Info.data.userData));
        localStorage.setItem('user123',JSON.stringify(user_Info.data.userData));
        dispatch(setLoader(false))
        setDeleteFile(false)
        if(data.data.success) {
            toast.success('file deleted successfully')
        }

        else {
            toast.error('file couldnt be deleted')
        }

    }

    if(loader) return <Loader></Loader>



    return (
        <div className="MyLinksWrapper">
            <div className="myLinksInnerDiv1">
                <div className="myLinksInnerDiv2">
                    <p id="links">Files</p>
                    <p>Downloads</p>
                    <p>Link</p>
                    <p>Delete</p>


                </div>

                <div className="myLinksInnerDiv3">
                    {
                        user.data.length > 0 ? user.data.map((element) => {
                            return (<div className="linksDiv">
                                <p id="linkTitle">{element.title}</p>
                                <p id="linkDwnlds">{element.downloads}</p>
                                <p id="cpyBtn" style={{ cursor: 'pointer' }} onClick={() => { navigator.clipboard.writeText(`https://databridge-eight.vercel.app/file/${element.linkCode}`); toast.success('Link Copied') }}><FaCopy color="#5865f2" /></p>
                                <p><MdDelete onClick={()=>{setDeleteFile(true);setDeleteId(element.linkCode)}} style={{cursor : 'pointer'}} color="red" /></p>


                            </div>);
                        }) : <div className="errMg">No Data Available</div>
                    }

                </div>

                <div className="moreUpload">
                    <button id="uploadMore" onClick={()=> navigate('/')}>Upload File</button>
                </div>

            </div>

            {
                deleteFile && <div className="deleteDialogBox">
                    <div className="deleteDialogBoxInnerDiv">
                        <p id="deleteDg1">{`Are you sure, you want to delete this File?`}</p>
                        <div className="deletedgActionBtns">
                            <button onClick={()=>{setDeleteFile(false); setDeleteId(null) }} id="cancelDelete">Cancel</button>
                            <button  id="proceedDelete" onClick={()=>{delete_file();setDeleteFile(false)}}>Proceed</button>


                        </div>

                    </div>

                </div>
            }



        </div>
    )



}
