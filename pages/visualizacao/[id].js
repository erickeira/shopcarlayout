
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { apiUrl, getUrlImg} from '../../utils';
import styles from  './visualizacao.module.css';
import { MdDone, MdFavoriteBorder,MdShare } from 'react-icons/md'

export default function Visualizacao(props){
    const { veiculo } = props.data
    const urlImg = getUrlImg(1000)

    const ImageSlider = () => {
        const imagens = veiculo.fotos
        const [imagemSelecionada, setImagemSelecionada] = useState(imagens[0])
        const [animationData, setAnimationData] = useState();

        // useEffect(() => {
        //   import('../../assets/anim/loading.json').then(setAnimationData);
        // }, []);

        return(
            <div className={styles.containerImageSlider}>
                <Image
                    src={urlImg + imagemSelecionada}
                    width={500}
                    height={375}
                    className={styles.fotoImageSlider}
                    alt={``}
                    priority={1}
                />
                <ul className={styles.containerFotosMiniatura}>
                    {
                        imagens.map(imagem => {
                            return(
                                <li onClick={() => setImagemSelecionada(imagem)}>
                                    <Image
                                        src={getUrlImg(100) + imagem}
                                        width={50}
                                        height={38}
                                        className={imagemSelecionada == imagem ? styles.fotoMiniaturaSelecionada :  styles.fotoMiniatura}
                                        alt={``}
                                        priority={1}
                                    />
                                </li>
                            )
                        })
                    }
                </ul>
                <span className={styles.responsabiliza}>*O ShopCar não se responsabiliza pelas informações e fotos contidas neste anúncio, sendo todas elas única e exclusivamente de responsabilidade do anunciante.</span>
            </div>
        )
    }
    const Detalhes = () => {
        return(
            <div className={styles.containerDetalhes}>
                <div className={styles.secao1}>
                    <div className={styles.containerMarcaIcones}>
                        <span className={styles.marca}>{veiculo.marca}</span>
                        <div className={styles.containerIcones}>
                            <div className={styles.containerIcone}>
                                <MdFavoriteBorder size={20} />
                            </div>
                            <div className={styles.containerIcone}>
                                <MdShare size={20} />
                            </div>
                        </div>
                    </div>
                    <span className={styles.modelo}>{veiculo.modelo}</span>
                </div>
                <div className={styles.secao2}>
                    <div className={styles.descricoes}>
                        { 
                            veiculo.anomodelo && 
                            <div className={styles.containerdescricao}>
                                <span className={styles.descricaoTitulo}>Ano/Modelo</span>
                                <span className={styles.descricao}>{veiculo.anomodelo}</span>
                            </div>
                        }
                                                { 
                            veiculo.cor && 
                            <div className={styles.containerdescricao}>
                                <span className={styles.descricaoTitulo}>Cor</span>
                                <span className={styles.descricao}>{veiculo.cor}</span>
                            </div>
                        }
                                                { 
                            veiculo.km && 
                            <div className={styles.containerdescricao}>
                                <span className={styles.descricaoTitulo}>Km</span>
                                <span className={styles.descricao}>{veiculo.km} km</span>
                            </div>
                        }

                        { 
                            veiculo.combustivel && 
                            <div className={styles.containerdescricao}>
                                <span className={styles.descricaoTitulo}>Combustível</span>
                                <span className={styles.descricao}>{veiculo.combustivel}</span>
                            </div>
                        }

                    </div>
                    <div className={styles.containerPreco}>
                        <span className={styles.preco}>R$ {veiculo.preco},00</span>
                    </div>
                </div>
                {
                        veiculo.opcionais &&
                        <div className={styles.secao3}>
                            <div className={styles.titulo}>
                                <span>Opcionais</span>
                            </div>

                                <div className={styles.containerOpcoes}>
                                    {
                                        veiculo.opcionais.map(opcao => {
                                            return (
                                                <div className={styles.containerOpcao}>
                                                    <span className={styles.opcao}>
                                                        <MdDone style={{marginRight: 5}}/>
                                                        {opcao}
                                                    </span>
                                                </div>
                                            )
                                        }) 
                                    }
                                </div>


                        </div>
                }
                {
                    veiculo.maisopcionais && 
                    <div className={styles.secao4}>
                            <div className={styles.containerObservacoes}>
                                <span className={styles.titulo}>Observações do anunciante</span>
                                <span className={styles.observacao}>{veiculo.maisopcionais}</span>
                            </div>
                    </div>
                }

                {
                        veiculo.observacoes && 
                        <div className={styles.secao5}>
                            <div className={styles.containerObservacoes}>
                                <span className={styles.titulo}>Observações do anunciante</span>
                                <span className={styles.observacao}>{veiculo.observacoes}</span>
                            </div>
                        </div>
                }

            </div>
        )
    }
    return(
        <div>
            <div className={styles.containerSliderDetalhes}>
                <ImageSlider/>
                <Detalhes/>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const { params } = context
    const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify({ request:
          [		
              { acao: "obterveiculo" , params: { id: params.id } }
          ]
        }),
    })
    const data = await res.json()
    console.log(data)
    return {
      props: { data }, // will be passed to the page component as props
    }
}