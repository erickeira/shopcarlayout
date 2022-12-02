import { useEffect, useState } from 'react';
import styles from './pageselector.module.css'
import {MdKeyboardArrowRight, MdKeyboardArrowLeft} from 'react-icons/md'

export default function PageSelector(props){
    const {pagina, totalPaginas, callbackchange, escutaRefresh} = props
    const [paginas , setPaginas] = useState(
        Array.from({length: (totalPaginas < 5 ? (totalPaginas || 1) : 5)}, (_, i) => i + pagina)
    )


    
    function nextPaginas(){
        // let ultimaPosicao = paginas[paginas.length - 1]
        // let quantidadeBotoes = (totalPaginas - ultimaPosicao) < 5 ? (totalPaginas - ultimaPosicao) : 5
        // let novasPaginas = Array.from({length: (totalPaginas < 5 ? (totalPaginas || 1) : quantidadeBotoes)}, (_, i) => i + ultimaPosicao + 1)
        // setPaginas(novasPaginas)
        // callbackchange(paginas[paginas.length - 1] + 1)
    }

    function montaPaginas(){

    }


    return(
        <div className={styles.container}>
            {
                totalPaginas > 0 ? paginas.map(numeroPagina => {
                    return(
                        <div 
                            className={
                                numeroPagina == pagina ? styles.containerItemSelecionado : styles.containerItem
                            }
                            onClick={() => callbackchange(numeroPagina)}
                        >
                            <span>
                                {numeroPagina}
                            </span>
                        </div>
                    )
                })
                : null
            }
            {
                totalPaginas > 5 ?
                <div 
                    className={ styles.containerItem}
                    onClick={() =>  nextPaginas()}
                >
                    <MdKeyboardArrowRight size={25}/>
                </div>
                : null
            }


        </div>
    )
}