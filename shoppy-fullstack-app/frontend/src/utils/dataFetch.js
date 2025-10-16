import axios from "axios";

/**
 * 배열의 rows 그룹핑
 */
export const groupByRows = (array, number) => {
    //출력 포맷 함수 : 한줄에 3개씩 출력
    // const rows = [];    //[[{}, {}, {}],[{}, {}, {}],[{}]]
    // for(let i=0 ; i<list.length ; i+=3){
    //     // const row = list.slice(i, i+3);     //0~2, slice 새로운 배열 반환
    //     rows.push(list.slice(i, i+3));
    // }

    //초기 acc=[] 에 첫 값 [cur0]를 씌워보냄 => acc = [[cur0]] 2번째는 acc[0]에 [cur1]를 보냄 
    //=> acc = [[cur0,cur1]] 3번째도 2번과 마찬가지 => acc = [[cur0, cur1, cur2]] 에 첨으로 돌아감
    //acc[]가 아닌 acc에 []를 씌운 값을 보냄 => [[cur0, cur1, cur2], [cur3]] 이걸 반복
    const rows = array.reduce((acc, cur, idx) => {  
        if(idx%number===0) acc.push([cur])
        else acc[acc.length-1].push(cur);
        return acc;
    }, []);  

    return rows;
}

/**
 * fetch 함수를 이용하여 데이터 가져오기
 */
export const fetchData = async(url) => {
    const response = await fetch(url);
    const jsonData = await response.json();
    
    return jsonData;
}

/**
 * axios 함수를 이용하여 데이터 가져오기
 */
export const axiosData = async(url) => {
    const response = await axios(url);
    
    return response.data;
}

