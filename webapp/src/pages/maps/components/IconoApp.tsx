type ImageProp = {

};

function Image(props: ImageProp): JSX.Element{
    return (
        <>
            <div className="imagen">
            <img src={'../multimedia/icono2.jpg'} alt="Icono" ></img>
            </div>
        </>
    );
}

export default Image;