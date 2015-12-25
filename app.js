const Header = () => {
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

    const {items} = props;

    const list = items.map((e, i) => {
        return (
            <div className="big-story col-xs-12" key={i}>
                <div className="col-sm-5">
                    <h1><HeadlineLink headline={splitHeadlineAtUnwantedChar(e.headline)} link={e.link}/></h1>

                    <p>{e.metaDescription}</p>
                    <TimeAndLink time={e.timePosted} author={e.author.username}/>
                </div>
                <div className="col-sm-7">
                    <img className="img-responsive" src={e.image} alt=""/>
                </div>
            </div>
        );
    });

    return (
        <div>
            {list}
        </div>
    );

};

const MediumStory = (props) => {

    const {items} = props;

    const list = items.map((e, i) => {
        return (
            <div className="medium-story col-sm-4 col-xs-6" key={i}>
                <img className="img-responsive" src={e.image} alt=""/>

                <h4><HeadlineLink headline={splitHeadlineAtUnwantedChar(e.headline)} link={e.link}/></h4>

                <p>{e.metaDescription}</p>
                <TimeAndLink time={e.timePosted} author={e.author.username}/>
            </div>
        );
    });

    return (
        <div>
            {list}
        </div>
    );
};

const SmallStory = (props) => {

    const {items} = props;

    const list = items.map((e, i) => {
        return (
            <div className="small-story" key={i}>
                <CombinedHeadlineTimeLink headline={e.headline} link={e.link} time={e.timePosted} author={e.author.username}/>
            </div>
        );
    });

    return (
        <div>
            {list}
        </div>
    );

};

const DatedListNoPics = (props) => {

    const {items} = props;

    const list = items.map((e, i) => {
        return (
            <li className="col-sm-6" key={i}>
                <CombinedHeadlineTimeLink headline={e.headline} link={e.link} time={e.timePosted} author={e.author.username}/>
            </li>
        );
    });

    return (
        <ul className="dated-list-no-pics col-lg-12 col-md-12 col-sm-12 col-xs-12">
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
                    <h4><HeadlineLink headline={splitHeadlineAtUnwantedChar(e.headline)} link={e.link}/></h4>

                    <TimeAndLink time={e.timePosted} author={e.author.username}/>
                </div>
            </div>
        );
    });

    return (
        <div className="dated-list-with-pics">
            {list}
        </div>
    );
};

// Helpers and mini components

const splitHeadlineAtUnwantedChar = (str) => str.indexOf("—") !== -1 ? str.split("—")[0] : str;
const filterForImages = (arr) => arr.filter(e => e.image !== "");
const Loading = () => <div></div>;

const TimeAndLink = (props) => {
    return (
        <p className="time-and-link">
            <span id="timeago"><i className="fa fa-clock-o"></i> {$.timeago(props.time).replace(/(about)/gi, "")}</span> | <a href={`http://www.freecodecamp.com/${props.author}`}>{props.author}</a>
        </p>
    );
};

const HeadlineLink = (props) => {
    return (
        <div className="headline-link">
            <a href={props.link}>{props.headline}</a>
        </div>
    );
};

const CombinedHeadlineTimeLink = (props) => {
    return (
        <div>
            <h4><HeadlineLink headline={splitHeadlineAtUnwantedChar(props.headline)} link={props.link}/></h4>
            <TimeAndLink time={props.time} author={props.author}/>
        </div>
    );
};

const Main = React.createClass({

    getInitialState () {
        return {
            newsItems: []
        };
    },

    componentDidMount () {
        this.getNewsItems();
    },

    getNewsItems () {
        $.getJSON("http://www.freecodecamp.com/news/hot", (data) => {
            this.setState({newsItems: data});
        });
    },

    render () {
        const {newsItems} = this.state;
        const loading = newsItems.length === 0;
        const storiesToShow = 25;
        const storyMapper   = (i) => newsItems[i];
        const bigStories    = _.range(0, 1).map(storyMapper);
        const mediumStories = _.range(1, 3).map(storyMapper);
        const smallStories  = _.range(3, 6).map(storyMapper);
        const listNoPics    = _.range(6, 11).map(storyMapper);
        const listWithPics  = _.range(12, storiesToShow).map(storyMapper);

        return (
            <div className="container">
                <Header />

                <div className="main-content col-sm-12">
                    <div className="left-sided-lg-top-otherwise col-lg-8 col-md-12 col-sm-12 col-xs-12">
                        {loading
                            ? <Loading />
                            : <BigStory items={bigStories}/>
                        }
                        {loading
                            ? <Loading />
                            : <MediumStory items={mediumStories}/>
                        }
                        <div className="col-sm-4 col-xs-12">
                            {loading
                                ? <Loading />
                                : <SmallStory items={smallStories}/>
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

ReactDOM.render(<Main />, document.getElementById("root"));