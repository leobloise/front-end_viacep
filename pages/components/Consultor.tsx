import { useState } from 'react'
import styles from '../../styles/components/Consultor.module.css'
import { Result } from './Result';

function verifyIfValidCep(cepInput) {
        
    let cep = cepInput.value

    let validCepFormat = new RegExp(/^[0-9]{5}-[\d]{3}$/)

    let isCepValid = validCepFormat.test(cep);

    return isCepValid;

}

function displayError(input) {

    let value = input.value

    input.classList.remove(styles.normalCep)
    input.classList.add(styles.error)
    input.focus();

    alert(`Esse cep: "${value}" é inválido`)
        
    return;

}

function prepareAndGetInfo(prepareFunc, url, setState) {

    prepareFunc()

    fetch(url)
    .then(res => {
        res.json()
        .then(res => {
            if(res.error) {
                setState(null)
                alert(res.error)
                return;
            }

            setState(res.Cep)
        })
    })
    .catch(err => {
        alert('Caso não tenha ativado, ative o servidor na porta 3000!')
        console.error(err.message)
    })

}

export function Consultor(props) {

    const [address, setAddress] = useState(null);

    

    function getCep(event) {
        
        let cepInput = document.querySelector('[data-form-cep]')
        
        event.preventDefault()
        
        let isValidCep = verifyIfValidCep(cepInput)

        if(!isValidCep) {
            return displayError(cepInput)
        }

        return prepareAndGetInfo(() => {
            cepInput.classList.remove(styles.error)

            cepInput.classList.add(styles.normalCep)
        }, `http://localhost:3000/cep?cep=${cepInput.value}`, setAddress)
    
    }

    return (
        <div>
            <section className={styles.consultorContainer}>
                <form action="" method="get">
                    <div className={styles.inputBlock}>
                        <label htmlFor="cep"> CEP: </label>
                        <input type="text" className={styles.normalCep} name="cep" id="cep" data-form-cep placeholder="21221-300"/>
                    </div>
                    <div className={styles.inputBlock}>
                        <input type="submit" value="Consultar" onClick={getCep}/>
                    </div>
                </form>
                {address === null ? null: <Result cep={address.cep} bairro={address.bairro} uf={address.uf} logradouro={address.logradouro} ddd={address.ddd}></Result>}
            </section>
            
        </div>
    );
}
