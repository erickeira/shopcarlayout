
import styles from './cardveiculo.module.css'
import Image from 'next/image'
import { formatadorValor, removerSpecialsUrl, urlImg } from '../../../utils'
import Link from 'next/link'

export default function CardVeiculo(props) {
  const { data } = props
  const {
    ano,
    anomodelo,
    combustivel,
    cor,
    destaque,
    destaquecapalista,
    destaquefeirao,
    destaquelista,
    favorito,
    foto1,
    id,
    idloja,
    km,
    marca,
    modelo,
    ordemdestaque,
    ordempreco,
    preco,
    preco2,
    selos,
    temfotos,
    zerok,
  } = data
  const urlamigavel = `/visualizacao/${marca.toLowerCase().replace(' ', '-')}-${removerSpecialsUrl(modelo.toLowerCase().replace(' ', '-'))}-${removerSpecialsUrl(anomodelo.toLowerCase().replace(' ', '-'))}-${cor.toLowerCase()}`
  console.log(data)
  return (
    <Link 
      href={{
        pathname: urlamigavel ,
        query: { id: id },
      }}
    >
      <div className={styles.container}>
          <Image
              src={urlImg + data.foto1}
              width={170}
              height={120}
              className={styles.foto}
              alt={``}
              priority={1}
          />
          <div className={styles.containerInformacoes}>
            <div className={styles.containerModelo}>
              <span className={styles.modelo}>{modelo}</span>
            </div>  
      
            <div className={styles.containerInfos}>
              {
                anomodelo &&
                <div className={styles.itemInfo}>
                  <span className={styles.info}>{ano}/{anomodelo}</span>
                </div>
              }
              {
                cor &&
                <div className={styles.itemInfo}>
                  <span className={styles.info}>{cor}</span>
                </div>
              }
              {
                km &&
                <div className={styles.itemInfo}>
                  <span className={styles.info}>{km} Km</span>
                </div>
              }

              {
                combustivel && 
                <div className={styles.itemInfo}>
                  <span className={styles.info}>{combustivel}</span>
                </div>
              }
            </div>
            <div className={styles.containerValor}>
              <span className={styles.valor}>{preco && preco > 0 ? formatadorValor(preco) : `Consulte-nos`}</span>
            </div>
          </div>
      </div>
    </Link>
  )
}
