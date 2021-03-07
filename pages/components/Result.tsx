import styles from '../../styles/components/Result.module.css'

interface ResultProps {
    bairro: string,
    ddd: string,
    uf: string,
    logradouro: string,
    cep: string
}

export function Result({bairro, ddd, uf, logradouro, cep}: ResultProps) {

    console.log(bairro, 'BAIRRO SELECTED')

    return(
        <div className={styles.resultContainer}>
            <h1> {cep} </h1>
            <div className={styles.addressInfo}>
                <div className={styles.addressInfoPiece}>
                    <span> Bairro: </span>
                    <span> {bairro} </span>
                </div>
                <div className={styles.addressInfoPiece}>
                    <span> DDD: </span>
                    <span> {ddd} </span>
                </div>
                <div className={styles.addressInfoPiece}>
                    <span> UF: </span>
                    <span> {uf} </span>
                </div>
                <div className={styles.addressInfoPiece}>
                    <span> Logradouro: </span>
                    <span> {logradouro} </span>
                </div>
            </div>
        </div>
    )
}