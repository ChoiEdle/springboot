import React, { useState, useEffect } from 'react';
import { axiosData } from '../../utils/dataFetch.js';

export function Return() {
    const [returnData, setReturnData] = useState({});
    useEffect(() => {
        const fetch = async() => {
            const jsonData = await axiosData("/data/productReturn.json");
            setReturnData(jsonData);
        }
        fetch();
    }, [])

    return (
        <div>
            <div style={{paddingTop:"20px"}}></div>
            <h4>{returnData && returnData.title}</h4>
            <p>{returnData && returnData.description}</p>
            <table className='review-list-content'>
                <tbody>
                    {returnData.list && returnData.list.map(item => 
                        <tr style={{paddingTop:"10px"}}>
                            <td style={{width:"20%", textAlign:"center"}}>{item.title}</td>
                            <td style={{width:"60%"}}>
                                <ul style={{textAlign:"left"}}>
                                    {item.infoList.map(item=>
                                        <li>{item}</li>
                                    )}
                                </ul>
                            </td>
                        </tr>
                    )}
                    <tr>
                        <td colSpan={2}>{"<< "} 1 2 3 4 5 {" >>"}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

