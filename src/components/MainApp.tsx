import React from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import Navigation from './Navigation';
import Hero from './Hero';
import Services from './Services';
import Portfolio from './Portfolio';
import Contact from './Contact';
import Footer from './Footer';
import FloatingCTA from './FloatingCTA';

export default function MainApp() {
    return (
        <ThemeProvider switchable={true} defaultTheme="light">
            <Navigation />
            <main>
                <Hero />
                <Services />
                <Portfolio />
                <Contact />
            </main>
            <Footer />
            <FloatingCTA />
        </ThemeProvider>
    );
}