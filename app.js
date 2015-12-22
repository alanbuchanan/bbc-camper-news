
var Header = React.createClass({
    render: function () {
        return (
            <div>
                <div className="white-header">
                    <h2>BBC</h2>
                </div>
                <div className="red-header">
                    <h1>NEWS</h1>
                </div>
            </div>
        );
    }
});


var MediumStory = React.createClass({
    render: function () {
        return (
            <div className="medium-story col-sm-4 col-xs-12">
                <img src="http://placehold.it/200x150" alt=""/>
                <h3>Million people do a bunch of stuff UK</h3>
                <p>few  ewejiio hhuhuihh uhn nu uini ny nyuyiuyiut it br5yvrytfytf bufi</p>
                <p>time | link</p>
            </div>
        );
    }
});

var SmallStory = React.createClass({
    render: function () {
        return (
            <div className="small-story">
                <h3>UK military deployed to Helamnd</h3>
                <p>time | link</p>
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

var BigStory = React.createClass({


    getHeadline: function () {
        if(this.props.newsItems){
            return this.props.newsItems.headline
        } else {
            return null
        }
    },

    render: function () {
        console.log('props:', this.props);
        console.log('newsItems:', this.props.newsItems);
        return (
            <div className="big-story col-xs-12">
                <div className="col-sm-5">
                    <h1>{this.getHeadline()}</h1>
                    <p>In Iraq, a bunch of stuff happens. Or so the media lead us to believe.</p>
                    <p>time | link</p>
                </div>
                <div className="col-sm-7">
                    <img src="http://placehold.it/320x220" alt=""/>
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
        return (
            <div className="container">
                <Header />
                <div className="main-content col-sm-12">
                    <div className="left-sided-lg-top-otherwise col-lg-8 col-md-12 col-sm-12 col-xs-12">
                        <BigStory newsItems={this.state.newsItems[0]}/>
                        <MediumStory/>
                        <MediumStory/>
                        <div className="col-sm-4 col-xs-12">
                            <SmallStory/>
                            <SmallStory/>
                            <SmallStory/>
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