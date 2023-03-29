const products = [
    {
        id: '1',
        name: 'Lubricador Camozzi',
        category: 'tratamiento',
        imageSrc: 'https://d2r9epyceweg5n.cloudfront.net/stores/668/722/products/nl-11-05bd8271bbf268742716708635890088-640-0.png',
        imageAlt: "",
        price: 1400,
        stock: 25,
        description: "El lubricador de la Serie N se suministra con conexiones de G1/8 y G1/4. Su peculiar tipo de construcción permite una vasta gama de utilizaciones en relación al número de gotas de aceite nebulizado y del aire utilizado. El cuerpo del lubricador es de latón mientras que el vaso es en tecnopolímero transparente.",
        color: 'Serie N',
    },
    {
        id: '2',
        name: 'Cilindros Rotativos de Cremallera y Piñon Camozzi',
        category: 'cilindros',
        imageSrc: 'https://d2r9epyceweg5n.cloudfront.net/stores/668/722/products/qrc1-fefd36fd8f10bce64916675051728003-640-0.png',
        imageAlt: "",
        price: 2500,
        stock: 12,
        description: "Los actuadores rotativos de la Serie QR son cilindros con un pistón doble, capaces de proporcionar altos pares mientras aseguran una alta estabilidad y un movimiento rotativo preciso. El ángulo de rotación se puede ajustar fácilmente, según se desee, entre 0 ° y 190 ° mediante pernos de ajuste o amortiguadores hidráulicos colocados en un lado de la mesa giratoria. El uso de amortiguadores permite la amortiguación de dos a cinco veces más energía cinética que con los pernos de regulación. La mesa giratoria es compacta y permite el montaje directo de la carga. Su diseño compacto, ligereza y facilidad para combinar con EOAT hacen que estos actuadores sean particularmente adecuados para su uso en los sectores de ensamblaje y embalaje y cualquier aplicación que requiera transferencia, inclinación o rotación de objetos.",
        color: 'Serie QR',
    },
    {
        id: '3',
        name: 'Válvula de Mando Eléctrico Directo Camozzi',
        category: 'válvulas',
        imageSrc: 'https://d2r9epyceweg5n.cloudfront.net/stores/668/722/products/serie-k-019d0e5a57855a755d15782410111597-640-0.png',
        imageAlt: "",
        price: 2500,
        stock: 300,
        description: "Gracias a su diseño particular estas válvulas pueden ser usadas tanto en aplicaciones donde son requeridas soluciones muy compactas como de alto rendimiento. La serie K8 es usada para controlar actuadores o dispositivos muy pequeños y es apropiada para equipos portables gracias a su bajo poder de consumo, peso reducido y dimensiones. La versión universal permite mezclar dos fluidos gaseosos diferentes a seleccionar la ruta d fluido gaseoso dentro del circuito neumático.",
        color: 'Serie K8',
    },
    {
        id: '4',
        name: 'Cilindro Rotativo Camozzi',
        category: 'cilindros',
        imageSrc: 'https://d2r9epyceweg5n.cloudfront.net/stores/668/722/products/serie-69-11-041de730618d1916d516395100820399-640-0.png',
        imageAlt: "",
        price: 2500,
        stock: 7,
        description: "Es posible reducir, mediante un tornillo de ajuste, parte del eventual juego que se puede producir entre el piñón y cremallera. En los cabezales viene montado un tornillo que permite ajustar la rotación y limitando la misma en ±5°. Los cilindros rotativos de la Serie 69 se han realizado en 7 diámetros diferentes a fin de cubrir una amplia gama de trabajo.",
        color: 'Serie 69',
    },
]

export const getProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products)
        }, 1000)
    })
}

export const getProductsByCategory = (categoryId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products.filter(prod => prod.category === categoryId))
        }, 1000)
    })
}

export const getProductById = (productId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products.find(prod => prod.id === productId))
        }, 1000)
    })
}