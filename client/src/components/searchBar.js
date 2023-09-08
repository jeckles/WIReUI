import React, {Component} from 'react';

const sendQuery = async query => {
    console.log(`sending search query: ${query}`);
    const request = await fetch("/query", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: query
          })
    });
      
    const data = await request.json();
    return data;
};
    
class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '', searching: false, results: {}};
        this.handleChange = this.handleChange.bind(this);
        this.onEnterSearch = this.onEnterSearch.bind(this);
    }

    render() {
        return (
            <div>
                <input 
                    type="search"
                    className="block w-full px-4 py-2 text-blue-500 bg-white border rounded-full focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Search..."
                    onChange={this.handleChange}
                    onKeyDown={this.sendQuery}
                    />
            </div>
        );
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    async onEnterSearch(e) {
        if (e.key === "Enter") {
          if (e.target.value !== '') { 
            await sendQuery(e.target.value)
                  .then((res) => {
                    this.setState({ results: res })
                  });
            this.setState({ searching: true });
          } else {
            this.setState({ searching: false });
          }
        }
    }
}

export default SearchBar;