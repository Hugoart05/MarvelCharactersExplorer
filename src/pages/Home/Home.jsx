import './Home.css'
import api from '../../api.js'
import Modal from '../../components/Modal'

import MD5 from 'crypto-js/md5'
import { useEffect, useState } from 'react'

const Home = ()=>{
    const [heroes, setHeroes] =  useState([])
    const [offset, setOffset] = useState(0)
    const [hero, setHero] = useState('')
    const [modal, setModal] = useState([])

   
   console.log( modal)
    async function FetchData(){
        const response = await api.get(`/characters?offset=${offset}&limit=9`)
        setHeroes(response.data.data.results)
    }

    useEffect(()=>{
        FetchData()
    }, [])

    const handleChange = async (e) =>{
        e.preventDefault()
        const {hero} = e.target
        setHero(hero)

        try{
            const changeData = await api.get(`/characters?nameStartsWith=${hero}`)
            console.log(changeData)
        }
        catch(error){
            console.error(error)
        }
    }
    
    const handleClick = async ()=>{
        const newOffset = offset + 12; 
        const response = await api.get(`/characters?offset=${newOffset}&limit=12`); 

        const modifiedHeroes = response.data.data.results.map(hero => {
            return {
                ...hero,
                id: hero.id + newOffset 
            };
        });

        setHeroes([...heroes, ...modifiedHeroes]);
        setOffset(newOffset); 
    }

    const Details = async (id) =>{
        const perfilDoHerói = heroes.find(x => x.id == id)
        setModal(perfilDoHerói)
    }
    
    return(
        <>
            
            <Modal  data={modal}/>
            <section className="banner">
                <div className='container d-flex justify-content-center flex-column align-items content-serach' >
                    <h1 >Saiba mais <br/>sobre seu personagem favorito</h1>
                    <form className='search mt-2'>
                        <input 
                            type="text" 
                            className="form-control search-text" 
                            id="floatingInputValue" 
                            placeholder='Ex: iron man' 
                            value={hero} 
                            onChange={handleChange}
                            onSubmit={(e)=>e.preventDefault()}
                        />

                    </form>
                    <div className='container d-flex justify-content-center mt-3 social-dev'>
                        <a href="#"><i className='bi bi-github'></i></a>
                        <a href="#"><i className='bi bi-linkedin'></i></a>
                    </div>
                </div>
           </section>
           <main className='bg-dark pt-4 pb-4'>
                <div className='container '>
                    <div className="row  p-3 d-flex flex-wrap d-flex justify-content-center   ">
                        {heroes.length > 0 ? (
                            heroes.map(({id,name,thumbnail,description},index)=>{
                                const imageurl = `${thumbnail.path}.${thumbnail.extension}`
                                const notFound = 'image_not_available.jpg'

                                const limitCharacters = (text, maxChars) =>{
                                    if(text.length > maxChars){
                                        return description.slice(0, maxChars) + '...';
                                    }
                                    return text
                                }

                                if(!imageurl.includes(notFound)){
                                    return(
                                        <div className=" cardheroe col-lg-3 col-md-9 col-sm-8 mb-4" key={id}>
                                            <div className="img" style={{backgroundImage:`url(${thumbnail.path}.${thumbnail.extension})`}}>
                                                <span></span>
                                            </div>
                                            <div className="content">
                                                <span className='title'>{limitCharacters(name, 18)}</span>
                                                <p className="desc">
                                                    {limitCharacters(description,50)}
                                                </p>
                                                
                                                <p className="nav-link" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={()=>{Details(id)}} >
                                                    Ler mais {id}
                                                    <input type="hidden" value={id} name='heroId' />
                                                </p>
                                            </div>
                                    </div>
                                    )
                                }
                            })
                        ) : (
                            <p>nao tem</p>
                        )}
                    </div>
                    
                </div>  
            </main>
            <div className="container-fluid d-flex justify-content-center p-3 bg-danger" onClick={handleClick} style={{cursor:'pointer'}}>
                <span style={{color:'white', }}>Ver mais</span>
            </div>
            <footer className="bg-danger text-white text-center py-3">
                <div className="container">
                    <p>&copy; 2023 Hugo Silva</p>
                </div>
            </footer>
        </>
    )
}

export default Home
