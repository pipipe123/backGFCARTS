import Evento from "../models/evento.model.js";

export const EmparejarCompetidores = async (req, res) => {
    const { codigoTorneo } = req.params;
    try {
        const Torneo = await Evento.findOne({ codigo: codigoTorneo });
        let ngrafica = 1;

        // Crear una estructura inicial para modalidades
        const categoriasOrdenadas = [
            [ // formas
                [ // todas las cintas
                    [ // femenil
                        Torneo.formas.todasLasCintas.femenil.Infantil,
                        Torneo.formas.todasLasCintas.femenil.Juvenil,
                        Torneo.formas.todasLasCintas.femenil.Adultos
                    ],
                    [ // varonil
                        Torneo.formas.todasLasCintas.varonil.Infantil,
                        Torneo.formas.todasLasCintas.varonil.Juvenil,
                        Torneo.formas.todasLasCintas.varonil.Adultos
                    ]
                ],
                [ // cintas negras
                    [ // femenil
                        Torneo.formas.cintasNegras.femenil.Infantil,
                        Torneo.formas.cintasNegras.femenil.Juvenil,
                        Torneo.formas.cintasNegras.femenil.Adultos
                    ],
                    [ // varonil
                        Torneo.formas.cintasNegras.varonil.Infantil,
                        Torneo.formas.cintasNegras.varonil.Juvenil,
                        Torneo.formas.cintasNegras.varonil.Adultos
                    ]
                ]
            ],
            [ // combates
                [ // todas las cintas
                    [ // femenil
                        Torneo.combate.todasLasCintas.femenil.Infantil,
                        Torneo.combate.todasLasCintas.femenil.Juvenil,
                        Torneo.combate.todasLasCintas.femenil.Adultos
                    ],
                    [ // varonil
                        Torneo.combate.todasLasCintas.varonil.Infantil,
                        Torneo.combate.todasLasCintas.varonil.Juvenil,
                        Torneo.combate.todasLasCintas.varonil.Adultos
                    ]
                ],
                [ // cintas negras
                    [ // femenil
                        Torneo.combate.cintasNegras.femenil.Infantil,
                        Torneo.combate.cintasNegras.femenil.Juvenil,
                        Torneo.combate.cintasNegras.femenil.Adultos
                    ],
                    [ // varonil
                        Torneo.combate.cintasNegras.varonil.Infantil,
                        Torneo.combate.cintasNegras.varonil.Juvenil,
                        Torneo.combate.cintasNegras.varonil.Adultos
                    ]
                ]
            ]
        ];

        class Grafica {
            constructor(comp1, comp2, comp3, comp4, Ngrafica, tipo, categoria) {
                this.competidores = [comp1, comp2, comp3, comp4];
                this.Ngrafica = Ngrafica;
                this.tipo = tipo;
                this.categoria = categoria;
            }

            comparar() {
                for (let i = 0; i < this.competidores.length - 1; i++) {
                    let a = this.competidores[i];
                    let b = this.competidores[i + 1];
                    if (Math.abs(a.peso - b.peso) > 4) {
                        console.log(`Diferencia muy grande de peso entre competidor ${i + 1} (${a.peso}) y competidor ${i + 2} (${b.peso})`);
                    }
                }
            }
        }

        let vaciadorDearray = (fuente, final, tipo, categoria) => {
            for (let i = 0; i < fuente.length; i += 4) {
                const grafica = new Grafica(
                    fuente[i],
                    fuente[i + 1],
                    fuente[i + 2],
                    fuente[i + 3],
                    ngrafica,
                    tipo,
                    categoria
                );
                ngrafica += 1;
                final.push(grafica);
            }
            return final;
        };

        let verificarniveles = (arr, final2) => {
            arr.forEach((nivel1, n1) => {
                nivel1.forEach((nivel2, n2) => {
                    nivel2.forEach((nivel3, n3) => {
                        nivel3.forEach((nivel4, n4) => {
                            if (nivel4 && Array.isArray(nivel4)) {
                                // Determina el tipo y la categoría en función del nivel
                                let tipo = n1 === 0 ? 'formas' : 'combates';
                                let categoria = '';
                                
                                if (n2 === 0) categoria = 'todas las cintas';
                                else categoria = 'cintas negras';
                                
                                if (n3 === 0) categoria += ', femenil';
                                else categoria += ', varonil';
                                
                                if (n4 === 0) categoria += ', infantil';
                                else if (n4 === 1) categoria += ', juvenil';
                                else categoria += ', adultos';
                                
                                vaciadorDearray(nivel4, final2, tipo, categoria);
                            }
                        });
                    });
                });
            });
            return final2;
        };

        let graficados = [];
        verificarniveles(categoriasOrdenadas, graficados);
        Torneo.graficados = graficados;
        await Torneo.save();
        return res.status(200).send(graficados);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el emparejamiento');
    }
};
