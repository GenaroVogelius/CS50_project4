
import { useState, useEffect } from "react";


export function Title(props) {
    const [title, setTitle] = useState(props.page)

    useEffect(() => {
        setTitle(props.page)
    },[props.title])
    
    return <h2 className="title mb-4 mt-2">{title}</h2>;
}

