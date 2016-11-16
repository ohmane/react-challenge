class SavedLocations extends React.Component {
    
    // render the list of saved locations
    render() {
        return (
            <ul> 
                <h2>
                Saved Locations
                {
                    this.props.saved.map((name) => (
                        <li key={name}>
                            <a href="#" onClick={(e) => this.onSavedClick(e, name)}>
                                {name} 
                            </a>
                        <button className= "delete-button">Delete</button>
                        </li>
                    ))
                }
                </h2>
            </ul>
        )
    }

    onSavedClick(e, name) {
        e.preventDefault();

        this.props.onClick(name);
    }

}
