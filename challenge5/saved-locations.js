class SavedLocations extends React.Component {
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
                        <button className= "delete-button" onClick={(e) => this.remove(e)}>Delete</button>
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
