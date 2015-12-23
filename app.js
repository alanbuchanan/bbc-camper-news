
var Header = React.createClass({
    render: function () {
        return (
            <div>
                <div className="white-header">
                    <span>F</span>
                    <span>C</span>
                    <span>C</span>
                </div>
                <div className="red-header">
                    <h1>NEWS</h1>
                </div>
            </div>
        );
    }
});




var DatedListNoPics = React.createClass({
    render: function () {
        return (
            <ul className="dated-list">
                <li className="col-sm-6">
                    <h3>Headline</h3>
                    <p>time | link</p>
                </li>
                <li className="col-sm-6">
                    <h3>Headline</h3>
                    <p>time | link</p>
                </li>
                <li className="col-sm-6">
                    <h3>Headline</h3>
                    <p>time | link</p>
                </li>
                <li className="col-sm-6">
                    <h3>Headline</h3>
                    <p>time | link</p>
                </li>
                <li className="col-sm-6">
                    <h3>Headline</h3>
                    <p>time | link</p>
                </li>
                <li className="col-sm-6">
                    <h3>Headline</h3>
                    <p>time | link</p>
                </li>
            </ul>
        );
    }
});

var DatedListWithPics = React.createClass({
    render: function () {
        return (
            <div className="col-md-6 col-lg-12">
                <div className="col-md-6">
                    <img src="http://placehold.it/100x55" alt=""/>
                </div>
                <div className="col-md-6">
                    <h3>Headline</h3>
                    <p>time | link</p>
                </div>

                <div className="col-md-6">
                    <img src="http://placehold.it/100x55" alt=""/>
                </div>
                <div className="col-md-6">
                    <h3>Headline</h3>
                    <p>time | link</p>
                </div>
            </div>
        );
    }
});

var Loading = React.createClass({
    render: function () {
        return (
            <div>
                <h1>LOADING</h1>
            </div>
        )
    }
});


var SmallStory = React.createClass({
    render: function () {
        return (
            <div className="small-story">
                <h3>{this.props.newsItems.headline}</h3>
                <TimeAndLink time={this.props.newsItems.timePosted} author={this.props.newsItems.author.username}/>
            </div>
        );
    }
});


var MediumStory = React.createClass({
    render: function () {
        return (
            <div className="medium-story col-sm-4 col-xs-12">
                <img src={this.props.newsItems.image} alt=""/>
                <h3>{this.props.newsItems.headline}</h3>
                <p>{this.props.newsItems.metaDescription}</p>
                <TimeAndLink time={this.props.newsItems.timePosted} author={this.props.newsItems.author.username}/>
            </div>
        );
    }
});

var TimeAndLink = React.createClass({
    render: function () {

        var link = "http://www.freecodecamp.com/" + this.props.author;
        var timeago = $.timeago(this.props.time).replace(/(about)/gi, '');

        return (
            <p>
                {timeago} | <a href={link}>{this.props.author}</a>
            </p>
        )
    }
})

var BigStory = React.createClass({

    render: function () {
        console.log('props:', this.props);
        console.log('newsItems:', this.props.newsItems);
        return (
            <div className="big-story col-xs-12">
                <div className="col-sm-5">
                    <h1>{this.props.newsItems.headline}</h1>
                    <p>{this.props.newsItems.metaDescription}</p>
                    <TimeAndLink time={this.props.newsItems.timePosted} author={this.props.newsItems.author.username}/>
                </div>
                <div className="col-sm-7">
                    <img src={this.props.newsItems.image} alt=""/>
                </div>
            </div>
        );
    }
});

var Main = React.createClass({

    getInitialState: function () {
        return {
            newsItems: []
        }
    },

    componentDidMount: function () {
        this.getNewsItems();
    },

    getNewsItems: function () {
        $.getJSON('http://www.freecodecamp.com/news/hot', (data) => {
            console.log('data sample:', data[0]);
            this.setState({newsItems: data})
        })
    },

    render: function () {
        var loading = this.state.newsItems.length === 0;
        return (
            <div className="container">
                <Header />
                <div className="main-content col-sm-12">
                    <div className="left-sided-lg-top-otherwise col-lg-8 col-md-12 col-sm-12 col-xs-12">
                        {loading
                            ? <Loading />
                            : <BigStory newsItems={this.state.newsItems[0]}/>
                        }
                        {loading
                            ? <Loading />
                            : <MediumStory newsItems={this.state.newsItems[1]}/>
                        }
                        {loading
                            ? <Loading />
                            : <MediumStory newsItems={this.state.newsItems[2]}/>
                        }
                        <div className="col-sm-4 col-xs-12">
                            {loading
                                ? <Loading />
                                : <SmallStory newsItems={this.state.newsItems[3]}/>
                            }
                            {loading
                                ? <Loading />
                                : <SmallStory newsItems={this.state.newsItems[4]}/>
                            }
                            {loading
                                ? <Loading />
                                : <SmallStory newsItems={this.state.newsItems[5]}/>
                            }
                        </div>
                        <DatedListNoPics/>
                    </div>
                    <div className="right-sided-lg-bottom-otherwise col-lg-4 col-md-12 col-sm-12 col-xs-12">
                        <DatedListWithPics/>
                    </div>
                </div>
            </div>
        );
    }
});

ReactDOM.render(<Main />, document.getElementById('root'));