class Weather extends React.Component {
    render() {
        if(!this.props.name) {
            return null;
        }
        
        return (
            <div className="search_results">
                <h2>{this.props.name}, {this.props.country}</h2>

                <div className="weather">
                    <img src={this.props.icon} />
                    <p>Weather: {this.props.main} </p>
                    <p>Description: {this.props.description} </p>
                    <p>Temperature: {this.props.temp} &#8457;</p>
                    <p>Minimum Temperature: {this.props.temp_min} 	&#8457;</p>
                    <p>Maximum Temperature: {this.props.temp_max} 	&#8457;</p>
                    <p>Humidity: {this.props.humidity}% </p>
                    <p>Wind Speed: {this.props.speed} miles per second </p>
                </div>

                <button className= "save-button" onClick={(e) => this.save(e)}>Save</button>
            </div>
        );
    }

    save(e) {
        this.props.onSave(this.props.name);
    }
}
