import Image from 'next/image'
import styles from './noticiashome.module.css'
import { urlImg } from '../../utils'

export default function NoticiaHome(props){
    const { noticias } = props
    console.log(noticias.itens[0])
    return(
        <div className={styles.container}>
            <div className={styles.primeirasNoticias}>
                <div className={styles.containerPrimeiraNoticia}>
                    <Image
                        src={`${urlImg}/stored/news/${noticias.itens[0].foto1}`}
                        width={420}
                        height={320}
                        className={styles.imageNoticia}
                        alt={``}
                        priority={1}
                    />
                    <div className={styles.containerTituloNoticia}>
                        <span>{noticias.itens[0].titulo}</span>
                    </div>
                </div>
                <div className={styles.noticiasDireita}>
                    <div className={styles.noticiaDireita}>
                        <Image
                            src={`${urlImg}/stored/news/${noticias.itens[1].foto1}`}
                            width={320}
                            height={148}
                            className={styles.imageNoticia}
                            alt={``}
                            priority={1}
                        />
                        <div className={styles.containerTituloNoticia}>
                            <span>{noticias.itens[1].titulo}</span>
                        </div>
                    </div>
                    <div className={styles.noticiaDireita}>
                        <Image
                            src={`${urlImg}/stored/news/${noticias.itens[2].foto1}`}
                            width={320}
                            height={148}
                            className={styles.imageNoticia}
                            alt={``}
                            priority={1}
                        />
                        <div className={styles.containerTituloNoticia}>
                            <span>{noticias.itens[2].titulo.substring(0, 50)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}