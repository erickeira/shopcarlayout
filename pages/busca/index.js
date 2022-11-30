
import styles from './busca.module.css'
import { useContext, useEffect, useState } from 'react'
import VeiculosList from '../../components/veiculosList'
import { apiUrl } from '../../utils'
import { MdDone } from 'react-icons/md'
import MenuLateral from '../../components/menuLateral'
import BuscaLateral from '../../components/buscaLateral'
import { AuthContext } from '../../context'
import Ads from '../../components/ads/ads'

export async function getStaticProps(context) {
  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: JSON.stringify({ request:
      [		
          { acao: "obterveiculos" , params: { busca: "destaques", limite: 15, ordenacao: 'random' } },
          { acao: "obternoticias" , params: { filtrar: 'destaques', limite: 5 } }
      ]
    }),
  })

  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data }, 
  }
}

export default function Busca(props) {
  const { busca } = props.data
  const [ destaques, setDestaques ] = useState(busca.veiculos);  
  const [ noticias, setNoticias ] = useState([]);
  const [pagina, setPagina] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)
  const [totalResultados, setTotalResultados] = useState(0)
  const {setPageTitle, dadosBusca} = useContext(AuthContext)

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
          veiculos={destaques}
          pagina={pagina}
          totalPaginas={totalPaginas}
          totalResultados={totalResultados}
          callbackmudarpagina={(res) => setPagina(res)}
        />
        <Ads/>
      </div>
    </div>
  )
}


