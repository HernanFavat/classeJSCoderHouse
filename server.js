const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs/promises');

const app = express();
const port = 3000;

// Use CORS middleware
app.use(cors());

app.use(bodyParser.json());

app.post('/saveData', async (req, res) => {
    try {
        const { fileName, data } = req.body;
        console.log('Received Data:', data);

        // Asumimos que 'data' directory existe
        const filePath = `./data/${fileName}`;

        // Confirmar que si existe
        const fileExists = await fs.access(filePath)
            .then(() => true)
            .catch(() => false);

        if (fileExists) {
            // Lectura la data existente
            const existingContent = await fs.readFile(filePath, 'utf-8');
            const existingData = JSON.parse(existingContent);

            // Suma los datos existentes
            existingData.ingresosTotales += data.ingresosTotales || 0;
            existingData.gastosTotales += data.gastosTotales || 0;
            existingData.balanceFinal += data.balanceFinal || 0;

            await fs.writeFile(filePath, JSON.stringify(existingData));
        } else {
            // Si no existe crea un nuevo archivo con el nombre del archivo
            await fs.writeFile(filePath, JSON.stringify(data));
        }

        res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
