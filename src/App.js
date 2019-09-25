import React from 'react';
import logo from './logo.png'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PokemonsList from './components/pokemonsList';
import Pokemon from './components/pokemon'
import './App.css';

class App extends React.Component {

    render() {

        return(
            <Router>
                <div className="App">
                    <img src={logo} alt="Pokedex Logo" style={{ width: '10%', marginTop: '50px', marginBottom: '50px' }} />
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={PokemonsList} />
                            <Route path="/pokemon/:pokemonIndex" component={Pokemon} />
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}

export default App;




