import { useState } from "react";
import { FcFolder } from "react-icons/fc";
import { ImCross } from "react-icons/im";
import axios from 'axios'

import "./upload.css"
import Loader from "../loader/Loader";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoader, setUser } from "../../store/slices/auth";
import userData from "../../helper/userInfo";
import { toast } from "react-toastify";

export default function UploadSystem(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user,loader} = useSelector((state)=>state.auth)
    const [uploadFile,setUploadData] = useState(false);
    const [uploadProgress,setUploadProgress] = useState(0);
    const [fileSelected,setFileSelected] = useState(false);
    //console.log(uploadFile);

    function formatBytes(bytes) {
        if (bytes >= 1073741824) {
            return (bytes / 1073741824).toFixed(2) + ' GB';
        } else if (bytes >= 1048576) {
            return (bytes / 1048576).toFixed(2) + ' MB';
        } else if (bytes >= 1024) {
            return (bytes / 1024).toFixed(2) + ' KB';
        } else {
            return bytes + ' Bytes';
        }
    }

    async function uploadData() {
        if(!user) {
            navigate('/login');
            return;
            
        }

        const formdata = new FormData();
        const size = formatBytes(uploadFile.size);
        formdata.append('size',size)
        formdata.append('file',uploadFile);
        formdata.append('title',uploadFile.name);
        formdata.append('id',user._id);
        const res = await axios.post('https://databridge-1544.onrender.com/api/upload',formdata,{
            onUploadProgress : (progressEvent) => {
                const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                  );
                  //console.log(percentCompleted);
                  setUploadProgress(percentCompleted);
            }

        })
      

        navigate('/myAccount');
        toast.success('File Uploaded successfully')

    }

    if(loader) return <Loader></Loader>


    if(fileSelected) {
        return(
            <div className="uploadingWrapper">
                <div className="uploadingInnerDiv3">
                    <img id="fileImg" src="https://res.cloudinary.com/dhfas7qft/image/upload/v1712581850/icons8-file_qwx96e.svg" alt="" />
                    <div className="uploadingInnerDiv1">
                        <p id="uploadingFileName">{uploadFile.name}</p>
                        <div className="progress">
                            <div className="progressBar" style={{width : `${uploadProgress}%`}}></div>
                        </div>

                    </div>

                    {uploadProgress === 100 ?<img id="uploadedDataImg" src="https://res.cloudinary.com/dhfas7qft/image/upload/v1712663800/icons8-correct-128_hpjle2.png"/> : <div className="uploadingInnerDiv2">{`${uploadProgress}%`}</div>  }
                </div>
            </div>

        );
    }
    
    return (
        <div className="uploadWrapper">
            <label for="fileUpload" className="uploadInnerDiv1">
                <input onChange={(e)=>{setUploadData(e.target.files[0])}} type="file" name="" id="fileUpload" hidden />
                <div className="uploadInnerDiv2">
                    <img id="uploadImg" src="https://res.cloudinary.com/dhfas7qft/image/upload/v1712583936/arrow_dlouvk.png" alt="" />
                    <p id="uploadDg1">Drag & Drop any File</p>

                    {
                        uploadFile instanceof File && <div className="uploadInnerDiv3">
                            <div className="uploadInnerDiv4">
                                <FcFolder size={40} />
                                <p id="fileName">{uploadFile.name}</p>
                                <ImCross onClick={(e)=>{e.preventDefault();setUploadData(false)}} color="red" size={20} style={{marginTop  : '10px',marginLeft : '10px'}}></ImCross>

                            </div> 

                            <button id="uploadActionBtn" onClick={()=>{setFileSelected(true); uploadData()}}>Upload</button>
                            
                        </div>
                    }
            

                </div>

            </label>
        </div>
    );
}
