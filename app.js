const Header = (props) => {
    return (
        <div className="white-header">
            {/* Bootstrap nav */}
            <nav className="navbar">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <i className="fa fa-bars icon-bar"></i>
                        </button>
                        <div className="navbar-brand" href="#">
                            <span className="fccLogo">F</span>
                            <span className="fccLogo">C</span>
                            <span className="fccLogo">C</span>
                        </div>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li><a href="http://www.freecodecamp.com/">freecodecamp</a></li>
                            <li><a href="http://www.bbc.co.uk/news">bbc news</a></li>
                            <li><a href="http://github.com/alanbuchanan">github</a></li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="red-header">
                <h1>NEWS</h1>
            </div>

            <div className="darkred-header">
                <h1></h1>
            </div>
        </div>
    );
};

const BigStory = (props) => {

    const {newsItems} = props;
    let {headline} = newsItems;

    if (headline.indexOf('—') !== -1) {
        headline = headline.split('—')[0]
    }

    return (
        <div className="big-story col-xs-12">
            <div className="col-sm-5">
                <h1><HeadlineLink headline={headline} link={newsItems.link}/></h1>

                <p>{newsItems.metaDescription}</p>
                <TimeAndLink time={newsItems.timePosted} author={newsItems.author.username}/>
            </div>
            <div className="col-sm-7">
                <img className="img-responsive" src={newsItems.image} alt=""/>
            </div>
        </div>
    );
};

const MediumStory = (props) => {

    const {newsItems} = props;

    return (
        <div className="medium-story col-sm-4 col-xs-6">
            <img className="img-responsive" src={props.newsItems.image} alt=""/>

            <h4><HeadlineLink headline={props.newsItems.headline} link={props.newsItems.link}/></h4>

            <p>{props.newsItems.metaDescription}</p>
            <TimeAndLink time={props.newsItems.timePosted} author={props.newsItems.author.username}/>
        </div>
    );
};

const SmallStory = (props) => {
    return (
        <div className="small-story">
            <h4><HeadlineLink headline={props.newsItems.headline} link={props.newsItems.link}/></h4>
            <TimeAndLink time={props.newsItems.timePosted} author={props.newsItems.author.username}/>
        </div>
    );
};

const DatedListNoPics = (props) => {

    const {items} = props;

    const list = items.map((e, i) => {
        return (
            <li className="col-sm-6" key={i}>
                <h5><HeadlineLink headline={e.headline} link={e.link}/></h5>
                <TimeAndLink time={e.timePosted} author={e.author.username}/>
            </li>
        )
    });

    return (
        <ul className="dated-list-no-pics">
            {list}
        </ul>
    );
};

const DatedListWithPics = (props) => {

    let {items} = props;

    items = filterForImages(items);

    const list = items.map((e, i) => {
        return (
            <div className="col-lg-12 col-md-6 col-sm-6" key={i}>
                <div className="col-md-6 col-sm-6 col-xs-6">
                    <img className="img-responsive" src={e.image} alt=""/>
                </div>
                <div className="col-md-6 col-sm-6 col-xs-6">
                    <h4><HeadlineLink headline={e.headline} link={e.link}/></h4>

                    <TimeAndLink time={e.timePosted} author={e.author.username}/>
                </div>
            </div>
        )
    });

    return (
        <div className="dated-list-with-pics">
            {list}
        </div>
    );
};

const TimeAndLink = (props) => {

    const link = `http://www.freecodecamp.com/${props.author}`;
    const timeago = $.timeago(props.time).replace(/(about)/gi, '');

    return (
        <p className="time-and-link">
            <span id="timeago"><i className="fa fa-clock-o"></i> {timeago}</span> | <a href={link}>{props.author}</a>
        </p>
    )
};

const Loading = (props) => {
    return (
        <div></div>
    )
};

const filterForImages = function (arr) {

    return arr.filter(e => {
        return e.image !== "";
    });
};

const HeadlineLink = (props) => {
    return (
        <div className="headline-link">
            <a href={props.link}>{props.headline}</a>
        </div>
    )
};

const Main = React.createClass({

    getInitialState () {
        return {
            newsItems: []
        }
    },

    componentDidMount () {
        this.getNewsItems();
    },

    getNewsItems () {
        $.getJSON('http://www.freecodecamp.com/news/hot', (data) => {
            this.setState({newsItems: data})
        })
    },


    render () {
        const loading = this.state.newsItems.length === 0;
        let listNoPics = [];
        let listWithPics = [];

        // This is done in the render to avoid further ternary operators due to loading, as below
        for (let i = 6; i <= 11; i++) {
            listNoPics.push(this.state.newsItems[i]);
        }

        for (let i = 12; i <= 25; i++) {
            listWithPics.push(this.state.newsItems[i]);
        }

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
                        {loading
                            ? <Loading />
                            : <DatedListNoPics items={listNoPics}/>
                        }
                    </div>
                    <div className="right-sided-lg-bottom-otherwise col-lg-4 col-md-12 col-sm-12 col-xs-12">
                        {loading
                            ? <Loading />
                            : <DatedListWithPics items={listWithPics}/>
                        }
                    </div>
                </div>
            </div>
        );
    }
});

ReactDOM.render(<Main />, document.getElementById('root'));