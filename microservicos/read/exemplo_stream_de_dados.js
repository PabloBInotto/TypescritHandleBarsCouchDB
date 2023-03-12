function gerarElementos(array) {
    return {
        iniciar(fn) {
            let indice = 0;
            const i = setInterval(() => {
                if (indice >= array.length) {
                    clearInterval(i)
                } else {
                    fn(array[indice])
                    indice += 1;
                }
            }, 1000);

            return {
                parar() {
                    clearInterval(i)
                }
            }
        }
    }
}

const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const temp1 = gerarElementos(numeros)

const teporiador1 = temp1.iniciar((nun) => (console.log(Math.pow(2, nun))));

(setTimeout(()=> {
    teporiador1.parar();
}, 9000))