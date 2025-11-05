import loaderGif from '/src/components/css/loaderGif.gif';

export default function Loader() 
{
    return (
        <div className="container">
            <img className="spinner" src={loaderGif} alt="Cargando..."/>
            <p className="small">Cargando datos...</p>
        </div>
    );
}