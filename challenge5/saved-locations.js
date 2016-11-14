class SavedLocations extends React.Component {
    render() {
        return (
            <ul>
                {
                    this.props.saved.map((name) => (
                        <li key={name}>
                            <a href="#" onClick={(e) => this.onSavedClick(e, name)}>
                                {name}
                            </a>
                        </li>
                    ))
                }
            </ul>
        )
    }

    onSavedClick(e, name) {
        e.preventDefault();

        this.props.onClick(name);
    }
}