import './Modal.css'

 const Modal = ({data}) =>{

    

    return (
        <>
            <div className="modal fade  " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog bg-dark">
                    <div className="modal-content bg-dark">
                        <div className="modal-header bg-dark">
                            <h5 className="modal-title bg-dark" id="staticBackdropLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        {data != undefined ? (
                            <div className="modal-body d-flex flex-column align-items-center">
                            <div className='modal-img-perfil '>
                                <img className="mb-3"src={data.thumbnail.path+'.'+data.thumbnail.extension} alt="perfil imagem " />
                                <h2 style={{color:'white'}}>{data.name}</h2>
                                <div className="perfil-icons">
                                <i className="bi bi-journal-text" style={{color:'white'}}></i>
                                <i className="bi bi-journal-text" style={{color:'white'}}></i>
                                <i className="bi bi-journal-text" style={{color:'white'}}></i>
                            </div>
                            </div>
                            
                        </div>
                        ):(<p>Carregando...</p>)}
                    </div>
                </div>
    </div>
        </>
    )
}

export default Modal