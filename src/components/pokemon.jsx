import React from 'react';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';

const typeColors = {
    bug: 'B1C12E',
    dark: '4F3A2D',
    dragon: '755EDF',
    electric: 'FCBC17',
    fairy: 'F4B1F4',
    fighting: '823551D',
    fire: 'E73B0C',
    flying: 'A3B3F7',
    ghost: '6060B2',
    grass: '74C236',
    ground: 'D3B357',
    ice: 'A3E7FD',
    normal: 'C8C4BC',
    poison: '934594',
    psychic: 'ED4882',
    rock: 'B9A156',
    steel: 'B5B5C3',
    water: '3295F6'
};

class Pokemon extends React.Component {
    state = {
        name: '',
        imageUrl: '',
        pokemonIndex: '',
        types: [],
        stats: [],
    };

    async componentDidMount() {
        const {pokemonIndex} = this.props.match.params;

        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;

        const pokemonResponse = await Axios.get(pokemonUrl);

        const name = pokemonResponse.data.name;

        const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;

        const height =
            Math.round((pokemonResponse.data.height * 0.328084 + 0.00001) * 100) / 100;

        const weight =
            Math.round((pokemonResponse.data.weight * 0.220462 + 0.00001) * 100) / 100;

        const types = pokemonResponse.data.types.map(type => type.type.name);

        let {hp, attack, defense, speed, specialAttack, specialDefense} = '';

        pokemonResponse.data.stats.map(stat => {
            switch (stat.stat.name) {
                case 'hp':
                    hp = stat['base_stat'];
                    break;
                case 'attack':
                    attack = stat['base_stat'];
                    break;
                case 'defense':
                    defense = stat['base_stat'];
                    break;
                case 'speed':
                    speed = stat['base_stat'];
                    break;
                case 'special-attack':
                    specialAttack = stat['base_stat'];
                    break;
                case 'special-defense':
                    specialDefense = stat['base_stat'];
                    break;
                default:
                    break;
            }
        });

        this.setState({
            name,
            imageUrl,
            pokemonIndex,
            height,
            weight,
            types,
            stats: {
                hp,
                attack,
                defense,
                speed,
                specialAttack,
                specialDefense
            }
        });
    }

    render() {
        return (
            <div className="pokemon">
                <Grid container>
                    <Grid item xs={6}>
                        <div className="pokemon-details">
                            <div className="pokemon-details-name">{this.state.name}</div>
                            <div className="pokemon-details-img">
                                <img src={this.state.imageUrl} alt={this.state.name}/>
                            </div>
                            <div className="pokemon-details-height">Height: {this.state.height} feet</div>
                            <div className="pokemon-details-weight">Weight: {this.state.weight} lbs</div>

                            <div className="pokemon-details-types">
                                Types:
                                {this.state.types.map(type => (
                                <span
                                    key={type}
                                    className="pokemon-details-type"
                                    style={{
                                        backgroundColor: `#${typeColors[type]}`,
                                        color: '#F0F8FF',
                                        margin: '10px',
                                        paddingLeft: '20px',
                                        paddingRight: '20px'
                                    }}
                                >
                      {type
                          .toLowerCase()
                          .split(' ')
                          .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                          .join(' ')}
                    </span>
                            ))}
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="pokemon-details-stats">
                            <div className="pokemon-details-stats-speed">
                                <div className="pokemon-details-stats-speed-name">Speed</div>
                                <div className="pokemon-details-stats-speed-value" style={{ width: `${this.state.stats.speed}%`, background: '#EF6260' }}>{this.state.stats.speed}</div>
                            </div>
                            <div className="pokemon-details-stats-hp">
                                <div className="pokemon-details-stats-speed-name">Special defense</div>
                                <div className="pokemon-details-stats-speed-value" style={{ width: `${this.state.stats.specialDefense}%`, background: '#F5B759' }}>{this.state.stats.specialDefense}</div>
                            </div>
                            <div className="pokemon-details-stats-hp">
                                <div className="pokemon-details-stats-speed-name">Special attack</div>
                                <div className="pokemon-details-stats-speed-value" style={{ width: `${this.state.stats.specialAttack}%`, background: '#A3667C' }}>{this.state.stats.specialAttack}</div>
                            </div>
                            <div className="pokemon-details-stats-hp">
                                <div className="pokemon-details-stats-speed-name">Defense</div>
                                <div className="pokemon-details-stats-speed-value" style={{ width: `${this.state.stats.defense}%`, background: '#7BB8A9' }}>{this.state.stats.defense}</div>
                            </div>
                            <div className="pokemon-details-stats-hp">
                                <div className="pokemon-details-stats-speed-name">Attack</div>
                                <div className="pokemon-details-stats-speed-value" style={{ width: `${this.state.stats.attack}%`, background: '#2A7697' }}>{this.state.stats.attack}</div>
                            </div>
                            <div className="pokemon-details-stats-hp">
                                <div className="pokemon-details-stats-speed-name">HP:</div>
                                <div className="pokemon-details-stats-speed-value" style={{ width: `${this.state.stats.hp}%`, background: '#A572BB' }}>{this.state.stats.hp}</div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Pokemon;

