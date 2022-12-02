
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { apiUrl, formatadorValor, getUrlImg ,urlImg} from '../../utils';
import styles from  './visualizacao.module.css';
import { MdDone, MdFavoriteBorder,MdShare, MdCall, MdLocationOn, MdDirectionsCar, MdVerifiedUser,MdSearch} from 'react-icons/md'
import { AiFillPrinter } from 'react-icons/ai'
import {  FaClipboardList } from 'react-icons/fa'
import termometro from '../../public/assets/termometro.png'
import { AuthContext } from '../../context';
import Ads from '../../components/ads/ads';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';



export default function Visualizacao(props){
    const {setPageTitle} = useContext(AuthContext)
    const { veiculo } = props.data
    const { anunciante } = veiculo
    

    useEffect(() => {
        setPageTitle(`${veiculo.marca} - ${veiculo.modelo}`)
    },[veiculo])

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
                        <span className={styles.preco}>{veiculo.preco ? formatadorValor(veiculo.preco) : 'Consulte-nos'}</span>
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
                                <span className={styles.titulo}>Mais Opcionais</span>
                                <span className={styles.observacao}>{veiculo.maisopcionais}</span>
                            </div>
                    </div>
                }
                                {
                        veiculo.descricao && 
                        <div className={styles.secao5}>
                            <div className={styles.containerObservacoes}>
                                <span className={styles.titulo}>Descrição do veículo</span>
                                <span className={styles.observacao}>{veiculo.descricao}</span>
                            </div>
                        </div>
                }

                {
                        veiculo.observacoes && 
                        <div className={styles.secao6}>
                            <div className={styles.containerObservacoes}>
                                <span className={styles.titulo}>Observações do anunciante</span>
                                <span className={styles.observacao}>{veiculo.observacoes}</span>
                            </div>
                        </div>
                }
                <div className={styles.secao7}>
                    <div className={[styles.containerIcone]} style={{width:110, marginRight: 10}}>
                        <FaClipboardList />
                        <span className={styles.label}>Ficha técnica</span>
                    </div>
                    <div className={[styles.containerIcone]} style={{width:110, marginRight: 10}}>
                        <AiFillPrinter />
                        <span className={styles.label}>Imprimir</span>
                    </div>
                    <div className={[styles.containerIcone]} style={{width:110, marginRight: 10}}>
                        <AiFillPrinter />
                        <span className={styles.label}>Reportar erro</span>
                    </div>
                </div>
                <div className={styles.secao8}>
                    <span className={styles.titulo}>Entre em contato com o anunciante</span>
                    <div className={styles.containerAnuncianteFormulario}>
                        <div className={styles.containerAnunciante}>
                            <div className={styles.containerLogoAnunciante}>
                                <Image
                                    src={getUrlImg(1000, 'lojas') + anunciante.logomarca}
                                    width={100}
                                    height={50}
                                    // className={}
                                    alt={``}
                                    priority={1}
                                />
                            </div>
                            <span className={styles.nomeAnunciante}>{anunciante.nome}</span>
                            <span className={styles.enderecoAnunciante}>
                                {`${anunciante.endereco} - ${anunciante.bairro} - ${anunciante.cidade} / ${anunciante.uf}`}
                            </span>
                            <div className={styles.containerIcone} style={{marginTop: 10}}>
                                <MdCall size={20} style={{marginRight: 5}}/>
                                <span>Ver telefones</span>
                            </div>
                            <div className={styles.containerIcone} style={{marginTop: 10}}>
                                <MdLocationOn size={20} style={{marginRight: 5}}/>
                                <span>Mapa</span>
                            </div>
                            <div className={styles.containerIcone} style={{marginTop: 10}}>
                                <MdDirectionsCar size={20} style={{marginRight: 5}}/>
                                <span>Estoque da Loja</span>
                            </div>
                        </div>
                        <div className={styles.containerFormulario}>
                            <form>
                                 <input 
                                    type="text" 
                                    className={styles.inputTexto} 
                                    id={'nomeProposta'} 
                                    name={'nomeENomesta'}
                                    placeholder={'Nome'}
                                />
                                <input 
                                    type="text" 
                                    className={styles.inputTexto} 
                                    id={'emailProposta'} 
                                    name={'emailProposta'}
                                    placeholder={'E-mail'}
                                />
                                <input 
                                    type="text" 
                                    className={styles.inputTexto} 
                                    id={'telefoneProposta'} 
                                    name={'telefoneProposta'}
                                    placeholder={'Telefone'}
                                />
                                <input 
                                    type="text" 
                                    className={styles.inputTexto} 
                                    id={'cidadeUfProposta'} 
                                    name={'cidadeUfProposta'}
                                    placeholder={'Cidade/UF'}
                                />
                                <textarea 
                                    rows="4" 
                                    cols="50"
                                    type="area" 
                                    className={styles.inputTexto} 
                                    id={'descricaoProposta'} 
                                    name={'descricaoProposta'}
                                    placeholder={'Nome'}
                                    style={{height: 100, paddingTop: 10}}
                                >
                                    Olá, Gostaria de mais informações deste veículo. Por favor entre em contato.
                                </textarea>
                                <input 
                                    type={'submit'}
                                     value='Enviar Proposta' 
                                     className={styles.inputTexto} 
                                     style={{
                                        backgroundColor: '#990000', 
                                        color: '#fff',
                                    }}
                                />
                       </form>
                        </div>
                    </div>
                </div>
                <div className={styles.secao9}>
                    <MdVerifiedUser/>
                    <span className={styles.label}>Anunciante do Shopcar desde {anunciante.desde}</span>
                </div>

            </div>
        )
    }
    return(
        <div>
            <div className={styles.containerSliderDetalhes}>
                <div className={styles.containerImageSlider}>
                    <ImageGallery 
                        lazyLoad={true} 
                        showFullscreenButton={true} 
                        items={veiculo.fotos.map(foto => {return {original: `${getUrlImg(1000)}${foto}`, thumbmail: `${getUrlImg(50)}${foto}`}})} 
                        useBrowserFullscreen={ false }
                        showPlayButton={false}
                        showThumbnails={true}
                        thumbnailPosition={`bottom`}
                        renderFullscreenButton={(onClick, isFullscreen) => {
                            return(
                                <div style={{position: 'absolute', color: '#fff', right: 10, bottom: 10}} onClick={onClick}>
                                    <MdSearch size={30}/>
                                </div>
                            )
                        }}
                    />
                </div>
                <Detalhes/>
                <Ads/>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const { query } = context
    const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify({ request:
          [		
              { acao: "obterveiculo" , params: { id: query.id } }
          ]
        }),
    })
    const data = await res.json()
    return {
      props: { data }, // will be passed to the page component as props
    }
}

