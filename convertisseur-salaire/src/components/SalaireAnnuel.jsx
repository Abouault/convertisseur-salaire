import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import './css/convertisseur.css'

const SalaireAnnuel = () => {

    const [salaireBrutAnnuel, setsalaireBrutAnnuel] = useState('');
    const [salaireNetAnnuel, setsalaireNetAnnuel] = useState('');
    const [salaireHoraireNetAnnuel, setsalaireHoraireNetAnnuel] = useState('');
    const [estimationBasseBrutAnnuel, setestimationBasseBrutAnnuel] = useState('');
    const [estimationHauteBrutAnnuel, setestimationHauteBrutAnnuel] = useState('');
    const [estimationBasseNetAnnuel, setestimationBasseNetAnnuel] = useState('');
    const [estimationHauteNetAnnuel, setestimationHauteNetAnnuel] = useState('');

    const handlesalaireBrutAnnuelChange = (event) => {
        const brutValue = event.target.value;
        const netValue = calculersalaireNetAnnuel(brutValue);
        setsalaireBrutAnnuel(brutValue);
        setsalaireNetAnnuel(netValue);
        setsalaireHoraireNetAnnuel('');
        setEstimations(brutValue, netValue);
    };

    const handlesalaireNetAnnuelChange = (event) => {
        const netValue = event.target.value;
        const brutValue = calculersalaireBrutAnnuel(netValue);
        setsalaireNetAnnuel(netValue);
        setsalaireBrutAnnuel(brutValue);
        setsalaireHoraireNetAnnuel('');
        setEstimations(brutValue, netValue);
    };

    const setEstimations = (brut, net) => {
        const brutNumerique = parseFloat(brut.replace(/\s/g, ''));
        const netNumerique = parseFloat(net.replace(/\s/g, ''));

        if (!isNaN(brutNumerique) && !isNaN(netNumerique)) {
            const estimationBasseBrutAnnuel = brutNumerique * 0.8;
            const estimationHauteBrutAnnuel = brutNumerique * 1.2;
            const estimationBasseNetAnnuel = netNumerique * 0.8;
            const estimationHauteNetAnnuel = netNumerique * 1.2;

            setestimationBasseBrutAnnuel(formatNumber(estimationBasseBrutAnnuel));
            setestimationHauteBrutAnnuel(formatNumber(estimationHauteBrutAnnuel));
            setestimationBasseNetAnnuel(formatNumber(estimationBasseNetAnnuel));
            setestimationHauteNetAnnuel(formatNumber(estimationHauteNetAnnuel));
        } else {
            setestimationBasseBrutAnnuel('');
            setestimationHauteBrutAnnuel('');
            setestimationBasseNetAnnuel('');
            setestimationHauteNetAnnuel('');
        }
    };

    const calculersalaireNetAnnuel = (montantBrut) => {
        const montantBrutNumerique = parseFloat(montantBrut.replace(/\s/g, ''));

        if (isNaN(montantBrutNumerique)) {
            return '';
        }

        const tauxImpot = 0.2;
        const montantNet = montantBrutNumerique - montantBrutNumerique * tauxImpot;

        return formatNumber(montantNet);
    };

    const calculersalaireBrutAnnuel = (montantNet) => {
        const montantNetNumerique = parseFloat(montantNet.replace(/\s/g, ''));

        if (isNaN(montantNetNumerique)) {
            return '';
        }

        const tauxImpot = 0.2;
        const montantBrut = montantNetNumerique / (1 - tauxImpot);

        return formatNumber(montantBrut);
    };

    const formatNumber = (value) => {
        if (isNaN(value)) {
            return '';
        }

        return new Intl.NumberFormat('fr-FR').format(value);
    };

    return (
        <div className='container'>
            <div className='container-convertisseur'>
                <div className='text-container'>
                    <div>
                        <h3>Salaire annuel brut</h3>
                        <p>Hors primes, indemnités, frais de santé et prévoyance</p>
                    </div>
                    <div>
                        <h3>Salaire annuel net</h3>
                        <p>Avant impôt</p>
                    </div>
                    <div>
                        <h3>Salaire annuel net payé</h3>
                        <p>Après impôt</p>
                    </div>
                </div>
                <div className='champs-container'>
                    <div className='row-champs'>
                        <TextField id='outlined-basic' variant='outlined' value={estimationBasseBrutAnnuel} />
                        <TextField id='outlined-basic' type='text' value={salaireBrutAnnuel} onChange={handlesalaireBrutAnnuelChange} />
                        <TextField id='outlined-basic' variant='outlined' value={estimationHauteBrutAnnuel} />
                    </div>
                    <div className='row-champs'>
                        <TextField id='outlined-basic' variant='outlined' value={estimationBasseNetAnnuel} />
                        <TextField id='outlined-basic' type='text' value={salaireNetAnnuel} onChange={handlesalaireNetAnnuelChange} />
                        <TextField id='outlined-basic' variant='outlined' value={estimationHauteNetAnnuel} />
                    </div>
                    <div className='row-champs'>
                        <TextField id='outlined-basic' variant='outlined' />
                        <TextField id='outlined-basic' value={salaireHoraireNetAnnuel}
                            onChange={(event) => setsalaireHoraireNetAnnuel(event.target.value)} variant='outlined' />
                        <TextField
                            id='outlined-basic'
                            variant='outlined'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalaireAnnuel;
