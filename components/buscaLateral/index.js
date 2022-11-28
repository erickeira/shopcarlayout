import { useEffect, useState } from 'react'
import styles from './buscalateral.module.css'
import { apiUrl } from '../../utils'
import InputSelect from '../inputSelect';
import Link from 'next/link';

export default function BuscaLateral(props){
    const { avancada } = props
    const [ loading, setLoading ] = useState(true);
    const [ tipos, setTipos ] = useState([]);    
    const [ marcas, setMarcas ] = useState([]);    
    const [ modelos, setModelos ] = useState([]);
    
    const [ versoes, setVersoes ] = useState([]);
    const [ cores, setCores ] = useState([]);
    const [ combustiveis, setCombustiveis ] = useState([]);
    const [ cidades, setCidades ] = useState([]);
    const [ opcionais, setOpcionais ] = useState([]);    
    const [ categorias, setCategorias ] = useState([]);
    const [ estadosUso, setEstadosUso ] = useState([{nome: 'Usado'},{nome: 'Novo'}]);
    const [ dadosBusca, setDadosBusca ] = useState({ 
        tipo: "", 
        marca: "", 
        modelo: "", 
        anode: "", 
        anoate: "", 
        kmde: "",
        kmate: "",
        valorde: "", 
        valorate: "", 
        versao: "", 
        cor: "", 
        cidade: "", 
        combustivel: "", 
        estadouso: "", 
        opcionais: [], 
        categorias: [] 
    });


    useEffect(() => {
        getTipos()
    },[])

    function mudarDadosBusca(novoDado){
        setDadosBusca({...dadosBusca, ...novoDado})
    }

    useEffect(() => {
        if(dadosBusca.tipo) getDados()
    },[dadosBusca])

    async function getTipos(){
        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: JSON.stringify({
              request: [ { acao: "obtertiposveiculos", }]
           }),
          })
          let auxData = await res.json()
          setTipos(auxData.tiposVeiculos)
    }   

    function clearDados(valorTipo) {
        setDadosBusca({ tipo: valorTipo ? valorTipo : dadosBusca.tipo, marca: "", modelo: "", versao: "", cor: "", combustivel: "", cidade: "", anode: "", anoate: "", valorde: "", valorate: "", estadouso: "", opcionais: [], categorias: [] }); 
        // setValueFrom('');setValueTo('');
        setModelos([]);setVersoes([]);setCores([]);setCidades([]);setCombustiveis([]);setOpcionais([]);setCategorias([]);
    }

    async function getDados(){
        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: JSON.stringify({
              request: [
                  { 
                      acao: "obterveiculos",
                      params: { 
                          busca: "veiculos",
                          filtros: avancada ? ['Tudo'] : ['Marcas','Modelos'],
                          ...dadosBusca  },
                          
                  }
              ]
           }),
          })
          let data = await res.json()
          console.log(data)
          if (Object.keys(data.busca).includes('filtros') && data.busca.filtros !== null) {   
            Object.keys(data.busca.filtros).includes('marcas') && setMarcas(data.busca.filtros.marcas);
            //   Object.keys(res).includes('modelos') && setModelos(res.modelos);
            //   Object.keys(res).includes('versoes') ? setVersoes(res.versoes) : setVersoes([]);
            //   Object.keys(res).includes('cores') && setCores(res.cores);
            //   Object.keys(res).includes('combustiveis') && setCombustiveis(res.combustiveis);
            //   Object.keys(res).includes('cidades') && setCidades(res.cidades);
            //   Object.keys(res).includes('opcionais') && setOpcionais(res.opcionais);
            //   Object.keys(res).includes('categorias') && setCategorias(res.categorias);
          }
    }

    function handleBusca(){
        getDados()
    }

    const BotaoBusca = () => {
        if(!dadosBusca.tipo && !dadosBusca.marca){
            return(
                <div className={styles.containerBotaoBuscaDesativado}>
                    <span>Buscar</span>
                </div>
            )
        }
        return(
            <Link href={`/busca`}>
                <div onClick={() => handleBusca()} className={styles.containerBotaoBusca}>
                    <span>Buscar</span>
                </div>
            </Link>
        )

    }

    return(
        <div className={styles.container}> 
            <InputSelect
                titulo={'Tipo'}
                options={tipos.map(tipo => {return {value: tipo.nome, label: tipo.nome}}) }
                callbackchange={(e) => clearDados(e.value)}
            />
            <InputSelect
                titulo={'Marca'}
                options={marcas?.map(marca => {return {value: marca.nome, label: marca.nome}}) }
                callbackchange={(e) => mudarDadosBusca({marca : e.value})}
            />
            <BotaoBusca/>
        </div>
    )
}

