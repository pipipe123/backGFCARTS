class Grafica {
    constructor(comp1,comp2,comp3,comp4,Ngrafica) {
  
        this.compArray = [this.comp1, this.comp2, this.comp3, this.comp4];
        this.Ngrafica= Ngrafica
    }
    comparar(){
        for (let i = 0; i < 3; i++) {
            let a = this.compArray[i]
            let b =this.compArray[i+1]
            if (Math.abs(a.peso - b.peso)>4 ){
                console.log(`Diferencia muy grande de peso entre comp${i + 1} (${a.peso}) y comp${i + 2} (${b.peso})`);
            }
            
        }
    }
}

const comp1 = { peso: 50 };
const comp2 = { peso: 55 };
const comp3 = { peso: 60 };
const comp4 = { peso: 70 };

const grafica = new Grafica(comp1, comp2, comp3, comp4);
console.log(grafica.comparar())

let sourceArray = [0, 1, 2, 3, 4, 5,6 ,7,8,9];
let destinationArray = [];

// Selecciona el índice del elemento que quieres mover
let indexToMove = 0; // El elemento en el índice 2 es el número 3
let j =4
let moves = j
// Usa splice para eliminar el elemento del arreglo original y guardarlo en una variable
let element = sourceArray.splice(indexToMove,moves);
console.log(...element)
// Agrega el elemento al nuevo arreglo
destinationArray.push(...element);

console.log(sourceArray);      // [0, 1, 2, 4, 5]
console.log(destinationArray); // [
let partirarray = (origen, destino) =>{
    let particion = origen.splice(0,4);
    destino.push(...particion)
    console.log(`origen: ${origen}, destino: ${destino }`)
    return origen, destino
}
let yagraficados=[]
let ngrafica=1

    let vaciadorDearray = (fuente,final) =>{
        for (let i = 0; i < fuente.length; i+=4) {
            const grafica= new Grafica(
                    fuente[i+1],
                    fuente[i+2],
                    fuente[i+3],
                    fuente[i+4],
                    ngrafica
                )       
                ngrafica+=1
                final.push(grafica)
            }
            return final
        }
    let primeraprueba = categoriasOrdenadas[0][0][0][0]
    let graficados = []
   vaciadorDearray(primeraprueba, graficados)
   let verificarniveles = (arr, final2) =>{
    let n1, n2, n3, n4 = 0
        arr.forEach(element => {
            //dos veces 0 y 1 forma combate
            arr[n1].forEach(element => {
                //dos veces por cada dos veces todas las cintas 0 y cintas negras 1
                arr[n1][n2].forEach(element => {
                    //femenil 0 varonil 1
                    arr[n1][n2][n3].forEach(element => {
                        //infantil 0 juvenil 1 adultos 3
                        let categoriaActual  = categoriasOrdenadas[n1][n2][n3][n4]
                        vaciadorDearray(categoriaActual, final2)
                        n4++
                    });
                });
                n2++
            });
            n1++
        });
    return final2
   }