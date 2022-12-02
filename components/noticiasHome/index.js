import Image from 'next/image'
import styles from './noticiashome.module.css'
import { urlImg } from '../../utils'

export default function NoticiaHome(props){
    const { noticias } = props
    console.log(noticias.itens[0])
    return(
        <div className={styles.container}>
            <div className={styles.primeirasNoticias}>
                <div>
                    <Image
                        src={`${urlImg}/stored/news/${noticias.itens[0].foto1}`}
                        width={400}
                        height={300}
                        style={{}}
                        alt={``}
                        priority={1}
                    />
                    <div className={styles.containerTituloNoticia}>
                        <span>{noticias.itens[0].titulo}</span>
                    </div>
                </div>
                <div className={styles.noticiasDireita}>
                    <div>
                        <Image
                            src={`${urlImg}/stored/news/${noticias.itens[1].foto1}`}
                            width={320}
                            height={148}
                            style={{}}
                            alt={``}
                            priority={1}
                        />
                    </div>
                    <div>
                        <Image
                            src={`${urlImg}/stored/news/${noticias.itens[2].foto1}`}
                            width={320}
                            height={148}
                            style={{}}
                            alt={``}
                            priority={1}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}