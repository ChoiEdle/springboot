
export function Menu({href, name, style, type, isIcon, icon, handleClick}) {
    return (
        <a href={href} className={style} onClick={()=>{handleClick(type)}}>{isIcon ? icon :""} {name}</a>
    );
}