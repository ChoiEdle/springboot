//Dom 트리 생성(body 실행) 후 DOMContentLoaded 함수 처리
window.addEventListener('DOMContentLoaded', function(){
    createTable('all');
    filterMenuEvent();
})

function menuDefaultColor(menu) {
    menu.style.background = "rgb(137, 137, 135)";
    menu.style.borderLeft = `1px solid rgb(137, 137, 135)`;
    menu.style.borderBottom = `2px solid rgb(137, 137, 135)`;
}

function menuSelectColor(menu) {
    menu.style.background = "rgb(251, 67, 87)";
    menu.style.borderLeft = `1px solid rgb(251, 67, 87)`;
    menu.style.borderBottom = `2px solid rgb(251, 67, 87)`;
}

function filterMenuEvent() {
    let menuList = document.querySelectorAll(".filter-menu>li>a");
    // console.log(menuList);
    menuList.forEach((menu) => {
        menu.id === 'all' ? menuSelectColor(menu) : menuDefaultColor(menu)
    });
    menuList.forEach((menu) => {
        menu.addEventListener('click', () => {
            //전체 메뉴를 기본색으로 초기화
            menuList.forEach((menu) => {
                menuDefaultColor(menu);
            });
            menuSelectColor(menu);
            
            let type = menu.id;
                
            // console.log(menu.id);
            // filterData(type);
            createTable(type);
        });
    })    
}

async function filterData(type) {
    let list = await getData();
    let filterList = list.filter((item) => item.type === type);
    // createTable(filterList);
    return filterList;
}

async function getData() {
    let response = await fetch("../data/support.json");
    return response.json();
}

async function createTable(type) {  //list는
    let list = null;
    if(type === 'all') {
        list = await getData();
    } else {
        list = await filterData(type);
    }
    let output = `
        <table class="stable">
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
                ${list.map((item, index) => `
                    <tr>
                        <td>${index+1}</td>
                        <td>[${item.type}]</td>
                        <td><a href="#">${item.title}</a></td>
                        <td>${item.rdate}</td>
                        <td>${item.hits}</td>
                    </tr>
                `).join("")}
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="5">1 2 3 4 5 >> </td>
                </tr>
            </tfoot>
        </table>
    `;

    document.querySelector(".stable")?.remove();    //?앞이 존재하면 삭제한다는 뜻
    document.querySelector("#before-table").insertAdjacentHTML('afterend', output);


}


