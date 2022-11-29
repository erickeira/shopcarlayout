import { useContext, useEffect, useState } from 'react'
import styles from './buscalateral.module.css'
import { apiUrl } from '../../utils'
import InputSelect from '../inputs/inputSelect';
import Link from 'next/link';
import { useRouter } from "next/router"
import { AuthContext } from '../../context';
import InputRangeSlider from '../inputs/inputRangeSlider';
import InputSelectMulti from '../inputs/inputSelectMulti';
import {MdAdd, MdRemove} from 'react-icons/md'

export default function BuscaLateral(props){
    const {
        avancada,
        setAvancada,
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
            <div className={styles.containerHeader}>
                <span>Busca</span>
                {
                    avancada ?
                    <MdRemove onClick={() => setAvancada(!avancada)} size={20} className={styles.addRemove}/>
                    :
                    <MdAdd onClick={() => setAvancada(!avancada)} size={20} className={styles.addRemove}/>
                }

            </div>
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
            {
                avancada ?
                <>
                    <InputRangeSlider
                        titulo={`Ano`}
                        min={``}
                        max={``}
                    />
                    <InputSelectMulti
                        titulo={'Cor'}
                        options={[`Branco`,`Patra`,`Vermelho`].map(cor => {return {value: cor, label: cor}}) }
                        callbackchange={(e) => mudarDadosBusca({marca : e.value})}
                        selecionado={dadosBusca.marca}
                    />
                    <InputRangeSlider
                        titulo={`Valor`}
                        min={``}
                        max={`10000000`}
                        tipo={`moeda`}
                    />
                    <InputRangeSlider
                        titulo={`Quilometragem (Km)`}
                        min={``}
                        max={``}
                    />
                </>
                : null
            }
           
            <BotaoBusca/>
        </div>
    )
}

