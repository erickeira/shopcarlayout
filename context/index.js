import { useState, createContext, useEffect } from "react";
import { useRouter } from "next/router";
import { apiUrl } from "../utils";
import requisicao from "../pages/api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [pageTitle, setPageTitle] = useState(``)
    const router = useRouter();
    const { query } = router
    const [pagina, setPagina] = useState(1)
    const [totalPaginas, setTotalPaginas] = useState(0)
    const [avancada, setAvancada ] = useState(false);
    const [ loadingContext, setLoadingContext ] = useState(true);
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
    const [veiculos, setVeiculos] = useState([])
    const [totalResultados, setTotalResultados] = useState([])
    const [loadingBusca, setLoadingBusca] = useState(true)

    useEffect(() => {
        getTipos()
    },[])

    useEffect(() =>{
        let auxDadosBusca = {...dadosBusca}
        Object.entries(query).map(([chave, valor]) => {
            if(valor){
                auxDadosBusca[chave] = valor
            }
        })
        setDadosBusca(auxDadosBusca)
        getVeiculos(auxDadosBusca)
    },[query])

    useEffect(() => {
        getFiltros()
    },[marcas])

    useEffect(() => {
        getVeiculos()
    },[pagina])

    // console.log(dadosBusca)
    function mudarDadosBusca(novoDado){
        setDadosBusca({...dadosBusca, ...novoDado})
    }

    useEffect(() => {
        if(dadosBusca.tipo) {
            getMarcas()
            // mudarDadosBusca({ marca : ''})
        }

    },[dadosBusca.tipo])

    async function getTipos(){
        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: JSON.stringify({
              request: [ { acao: "obtertiposveiculos", }]
           }),
        })
        let data = await res.json()
        getMarcas()
        setTipos(data.tiposVeiculos)
    }   

    async function getMarcas(){
        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: JSON.stringify({
                request: [
                    { 
                        acao: "obterveiculos",
                        params: { 
                            busca: "veiculos",
                            filtros: ['Marcas'],
                            ...dadosBusca  },
                            
                    }
                ]
             })
        })
        let data = await res.json()
        if(!data.busca) return
        Object.keys(data.busca.filtros).includes('marcas') && setMarcas(data.busca.filtros.marcas);
    }

    async function getFiltros(){
        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: JSON.stringify({
                request: [
                    { 
                        acao: "obterveiculos",
                        params: { 
                            busca: "veiculos",
                            filtros: ['Tudo'],
                            ...dadosBusca  },
                            
                    }
                ]
             })
        })
        let data = await res.json()
        if(!data.busca || !data.busca.filtros) return
        Object.keys(data.busca.filtros).includes('versoes') ? setVersoes(data.busca.filtros.versoes) : setVersoes([]);
        Object.keys(data.busca.filtros).includes('cores') && setCores(data.busca.filtros.cores);
        Object.keys(data.busca.filtros).includes('combustiveis') && setCombustiveis(data.busca.filtros.combustiveis);
        Object.keys(data.busca.filtros).includes('cidades') && setCidades(data.busca.filtros.cidades);
        Object.keys(data.busca.filtros).includes('opcionais') && setOpcionais(data.busca.filtros.opcionais);
        Object.keys(data.busca.filtros).includes('categorias') && setCategorias(data.busca.filtros.categorias);
    }   
    function clearDados(valorTipo) {
        setDadosBusca({ tipo: valorTipo ? valorTipo : dadosBusca.tipo, marca: "", modelo: "", versao: "", cor: "", combustivel: "", cidade: "", anode: "", anoate: "", valorde: "", valorate: "", estadouso: "", opcionais: [], categorias: [] }); 
        // setValueFrom('');setValueTo('');
        setModelos([]);setVersoes([]);setCores([]);setCidades([]);setCombustiveis([]);setOpcionais([]);setCategorias([]);
    }

    async function getVeiculos(dados){
        setLoadingBusca(true)
        let res =  await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: JSON.stringify({ 
                request: [{ acao: "obterveiculos", params: { busca: "veiculos", pagina : pagina,... dados || dadosBusca} }] 
            })
        })
        let data = await res.json()
        if(!data.busca) return setLoadingBusca(false)
        Object.keys(data.busca).includes('veiculos') && setVeiculos(data.busca.veiculos)
        Object.keys(data.busca).includes('resultados') && setTotalResultados(data.busca.resultados)
        Object.keys(data.busca).includes('resultados') && setTotalPaginas(data.busca.paginas)
        setLoadingBusca(false)
    }

    function handleBuscar(){
        setPagina(1)
        
        if(router.pathname != "/busca") return router.push({pathname: '/busca', query: dadosBusca})
        getVeiculos()
    }
    return (
        <AuthContext.Provider value={{
            avancada,
            setAvancada,
            veiculos,
            totalResultados,
            loadingContext,
            tipos,
            marcas,
            modelos,
            versoes,
            cores,
            combustiveis,
            cidades,
            opcionais,
            categorias,
            estadosUso,
            dadosBusca,
            mudarDadosBusca,
            clearDados,
            handleBuscar,
            pageTitle,
            setPageTitle,
            pagina,
            setPagina,
            totalPaginas,
            setTotalPaginas,
            loadingBusca
        }}>
            { children }
        </AuthContext.Provider>
    );
};
export default AuthProvider;