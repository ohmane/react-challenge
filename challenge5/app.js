var API_KEY = 'f22249e04b84620016ea5a84aab3b752';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            saved: []
        };
    }

    componentDidMount() {
        var savedLocationsJSON = localStorage.getItem('savedLocations');
        var savedLocations= JSON.parse(savedLocationsJSON);


        if (savedLocations) {
            this.setState({
                saved: savedLocations
            });
        }
    }

    render() {
        return (
            <div>
                <h1>WeatherNow</h1>

                  <SavedLocations
                    saved={this.state.saved}
                    onClick={(name) => this.searchLocation(name)}
                />

                <form onSubmit={(e) => this.onSearch(e)}>
                    <input type="text" className="search-box" ref="query" placeholder="e.g. Seattle, 98020"/>
                    <button type="submit" className="search-button">Search</button>
                </form>
                
                {
                    this.state.name ? (
                        <Weather
                            id={this.state.id}
                            main={this.state.main}
                            name={this.state.name}
                            temp={this.state.main.temp}
                            temp_min={this.state.main.temp_min}
                            temp_max={this.state.main.temp_max}
                            humidity={this.state.main.humidity}                                        
                            onSave={(name) => this.saveName(name)} 
                        />
                    ) : null
                }
            </div>
        );
    }

    saveName(loc) {
        var saved = this.state.saved;

        // Check if location is already saved.
        // If so, do nothing, otherwise,
        // updated saved array.
        if (saved.indexOf(loc) < 0) {
        saved.push(name);

        this.setState({
            saved: saved
        });

        // Save to local storage
        var savedJson = JSON.stringify(saved);
        localStorage.setItem('savedLocations', savedJson);
        }
    }


    onSearch(e) {
        e.preventDefault();

        var queryValue = this.refs.query.value;
        
        this.searchName(queryValue);
    }

    searchName(search) {
        var url = "http://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid" + API_KEY;

        fetch(url)
        .then((response) => {
            return response.json();
        })

        .then((json) => {
            var id = json.id;
            var main = json.main;
            var humidity= json.main.humidity;
            var temp_max = json.main.temp_max;
            var temp_min = json.main.temp_min;
            var name = json.Name;
            var onSave= this.saveName(name);
            var temp = json.main.temp;
            console.log(json);
            this.setState({
                id: id,
                main: main,
                humidity: main.humidity,
                temp_max: main.temp_max,
                temp_min: main.temp_min,
                name: name,
                onSave: onSave,
                temp: temp
            });
        });
    }
}

var app = document.getElementById("app");

ReactDOM.render(<App />, app);
