import React, { useEffect, useState } from 'react';
import { SearchForm } from '../components/commons/SearchForm.jsx';
import { MenuList } from '../components/commons/MenuList.jsx';
import { axiosData } from '../utils/dataFetch.js';

export function Support() {
    const [menus, setMenus] = useState([]);
    const [category, setCategory] = useState([]);
    const [list, setList] = useState([]);
    useEffect(()=>{
        const load = async() => {
            const jsonData = await axiosData("/data/support.json");
            setMenus(jsonData.menus);
            setCategory(jsonData.category);
            setList(jsonData.list);
        }
        load();
    },[]);

    const filterList = (type) => {
        const filter = async() => {
            const jsonData = await axiosData("/data/support.json");
            const filterData = jsonData.list.filter((item)=>item.type===type);
            type === "all" ? setList(jsonData.list) : setList(filterData);
        }
        filter();
        //아래는 내가 한 것 : 위의 filterList함수에 async를 붙였었음
        // const jsonData = await axiosData("/data/support.json");
        // const data = jsonData.list.filter((item)=>item.type===type);
        // type === "all" ? setList(jsonData.list) : setList(data);
    }

    return (
        <div className="content">
            <div className="support center-layout">
                <h1 className="center-title">공지/뉴스</h1>
                <div className="support-content">
                    <p style={{color:"#777"}}>CGV의 주요한 이슈 및 여러가지 소식들을 확인할 수 있습니다.</p>
                    {<SearchForm category={category} />}
                    {/* <div>
                        <select name="search_cartegory">
                            <option value="title">제목</option>
                            <option value="content">내용</option>
                        </select>
                        <input type="text" name="search_content" />
                        <button>검색하기</button>
                    </div> */}
                    <nav>
                        <MenuList menus={menus} filterList={filterList} />
                        {/* <ul className="filter-menu">
                            <li><a href="#" id="all">전체</a></li>
                            <li><a href="#" id="system">시스템점검</a></li>
                            <li><a href="#" id="theater">극장</a></li>
                            <li><a href="#" id="event">행사/이벤트</a></li>
                            <li><a href="#" id="partner">제휴이벤트</a></li>
                            <li><a href="#" id="etc">기타</a></li>
                        </ul> */}
                    </nav>
                    <p id="before-table">총 114건이 검색되었습니다. </p>
                    
                    {/* 내용 출력 - 테이블 */}
                    <table className="stable">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>구분</th>
                                <th>제목</th>
                                <th>등록일</th>
                                <th>조회수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list && list.map((item, idx) => 
                                <tr>
                                    <td>{idx+1}</td>
                                    <td>[{item.type}]</td>
                                    <td>{item.title}</td>
                                    <td>{item.rdate}</td>
                                    <td>{item.hits}</td>
                                </tr>
                            )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={5}>1 2 3 4 5 {">>"} </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>  
    );
}

