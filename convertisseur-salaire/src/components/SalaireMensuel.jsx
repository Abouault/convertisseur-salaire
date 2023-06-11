import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import './css/convertisseur.css'

const SalaireMensuel = () => {
    const [salaireBrut, setSalaireBrut] = useState('');
    const [salaireNet, setSalaireNet] = useState('');
    const [salaireHoraireNet, setSalaireHoraireNet] = useState('');
    const [estimationBasseBrut, setEstimationBasseBrut] = useState('');
    const [estimationHauteBrut, setEstimationHauteBrut] = useState('');
    const [estimationBasseNet, setEstimationBasseNet] = useState('');
    const [estimationHauteNet, setEstimationHauteNet] = useState('');

    const handleSalaireBrutChange = (event) => {
        const brutValue = event.target.value;
        const netValue = calculerSalaireNet(brutValue);
        setSalaireBrut(brutValue);
        setSalaireNet(netValue);
        setSalaireHoraireNet('');
        setEstimations(brutValue, netValue);
    };

    const handleSalaireNetChange = (event) => {
        const netValue = event.target.value;
        const brutValue = calculerSalaireBrut(netValue);
        setSalaireNet(netValue);
        setSalaireBrut(brutValue);
        setSalaireHoraireNet('');
        setEstimations(brutValue, netValue);
    };

    const setEstimations = (brut, net) => {
        const brutNumerique = parseFloat(brut.replace(/\s/g, ''));
        const netNumerique = parseFloat(net.replace(/\s/g, ''));

        if (!isNaN(brutNumerique) && !isNaN(netNumerique)) {
            const estimationBasseBrut = brutNumerique * 0.8;
            const estimationHauteBrut = brutNumerique * 1.2;
            const estimationBasseNet = netNumerique * 0.8;
            const estimationHauteNet = netNumerique * 1.2;

            setEstimationBasseBrut(formatNumber(estimationBasseBrut));
            setEstimationHauteBrut(formatNumber(estimationHauteBrut));
            setEstimationBasseNet(formatNumber(estimationBasseNet));
            setEstimationHauteNet(formatNumber(estimationHauteNet));
        } else {
            setEstimationBasseBrut('');
            setEstimationHauteBrut('');
            setEstimationBasseNet('');
            setEstimationHauteNet('');
        }
    };

    const calculerSalaireNet = (montantBrut) => {
        const montantBrutNumerique = parseFloat(montantBrut.replace(/\s/g, ''));

        if (isNaN(montantBrutNumerique)) {
            return '';
        }

        const tauxImpot = 0.2;
        const montantNet = montantBrutNumerique - montantBrutNumerique * tauxImpot;

        return formatNumber(montantNet);
    };

    const calculerSalaireBrut = (montantNet) => {
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
            <p style={{ marginBottom: '30px', fontSize: '18px' }}>
                <i>Les données de simulations se mettront directement à jour après la modification d'un champ</i>
            </p>
            <div className='container-convertisseur'>
                <div className='text-container'>
                    <div>
                        <h3>Salaire mensuel brut</h3>
                        <p>Hors primes, indemnités, frais de santé et prévoyance</p>
                    </div>
                    <div>
                        <h3>Salaire mensuel net</h3>
                        <p>Avant impôt</p>
                    </div>
                    <div>
                        <h3>Salaire mensuel net payé</h3>
                        <p>Après impôt</p>
                    </div>
                </div>
                <div className='champs-container'>
                    <div className='row-champs'>
                        <TextField id='outlined-basic' variant='outlined' value={estimationBasseBrut} />
                        <TextField id='outlined-basic' type='text' value={salaireBrut} onChange={handleSalaireBrutChange} />
                        <TextField id='outlined-basic' variant='outlined' value={estimationHauteBrut} />
                    </div>
                    <div className='row-champs'>
                        <TextField id='outlined-basic' variant='outlined' value={estimationBasseNet} />
                        <TextField id='outlined-basic' type='text' value={salaireNet} onChange={handleSalaireNetChange} />
                        <TextField id='outlined-basic' variant='outlined' value={estimationHauteNet} />
                    </div>
                    <div className='row-champs'>
                        <TextField id='outlined-basic' variant='outlined' />
                        <TextField id='outlined-basic' value={salaireHoraireNet}
                            onChange={(event) => setSalaireHoraireNet(event.target.value)} variant='outlined' />
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

export default SalaireMensuel;
