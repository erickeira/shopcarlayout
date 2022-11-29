import { useContext, useEffect, useState } from 'react'
import styles from './buscalateral.module.css'
import { apiUrl } from '../../utils'
import InputSelect from '../inputSelect';
import Link from 'next/link';
import { useRouter } from "next/router"
import { AuthContext } from '../../context';

export default function BuscaLateral(props){
    const {
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
    } = useContext(AuthContext)

    const BotaoBusca = () => {
        if(!dadosBusca.tipo && !dadosBusca.marca){
            return(
                <div className={styles.containerBotaoBuscaDesativado}>
                    <span>Buscar</span>
                </div>
            )
        }
        return(
            // <Link href={`/busca`}>?
                <div onClick={() =>  handleBuscar()} className={styles.containerBotaoBusca}>
                    <span>Buscar</span>
                </div>
            // </Link>
        )

    }

    return(
        <div className={styles.container}> 
            <InputSelect
                titulo={'Tipo'}
                options={tipos.map(tipo => {return {value: tipo.nome, label: tipo.nome}}) }
                callbackchange={(e) => clearDados(e.value)}
                selecionado={dadosBusca.tipo}
            />
            <InputSelect
                titulo={'Marca'}
                options={marcas?.map(marca => {return {value: marca.nome, label: marca.nome}}) }
                callbackchange={(e) => mudarDadosBusca({marca : e.value})}
                selecionado={dadosBusca.marca}
            />
            <BotaoBusca/>
        </div>
    )
}

