import React from 'react';

class SearchBar extends React.Component{

   

    hardleFormSubmit = (event) => {
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.hardleFormSubmit}>
                <div className="form-row mb-5">
                    <div className="col-12">
                        <input 
                        
                        onChange={this.props.searchMovieProp}
                         
                        type="text" className="form-control" placeholder="Search a movie"
                       
                        />
                    </div>
                </div>
            </form>
        )
    }
}

export default SearchBar;