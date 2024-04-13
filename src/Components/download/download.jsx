import { json, useParams } from "react-router-dom"
import "./download.css"
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../store/slices/auth";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import {Redirect} from 'react-router-dom'


export default function Download() {
    const { loader } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [pageData, setPageData] = useState(null);
    console.log(pageData)
    console.log(loader)

    const { id } = useParams();
    console.log(id);

    async function downloadData() {
        return window.location.href =  `https://databridge-1544.onrender.com/api/file/${id}`;
      
    
    }

    async function getData() {
        dispatch(setLoader(true));

        try {
            const data = await axios.post('https://databridge-1544.onrender.com/api/linkData', {
                code: id

            })

            setPageData(data.data);
            dispatch(setLoader(false));


        } catch (error) {
            dispatch(setLoader(false));


        }






    }

    useEffect(() => {
        getData()
    }, [])



    if (loader) return <Loader></Loader>
    if (!pageData) return <div className="errorClassNoPage"><p>Page doesnt exist</p></div>
    return (
        <div className="downloadWrapper">
            <div className="downloadInnerDiv1">
                <div className="downloadInnerDiv2">
                    <img id="downloadFileImg" src="https://res.cloudinary.com/dhfas7qft/image/upload/v1712581850/icons8-file_qwx96e.svg" alt="" />
                        <div>
                            <p id="pageTitle">{pageData.data.title}</p>
                            <p id="uploadDate">{`uploaded ${pageData.data.uploadDate}`}</p>

                        </div>

                    <button id="dwnlBtn" onClick={()=> downloadData()}>Download {pageData.data.size}</button>

                </div>


            </div>

        </div>
    )
}
