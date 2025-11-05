import React from 'react';

export function SearchForm({category}) {
    return (
        <div>
            <select name="search_cartegory" style={{width:"15%"}}>
                {category && category.map(item => 
                    <option value={item.value}>{item.name}</option>
                )}
            </select>
            <input type="text" name="search_content" />
            <button>검색하기</button>
        </div>
    );
}

