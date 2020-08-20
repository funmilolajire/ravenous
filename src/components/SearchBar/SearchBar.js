import React from 'react';
import './SearchBar.css';

export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            location: '',
            sortBy: 'best_match'
        };
        this.sortByOptions = {
            "Best Match": "best_match",
            "Highest Rated": "rating",
            "Most Reviewed": "review_count"
        };
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    getSortByClass(sortByOption) {
        if (this.state.sortBy === sortByOption) {
            return 'active';
        } return '';
    }

    handleSortByChange(sortByOption) {
        this.setState({ sortBy: sortByOption });
        [...document.getElementsByTagName('li')].map(item => item.addEventListener('click', this.handleSearch.bind(this, item)))
    }

    handleTermChange(e) {
        this.setState({ term: e.target.value })
    }

    handleLocationChange(e) {
        this.setState({ location: e.target.value })
    }

    handleSearch() {
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
    }

    renderSortByOptions() {
        return Object.keys(this.sortByOptions)
            .map(sortByOption => {
                return (
                    <li onClick={this.handleSortByChange.bind(this, this.sortByOptions[sortByOption])} className={this.getSortByClass(this.sortByOptions[sortByOption])} key={this.sortByOptions[sortByOption]}>
                        {sortByOption}
                    </li>)
            }
            )
    }

    render() {
        return (
            <div className="SearchBar" onKeyPress={(e) => { if (e.key === 'Enter') { this.handleSearch() } }}>
                <div className="SearchBar-sort-options">
                    <ul>
                        {this.renderSortByOptions()}
                    </ul>
                </div>
                <div className="SearchBar-fields">
                    <input onChange={this.handleTermChange} placeholder="Search Businesses" />
                    <input onChange={this.handleLocationChange} placeholder="Where?" />
                </div>
                <div className="SearchBar-submit">
                    <button onClick={this.handleSearch}>Let's Go</button>
                </div>
            </div>
        )
    }
}
