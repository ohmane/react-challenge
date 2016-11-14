class Weather extends React.Component {
    render() {
        if(!this.props.name) {
            return null;
        }
        
        return (
            <div>
                <h2>{this.props.location}</h2>

                <div>
                    <img src={this.props.weather.icon} />
                </div>

                <button onClick={(e) => this.save(e)}>Save</button>
            </div>
        );
    }

    save(e) {
        this.props.onSave(this.props.name);
    }
}