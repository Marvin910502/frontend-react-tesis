import { Image } from "react-bootstrap"


const Page404 = () => {
    return (
        <div>
            <h1 className="text-center mt-5">La página o el recurso que busca no existe</h1>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Image className="mt-0 w-75" src="image-404.png"/>
            </div> 
        </div>
    )
}
export default Page404