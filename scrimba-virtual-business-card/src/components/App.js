import React from 'react';

import TopSection from './TopSection.js'
import BottomSection from './BottomSection.js'
import Footer from './Footer.js'

export default function App(){
    return(
        <div className="app">
            <TopSection />
            <BottomSection />
            <Footer />
        </div>
    )
}