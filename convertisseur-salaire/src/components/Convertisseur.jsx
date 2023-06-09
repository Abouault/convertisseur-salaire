import React, { useState } from 'react'
import TextField from '@mui/material/TextField';

const Convertisseur = () => {
    const [salaireNet, setSalaireNet] = useState("");
    const [salaireBrut, setSalaireBrut] = useState("");

    return (
        <div>
            <label htmlFor="net">Salaire net:</label>
            <TextField value={salaireNet} onChange={(e) => setSalaireNet(e.target.value)} name='salaireNet' id="net" label="Outlined" variant="outlined" />
            <label htmlFor="brut">Salaire brut</label>
            <TextField value={salaireBrut} onChange={(e) => setSalaireBrut(e.target.value)} name='salaireBrut' id="brut" label="Outlined" variant="outlined" />
        </div>
    )
}

export default Convertisseur
