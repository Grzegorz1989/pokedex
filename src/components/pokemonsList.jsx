import React from 'react';
import PokemonBox from '../components/pokemonBox';
import Grid from '@material-ui/core/Grid';

class PokemonsList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            species : [],
            fetched : false,
            loading : false,
        };
    }
    componentDidMount(){
        this.setState({
            loading : true
        });
        fetch('http://pokeapi.co/api/v2/pokemon?limit=10').then(res=>res.json())
            .then(response=>{
                this.setState({
                    species : response.results,
                    loading : true,
                    fetched : true
                });
            });
    }

    render(){
        const {fetched, loading, species} = this.state;
        let content ;
        if(fetched){
            content =
                <div className="pokemon-list">
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        {species.map((pokemon)=><PokemonBox
                            key={pokemon.name}
                            name={pokemon.name}
                            url={pokemon.url}
                        />)}
                    </Grid>
                </div>;
        }else if(loading && !fetched){
            content = <p> Loading ...</p>;
        }
        else{
            content = <div/>;
        }
        return (
            <div>
                {content}
            </div>
        );
    }
}

export default PokemonsList;
