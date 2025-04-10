import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`

    :root {
        --brand-background: ${({ theme }) => theme.background};
        --primary: ${({ theme }) => theme.primary};
        --secondary: ${({ theme }) => theme.secondary};
        --text-primary: ${({ theme }) => theme.text_primary};
        --text-secondary: ${({ theme }) => theme.text_secondary};

        --gray: ${({ theme }) => theme.gray};
        --gray-light: ${({ theme }) => theme.gray_light};

        --text-white: ${({ theme }) => theme.text_white};
        --page-background: ${({ theme }) => theme.page_background};

        --white: ${({ theme }) => theme.text_white};

        --dark: rgba(0, 0, 0, .3);        
        --green: #49D294;
        --red: #E74C3C;

        --brand-background-dark: ${({ theme }) => theme.background};
        --brand-background-alternative: rgba(255, 255, 255, .05);
        --background: #F7F6F8;

        --boxText: ${({ theme }) => theme.gray};
        --gray-light-line: #E3E3E3;
        --yellow: #F6BC4D;
        
        /* 
        --gray-light-text: #A3A3A3;
        --gray-light-order: #B5B7BD;
        --cian-dark: rgba(0, 0, 0, .3);
        --gray: #142249;
        --gray-light-05: rgba(20, 34, 73, .05);
        --gray-background: #0E1833;
        --background: #F7F6F8;
        --gray-dark: #282A3A;
        --cian: #38D2D9;
        --white: #fff;
        --white-light: rgba(255, 255, 255, .3);
        --white-light-5: rgba(255, 255, 255, .05);
        --green: #49D294;
        --red: #E74C3C;
        --line: rgba(255, 255, 255, .1);
        --modalTitle: #777986;
        
        --confirmBackground: #EAEAEA;
        --borderInput: #3B4C7E;
        --lineBorder: #707070;
        --box: #F2F2F2;
        

        

        --green-lp: #76B350;

        --gray-1-lp: #8B8B8B;
        --gray-2-lp: #F6F6F6;
        --gray-3-lp: #E0E0E0; */

        --light: 'SoleilLt';
        --semiBold: 'SoleilSb';
        --bold: 'Soleil Bold';
        --regular: 'Soleil';

        --light: 300;
        --regular: 400;
        --bold: 700;
        --extraBold: 800;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    input {
        outline: none !important;
        border: transparent !important;
        background-color: transparent;
    }


    body {
        font-family: 'Soleil';
        min-height: 100vh;
        -webkit-font-smoothing: antialiased;
        /* background-color: var(--background); */
    }


    @layer utilities {
    /* Chrome, Safari and Opera */
    .no-scrollbar::-webkit-scrollbar {
        display: none;
    }

    .no-scrollbar {
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
    }

    #invoice-billet {
        .document {
            margin: auto auto;
            /* width: 216mm; */
            height: 108mm;
            background-color: #fff;
        }

        .headerBtn {
            margin: auto auto;
            width: 216mm;
            background-color: #fff;
            display: none;
        }

        table {
            width: 100%;
            position: relative;
            border-collapse: collapse;
        }

        table.desc {
            border-collapse: collapse;
            width: 216mm;
        }

        table.desc th {
            background: #d1d2d3;
        }

        table.desc th, td {
            text-align: left;
            padding: 2px;
        }

        table.desc tr:nth-child(even){background-color: #f2f2f2}

        .bankLogo {
            width: 28%;
        }

        .boletoNumber {
            width: 62%;
            font-weight: bold;
        }

        .center {
            text-align: center;
        }

        .right {
            text-align: right;
            right: 20px;
        }

        td {
            position: relative;
        }

        .title {
            position: relative;
            left: 0px;
            top: 0px;
            font-size: 12px;
            font-weight: bold;
        }

        .title_desc {
            font-size: 12px;
            display: block;
            margin-top: 3px;
        }

        .text {
            font-size: 12px;
        }

        p.content {
            padding: 0px;
            width: 100%;
            margin: 0px;
            font-size: 12px;
        }

        .sideBorders {
            border-left: 1px solid black;
            border-right: 1px solid black;
        }

        hr {
            size: 1;
            border: 1px dashed;
        }

        br {
            content: " ";
            display: block;
            margin: 12px 0;
            line-height: 12px;
        }

        .print {
            /* TODO(dbeam): reconcile this with overlay.css' .default-button. */
            background-color: rgb(77, 144, 254);
            background-image: linear-gradient(to bottom, rgb(77, 144, 254), rgb(71, 135, 237));
            border: 1px solid rgb(48, 121, 237);
            color: #fff;
            text-shadow: 0 1px rgba(0, 0, 0, 0.1);
        }

        .btnDefault {
            font-kerning: none;
            font-weight: bold;
        }

        .btnDefault:not(:focus):not(:disabled) {
            border-color: #808080;
        }

        button {
            border: 1px;
            padding: 5px;
            line-height: 20px;
        }


    }

    .no-tailwind {
            all: unset;
        }


        

        
}
`
