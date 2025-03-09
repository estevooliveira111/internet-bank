const themas = {
    "doarPay": {
        titleFull: "doarPay",
        name: 'DoarPay',
        primary: "#076DF2",
        secondary: "#52525b",
        error: "#b91c1c",
        logo: "/logo.png",
        icon: "/logo.png",
        auth: {
            simpleType: true
        }
    },
    "cobranca": {
        titleFull: "cobranca",
        name: 'DoarPay Cobrança',
        primary: "#010812",
        secondary: "#52525b",
        error: "#b91c1c",
        logo: "#b91c1c",
        icon: false,
        auth: {
            simpleType: true
        }
    },
    "cobrancaAlebank": {
        titleFull: "cobrancaAlebank",
        name: 'Allebank Cobranças',
        primary: "#101d4d",
        secondary: "#52525b",
        error: "#b91c1c",
        logo: "/logo-alebank.svg",
        icon: false,
        auth: {
            simpleType: false,
            image: '/fundo-auth-alebank-image.jpg'
        }
    },
    "sandbox": {
        titleFull: "sandbox",
        name: 'FastgiveMoney',
        primary: "#9a3412",
        secondary: "#ea580c",
        error: "#b91c1c",
        logo: "/logo-alebank.svg",
        icon: false,
        auth: {
            simpleType: false,
            image: '/fundo-auth-alebank-image.jpg'
        }
    },
    "univolter": {
        titleFull: "univolter",
        name: 'Pay Univolter',
        primary: "#001235",
        secondary: "#ea580c",
        error: "#b91c1c",
        logo: "/logo.png",
        icon: false,
        auth: {
            simpleType: true
        }
    },
};

export function theme() {
    const themeName = import.meta.env.VITE_THEME;
    return themas[themeName] || themas["doarPay"];
}
