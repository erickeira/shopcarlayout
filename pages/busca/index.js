
import styles from './busca.module.css'
import { useContext, useEffect, useState } from 'react'
import VeiculosList from '../../components/veiculosList'
import { apiUrl } from '../../utils'
import { MdDone } from 'react-icons/md'
import MenuLateral from '../../components/menuLateral'
import BuscaLateral from '../../components/buscaLateral'
import { AuthContext } from '../../context'
import Ads from '../../components/ads/ads'


export default function Busca(props) {
  const {setPageTitle, dadosBusca, veiculos, totalResultados, pagina, totalPaginas, setPagina} = useContext(AuthContext)

  useEffect(() =>{
    setPageTitle(`Busca por ${dadosBusca.tipo} ${dadosBusca.marca} nos Classificados de Veículos do SHOPCAR`)
  },[])

  return (
    <div className={styles.container}>
      <div  className={styles.containerMenuList}>
        <MenuLateral>
          <BuscaLateral/>
        </MenuLateral>
        <VeiculosList
          veiculos={veiculos}
          pagina={pagina}
          totalPaginas={totalPaginas}
          totalResultados={totalResultados}
          callbackmudarpagina={(res) => setPagina(res)}
          paginacao
        />
        <Ads/>
      </div>
    </div>
  )
}


