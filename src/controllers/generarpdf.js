import PDFDocument from 'pdfkit';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import Evento from '../models/evento.model.js';
import os from 'os';

// Obtén el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const generarPDF = async (req, res) => {
    const { codigoTorneo } = req.params;

    try {
        console.log('Buscando torneo con código:', codigoTorneo);
        const torneo = await Evento.findOne({ codigo: codigoTorneo });

        if (!torneo) {
            console.log('Torneo no encontrado');
            return res.status(404).send('Torneo no encontrado');
        }

        console.log('Torneo encontrado:', torneo);

        const doc = new PDFDocument({ size: 'A4', layout: 'landscape' }); // Orientación horizontal

        // Determina la ruta de la carpeta de descargas del usuario
        const userDownloadsPath = path.join(os.homedir(), 'Downloads');
        const filePath = path.join(userDownloadsPath, `${codigoTorneo}_registro.pdf`); // Ruta del archivo en la carpeta de descargas
        
        console.log('Ruta del archivo PDF:', filePath);

        // Asegúrate de que la carpeta de descargas existe (esto debería existir por defecto)
        if (!fs.existsSync(userDownloadsPath)) {
            console.log('Carpeta de descargas no encontrada. Creando carpeta...');
            fs.mkdirSync(userDownloadsPath, { recursive: true });
        }

        doc.pipe(fs.createWriteStream(filePath))
           .on('error', (err) => {
               console.error('Error al escribir el archivo PDF:', err);
               res.status(500).send('Error al escribir el archivo PDF');
           });

        const graficas = torneo.graficados;

        const drawCompetitor = (competidor, yStart, lineColor, xStart, lineLength, lineHeight) => {
            if (competidor) {
                doc.strokeColor(lineColor).lineWidth(1)
                    .moveTo(xStart, yStart)
                    .lineTo(xStart + lineLength, yStart)
                    .stroke();
                
                doc.fontSize(10).text(`Nombre: ${competidor.nombre || 'N/A'}`, xStart + 10, yStart - 15); // Ajustar el margen
                doc.text(`Peso: ${competidor.peso || 'N/A'}    Estatura: ${competidor.estatura || 'N/A'}    Cinta: ${competidor.cinta || 'N/A'}`, xStart + 10, yStart + lineHeight * 0.5 - 15); // Ajustar el margen
            }
        };

        graficas.forEach((grafica) => {
            doc.addPage({ size: 'A4', layout: 'landscape' });

            // Añadir título de la gráfica
            const pageWidth = doc.page.width;
            const title = `GRAFICA ${grafica.Ngrafica}   CATEGORIA ${grafica.categoria} (${grafica.tipo})`;
            doc.fontSize(16).text(title, { align: 'center' });
            doc.moveDown();

            // Definir márgenes y posiciones
            const margin = 50;
            const lineHeight = 30; // Aumentar el interlineado
            const xStart = margin;
            const columnWidth = 300;
            const lineLength = 200;
            const sectionSpacing = 80; // Espacio entre secciones

            // SEMIFINAL A
            doc.fontSize(14).text('SEMIFINAL A', xStart, 100);
            let yStart = 140;

            (grafica.competidores && Array.isArray(grafica.competidores) ? grafica.competidores.slice(0, 2) : []).forEach((competidor, index) => {
                const lineColor = index % 2 === 0 ? 'red' : 'blue';
                drawCompetitor(competidor, yStart, lineColor, xStart, lineLength, lineHeight);
                yStart += lineHeight * 2; // Ajustar el espacio después de cada competidor
            });

            // Añadir espacio entre semifinales
            yStart += sectionSpacing;

            // SEMIFINAL B
            doc.fontSize(14).text('SEMIFINAL B', xStart, yStart);
            yStart += lineHeight;

            (grafica.competidores && Array.isArray(grafica.competidores) ? grafica.competidores.slice(2, 4) : []).forEach((competidor, index) => {
                const lineColor = index % 2 === 0 ? 'red' : 'blue';
                drawCompetitor(competidor, yStart, lineColor, xStart, lineLength, lineHeight);
                yStart += lineHeight * 2; // Ajustar el espacio después de cada competidor
            });

            // Añadir espacio antes de los finalistas
            yStart += sectionSpacing;

            // Espacio para FINALISTA A y FINALISTA B
            const finalistsYStart = 140;
            const finalistsXStart = pageWidth - margin - columnWidth; // Ajustar a la derecha
            
            // FINALISTA A
            doc.fontSize(12).text('FINALISTA A', finalistsXStart, finalistsYStart);
            doc.strokeColor('red').lineWidth(1)
                .moveTo(finalistsXStart, finalistsYStart + lineHeight)
                .lineTo(finalistsXStart + lineLength, finalistsYStart + lineHeight)
                .stroke();
            
            // FINALISTA B
            doc.fontSize(12).text('FINALISTA B', finalistsXStart, finalistsYStart + lineHeight * 1.5);
            doc.strokeColor('blue').lineWidth(1)
                .moveTo(finalistsXStart, finalistsYStart + lineHeight * 2)
                .lineTo(finalistsXStart + lineLength, finalistsYStart + lineHeight * 2)
                .stroke();

            // Añadir espacio antes de los resultados finales
            let resultsYStart = finalistsYStart + lineHeight * 2 + sectionSpacing;

            // Resultados finales
            doc.fontSize(12).text('RESULTADOS FINALES', finalistsXStart, resultsYStart);
            resultsYStart += lineHeight;

            doc.fontSize(10).text('PRIMER LUGAR', finalistsXStart, resultsYStart);
            resultsYStart += lineHeight;
            doc.fontSize(10).text('SEGUNDO LUGAR', finalistsXStart, resultsYStart);
            resultsYStart += lineHeight;
            doc.fontSize(10).text('TERCER LUGAR A', finalistsXStart, resultsYStart); // Añadir los dos terceros lugares
            resultsYStart += lineHeight;
            doc.fontSize(10).text('TERCER LUGAR B', finalistsXStart, resultsYStart);

            // Añadir espacio antes de la siguiente gráfica
            doc.moveDown(2);
        });

        // Esperar a que el documento PDF esté completamente escrito
        doc.end();
        doc.on('finish', () => {
            console.log('PDF generado correctamente:', filePath);
            res.download(filePath, (err) => {
                if (err) {
                    console.error('Error al enviar el PDF:', err);
                    res.status(500).send('Error al enviar el PDF');
                } else {
                    console.log('PDF enviado exitosamente');
                }
            });
        });
        res.status(200).send('PDF generado');

    } catch (error) {
        console.error('Error al generar el PDF:', error.message);
        console.error(error.stack);
        res.status(500).send('Error al generar el PDF');
    }
};
