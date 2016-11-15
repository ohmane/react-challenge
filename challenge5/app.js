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
                    onClick={(name) => this.searchName(name)}
                />

                <form onSubmit={(e) => this.onSearch(e)}>
                    <input type="text" className="search-box" ref="query" placeholder="e.g. Seattle, 98020"/>
                    <button type="submit" className="search-button">Search Location</button>
                </form>


                    <button type="submit" className="current-button">Current Location</button>
                {
                    
                    this.state.name ? (
                        <Weather
                            country={this.state.country}
                            description={this.state.description}
                            icon={this.state.icon}
                            id={this.state.id}
                            humidity={this.state.humidity}  
                            main={this.state.main}
                            name={this.state.name}
                            onSave={(name) => this.saveName(name)}
                            temp={this.state.temp}
                            temp_min={this.state.temp_min}
                            temp_max={this.state.temp_max}        
                            speed={this.state.speed}   
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
        saved.push(loc);

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
        var url = "https://www.bell-towne.com/api/weather/?q=" + search + "&appid=" + API_KEY;

        fetch(url)
        .then((response) => {
            return response.json();
        
        })

        

        .then((json) => {
            var country = json.sys.country;
            var description = json.weather[0].description;
            var icon = "https://openweathermap.org/img/w/" + json.weather[0].icon + ".png";
            var id = json.id;
            var humidity= json.main.humidity;
            var main = json.weather[0].main;
            var name = json.name;
            var temp = (json.main.temp * 9/5 - 459.67).toFixed(2);;
            var temp_max = (json.main.temp_max * 9/5 - 459.67).toFixed(2);
            var temp_min = (json.main.temp_min * 9/5 - 459.67).toFixed(2);
            var speed = json.wind.speed;
            console.log(json);
            this.setState({
                country: country,
                description: description,
                icon: icon,
                id: id,
                humidity: humidity,
                main: main,
                name: name,
                temp: temp,
                temp_max: temp_max,
                temp_min: temp_min,
                speed: speed
            });
        });
    }
}

var app = document.getElementById("app");

ReactDOM.render(<App />, app);
