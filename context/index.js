import { useState, createContext, useEffect } from "react";
import { useRouter } from "next/router";
import { apiUrl } from "../utils";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [avancada, setAvancada ] = useState(true);
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

    function handleBuscar(){
        if(router.pathname == "/") return router.push("/busca")
        getDados()
    }
    console.log(dadosBusca)
    return (
        <AuthContext.Provider value={{
            avancada,
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
            handleBuscar
        }}>
            { children }
        </AuthContext.Provider>
    );
};
export default AuthProvider;