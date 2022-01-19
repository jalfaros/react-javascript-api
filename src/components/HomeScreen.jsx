import React from 'react'
import NavBar from './NavBar'

import '../styles/home.css'
import NewFunctionScreen from './NewFunctionScreen'
import SearchFunctionScreen from './SearchFunctionScreen'





const HomeScreen = (  ) => {
    
    const { userName } = JSON.parse( localStorage.getItem( 'content' ))[0] || { }


    return (
        <>
            <NavBar username = { userName } />

            <div className="boxContainer">
                <NewFunctionScreen />
                <SearchFunctionScreen />
            </div>

        
            

        </>
    )
}

export default HomeScreen
