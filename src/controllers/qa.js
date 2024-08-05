// import Competidor from "../models/competidor.model.js";
// import Evento from "../models/evento.model.js";

// // Define una clase para los competidores con los campos necesarios
// class CompetidorSimplificado {
//     constructor({ nombre, edad, cinta, peso, estatura, gimnasio, escuela, grado, imc }) {
//         this.nombre = nombre;
//         this.edad = edad;
//         this.cinta = cinta;
//         this.peso = peso;
//         this.estatura = estatura;
//         this.gimnasio = gimnasio;
//         this.escuela = escuela;
//         this.grado = grado;
//         this.imc = imc;
//     }
// }

// // Ordenar por grado, edad y IMC
// const ordenarPorCintaEdadImc = (arr) => {
//     return (arr || []).slice().sort((a, b) => {
//         if (a.grado !== b.grado) {
//             return b.grado - a.grado;
//         }
//         if (a.edad !== b.edad) {
//             return a.edad - b.edad;
//         }
//         return a.imc - b.imc;
//     });
// };

// // Ordenar cinturones negros por peso, y luego por edad
// const ordenarCinturonesNegros = (arr) => {
//     return (arr || []).slice().sort((a, b) => {
//         if (a.peso !== b.peso) {
//             return b.peso - a.peso;
//         }
//         return a.edad - b.edad;
//     });
// };

// // Ordenar todas las cintas considerando grado y diferencia de peso mayor a 4kg
// const ordenarTodasLasCintas = (arr) => {
//     return (arr || []).slice().sort((a, b) => {
//         if (a.grado !== b.grado) {
//             return a.grado - b.grado;
//         }
//         if (Math.abs(a.peso - b.peso) > 4) {
//             return b.peso - a.peso;
//         }
//         return b.peso - a.peso;
//     });
// };

// // Ordenar por edad
// const ordenarPorEdad = (arr) => {
//     return (arr || []).slice().sort((a, b) => a.edad - b.edad);
// };

// export const readCompetidoresPorTorneo = async (req, res) => {
//     const { codigoTorneo } = req.params;

//     try {
//         const competidores = await Competidor.find({ torneo: codigoTorneo });

//         // Verificar si hay competidores
//         if (competidores.length === 0) {
//             return res.status(404).send('No se encontraron competidores para este torneo');
//         }

//         // Crear estructuras iniciales para "Combate" y "Formas" como arreglos
//         const estructuraInicial = [
//             [ // formas
//                 [ // todas las cintas
//                     [ // femenil
//                         [], // infantil
//                         [], // juvenil
//                         []  // adultos
//                     ],
//                     [ // varonil
//                         [], // infantil
//                         [], // juvenil
//                         []  // adultos
//                     ]
//                 ],
//                 [ // cintas negras
//                     [ // femenil
//                         [], // infantil
//                         [], // juvenil
//                         []  // adultos
//                     ],
//                     [ // varonil
//                         [], // infantil
//                         [], // juvenil
//                         []  // adultos
//                     ]
//                 ]
//             ],
//             [ // combates
//                 [ // todas las cintas
//                     [ // femenil
//                         [], // infantil
//                         [], // juvenil
//                         []  // adultos
//                     ],
//                     [ // varonil
//                         [], // infantil
//                         [], // juvenil
//                         []  // adultos
//                     ]
//                 ],
//                 [ // cintas negras
//                     [ // femenil
//                         [], // infantil
//                         [], // juvenil
//                         []  // adultos
//                     ],
//                     [ // varonil
//                         [], // infantil
//                         [], // juvenil
//                         []  // adultos
//                     ]
//                 ]
//             ]
//         ];

//         // Añadir competidores a "Combate" y "Formas" según sexo y modalidad
//         competidores.forEach(c => {
//             const esCintaNegra = c.grado === "0";
//             const esFemenil = c.sexo === 'Femenil';
//             const modalidad = c.modalidad;

//             const categoria = c.categoria === 'Infantil' || c.categoria === 'Cadetes' ? 0 :
//                               c.categoria === 'Junior' ? 1 : 2; // Infantil: 0, Juvenil: 1, Adultos: 2
//             const sexo = esFemenil ? 0 : 1; // Femenil: 0, Varonil: 1
//             const tipo = esCintaNegra ? 1 : 0; // Cintas negras: 1, Todas las cintas: 0
//             const index = modalidad.includes('combate') ? 1 : 0; // Combate: 1, Formas: 0

//             const competidorData = {
//                 nombre: c.nombre,
//                 edad: new Date().getFullYear() - c.anioNacimiento,
//                 cinta: c.cinta,
//                 peso: c.peso,
//                 estatura: c.estatura,
//                 gimnasio: c.gimnasio,
//                 escuela: c.escuela,
//                 grado: c.grado,
//                 imc: c.peso / ((c.estatura / 100) ** 2)
//             };

//             const nuevoCompetidor = new CompetidorSimplificado(competidorData);

//             estructuraInicial[index][tipo][sexo][categoria].push(nuevoCompetidor);
//         });

//         // Ordenar los competidores en "Combate" y "Formas"
//         const ordenarEstructura = (estructura, ordenarFn) => {
//             // Verifica si la estructura tiene el formato esperado
//             console.log(estructura)
//             if (!Array.isArray(estructura) || estructura.length < 4) {
//                 throw new Error('La estructura de datos es inválida');
//             }

//             return [
//                 [ // formas
//                     [ // todas las cintas
//                         [ // femenil
//                             ordenarFn(estructura[0][0][0]),
//                             ordenarFn(estructura[0][0][1]),
//                             ordenarFn(estructura[0][0][2])
//                         ],
//                         [ // varonil
//                             ordenarFn(estructura[0][1][0]),
//                             ordenarFn(estructura[0][1][1]),
//                             ordenarFn(estructura[0][1][2])
//                         ]
//                     ],
//                     [ // cintas negras
//                         [ // femenil
//                             ordenarCinturonesNegros(estructura[1][0][0]),
//                             ordenarCinturonesNegros(estructura[1][0][1]),
//                             ordenarCinturonesNegros(estructura[1][0][2])
//                         ],
//                         [ // varonil
//                             ordenarCinturonesNegros(estructura[1][1][0]),
//                             ordenarCinturonesNegros(estructura[1][1][1]),
//                             ordenarCinturonesNegros(estructura[1][1][2])
//                         ]
//                     ]
//                 ],
//                 [ // combates
//                     [ // todas las cintas
//                         [ // femenil
//                             ordenarFn(estructura[2][0][0]),
//                             ordenarFn(estructura[2][0][1]),
//                             ordenarFn(estructura[2][0][2])
//                         ],
//                         [ // varonil
//                             ordenarFn(estructura[2][1][0]),
//                             ordenarFn(estructura[2][1][1]),
//                             ordenarFn(estructura[2][1][2])
//                         ]
//                     ],
//                     [ // cintas negras
//                         [ // femenil
//                             ordenarCinturonesNegros(estructura[3][0][0]),
//                             ordenarCinturonesNegros(estructura[3][0][1]),
//                             ordenarCinturonesNegros(estructura[3][0][2])
//                         ],
//                         [ // varonil
//                             ordenarCinturonesNegros(estructura[3][1][0]),
//                             ordenarCinturonesNegros(estructura[3][1][1]),
//                             ordenarCinturonesNegros(estructura[3][1][2])
//                         ]
//                     ]
//                 ]
//             ];
//         };

//         const resultado = ordenarEstructura(estructuraInicial, ordenarPorCintaEdadImc);

//         console.log(resultado);

//         // Actualizar el evento con el resultado
//         const evento = await Evento.findOneAndUpdate(
//             { codigo: codigoTorneo },
//             { combate: resultado[1], formas: resultado[0] },
//             { new: true, upsert: true }
//         );

//         res.json(evento);
//     } catch (error) {
//         console.error('Error al buscar competidores:', error);
//         res.status(500).send('Error al buscar competidores');
//     }
// };
const modalidades = [
    [//formas
        [ //todas las cintas
            [//femenil
                [
                    //infantil
                ],
                [
                    //juvenil
                ],
                [
                    //adultos
                ],
            ],
            [ //varonil
                [
                    //infantil
                ],
                [
                    //juvenil
                ],
                [
                    //adultos
                ],
            ],
        ],
        [//Cintas negras
            [//femenil
                [
                    //infantil
                ],
                [
                    //juvenil
                ],
                [
                    //adultos
                ],
            ],
            [ //varonil
                [
                    //infantil
                ],
                [
                    //juvenil
                ],
                [
                    //adultos
                ],
            ],
        ]
    ], 
    [
        [ //todas las cintas
            [//femenil
                [
                    //infantil
                ],
                [
                    //juvenil
                ],
                [
                    //adultos
                ],
            ],
            [ //varonil
                [
                    //infantil
                ],
                [
                    //juvenil
                ],
                [
                    //adultos
                ],
            ],
        ],
        [//Cintas negras
            [//femenil
                [
                    //infantil
                ],
                [
                    //juvenil
                ],
                [
                    //adultos
                ],
            ],
            [ //varonil
                [
                    //infantil
                ],
                [
                    //juvenil
                ],
                [
                    //adultos
                ],
            ],
        ]
    ] //Combates
]