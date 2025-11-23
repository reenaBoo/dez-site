'use client';

import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        scroll-behavior: smooth;
        overflow-x: hidden;
        max-width: 100vw;
    }

    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        background-color: ${({ theme }) => theme.colors.background};
        color: ${({ theme }) => theme.colors.text};
        line-height: 1.6;
        overflow-x: hidden;
        max-width: 100vw;
        position: relative;
    }

    h1, h2, h3, h4, h5, h6 {
        font-weight: 600;
        line-height: 1.2;
        color: ${({ theme }) => theme.colors.heading};
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    img {
        max-width: 100%;
        height: auto;
        display: block;
    }

    button {
        cursor: pointer;
        border: none;
        outline: none;
        font-family: inherit;
    }

    ul {
        list-style: none;
    }
`;
