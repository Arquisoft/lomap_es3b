import {useState} from "react";

type AmigoProps = {
    name: string
}

function Amigo({name}: AmigoProps): JSX.Element {

    const [access, setAccess] = useState(false);
    
    return (
        <>
            <div className="amigo">
                <p>{name}</p>
                <button className={access?"green":"red"} onClick={()=>setAccess(!access)}></button>
            </div>
        </>
    );
}

export default Amigo;
