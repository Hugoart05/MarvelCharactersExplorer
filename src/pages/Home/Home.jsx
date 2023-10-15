import './Home.css'
import api from '../../api.js'

import MD5 from 'crypto-js/md5'
import { useEffect, useState } from 'react'

const Home = ()=>{
    const [heroes, setHeroes] =  useState([])
    const [offset, setOffset] = useState(0)
    
    async function FetchData(){
        const response = await api.get(`/characters?offset=${offset}&limit=22`)
        setHeroes(response.data.data.results)
    }

    useEffect(()=>{
        FetchData()
    }, [])

    const handleClick = async ()=>{
        const newOffset = offset + 22; 
        const response = await api.get(`/characters?offset=${newOffset}&limit=22`); 

        const modifiedHeroes = response.data.data.results.map(hero => {
            return {
                ...hero,
                id: hero.id + newOffset 
            };
        });

        setHeroes([...heroes, ...modifiedHeroes]);
        setOffset(newOffset); 
    }
    

    return(
        <>
           <section className="banner">
                <div className='container d-flex justify-content-center flex-column align-items content-serach' >
                    <h1 >Encontre seu herói <br/>favorito e saiba tudo sobre ele</h1>
                    <form className='search mt-2'>
                        <input type="text" className="form-control search-text" id="floatingInputValue" placeholder='Ex: iron man'/>
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
                            heroes.map(({id,name,thumbnail,description})=>{
                                const imageurl = `${thumbnail.path}.${thumbnail.extension}`
                                const notFound = 'image_not_available.jpg'

                                const limitCharacters = (maxChars) =>{
                                    if(description.length > maxChars){
                                        return description.slice(0, maxChars) + '...';
                                    }
                                    return description
                                }

                                if(!imageurl.includes(notFound)){
                                    return(
                                        <div className=" cardheroe col-lg-3 col-md-9 col-sm-8 mb-4" key={id}>
                                            <div className="img" style={{backgroundImage:`url(${thumbnail.path}.${thumbnail.extension})`}}>
                                                <span></span>
                                            </div>
                                            <div className="content">
                                                <span className='title'>{name}</span>
                                                <p className="desc">
                                                    {limitCharacters(50)}
                                                </p>
                                                <a href="">ler mais</a>
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
