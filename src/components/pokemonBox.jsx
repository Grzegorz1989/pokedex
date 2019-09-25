import React from 'react';
import {Link} from 'react-router-dom';


class PokemonBox extends React.Component {
    state = {
        name: '',
        imageUrl: '',
        pokemonIndex: ''
    };

    componentDidMount() {
        const {name, url} = this.props;
        const pokemonIndex = url.split('/')[url.split('/').length - 2];

        const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;


        this.setState({name, imageUrl, pokemonIndex});
    }

    render() {
        return (
            <div className="col-md-3 col-sm-6 mb-5">
                <Link to={`pokemon/${this.state.pokemonIndex}`}>
                    <div className="pokemon-box">
                        <div className="pokemon-box-number">{this.state.pokemonIndex}</div>
                        <div className="pokemon-box-img">
                            <img src={this.state.imageUrl} alt={this.state.name}/>
                        </div>
                        <div className="pokemon-box-name">{this.state.name}</div>
                    </div>
                </Link>
            </div>
        );
    }
}

export default PokemonBox;
