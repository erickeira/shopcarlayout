
import styles from './cardveiculo.module.css'
import Image from 'next/image'
import { formatadorValor, getUrlImg, removerSpecialsUrl, urlImg } from '../../../utils'
import Link from 'next/link'
import {MdLocalGasStation, MdDateRange} from 'react-icons/md'
import {GiFoundryBucket} from 'react-icons/gi'

export default function CardVeiculo(props) {
  const { data, grade} = props
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

  const GradeItem = () => {
    return(
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
  
  if(grade) return <GradeItem/>
  return (
    <Link 
        href={{
          pathname: urlamigavel ,
          query: { id: id },
        }}
      >
        <div className={styles.containerList}>
            <Image
                src={urlImg + data.foto1}
                width={170}
                height={120}
                className={styles.foto}
                alt={``}
                priority={1}
            />
            <div className={styles.containerModeloInfos}>
              <div className={styles.containerModeloList}>
                <span className={styles.modeloList}>{modelo}</span>
              </div>  
              <div className={styles.containerInfoValorAnunciante}>
                <div className={styles.containerInfosList}>
                  <div className={styles.containerInfosGrid}>
                    {
                      anomodelo &&
                      <div className={styles.itemInfoList}>
                        <MdDateRange size={16}/>
                        <span className={styles.infoList}>{ano}/{anomodelo}</span>
                      </div>
                    }
                    {
                      cor &&
                      <div className={styles.itemInfoList}>
                        <GiFoundryBucket size={16}/>
                        <span className={styles.infoList}>{cor}</span>
                      </div>
                    }
                    {
                      combustivel && 
                      <div className={styles.itemInfoList}>
                        <MdLocalGasStation size={16}/>
                        <span className={styles.infoList}>{combustivel}</span>
                      </div>
                    }
                    {
                      km &&
                      <div className={styles.itemInfoList}>
                        <MdLocalGasStation size={16}/>
                        <span className={styles.infoList}>{km} Km</span>
                      </div>
                    }


                  </div>
                </div>
                <div className={styles.containerValorList}>
                  <span className={styles.precoList}>{preco ? formatadorValor(preco) : 'Consulte-nos'}</span>
                  <span className={styles.detalhes}>Ver detalhes</span>
                </div>
               
              </div>

          </div>
          <div className={styles.containerAnuncianteList}>
            <div className={styles.logoAnunciante}>
            </div>
            <span className={styles.localidadeAnunciante}>Campo Grande - MS</span>
          </div>
          
        </div>
      </Link>
  )
}
