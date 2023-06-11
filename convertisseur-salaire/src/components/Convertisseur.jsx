import React from 'react';
import SalaireMensuel from './SalaireMensuel';
import SalaireAnnuel from './SalaireAnnuel';
import Simulateur from './Simulateur';

const Convertisseur = () => {
    return (
        <div>
            <SalaireMensuel />
            <SalaireAnnuel />
            <Simulateur />
        </div>
    );
};

export default Convertisseur;
