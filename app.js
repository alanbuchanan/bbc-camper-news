var Header = (props) => {
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
};

var Loading = (props) => {
    return (
        <div>
            <h1></h1>
        </div>
    )
};

var TimeAndLink = (props) => {

    const link = "http://www.freecodecamp.com/" + props.author;
    const timeago = $.timeago(props.time).replace(/(about)/gi, '');

    return (
        <p className="TimeAndLink">
            <span id="timeago">{timeago}</span> | <a href={link}>{props.author}</a>
        </p>
    )
};

var HeadlineLink = (props) => {
    return (
        <div className="HeadlineLink">
            <a href={props.link}>{props.headline}</a>
        </div>
    )
};

var SmallStory = (props) => {
    return (
        <div className="small-story">
            <h4>{props.newsItems.headline}</h4>
            <TimeAndLink time={props.newsItems.timePosted} author={props.newsItems.author.username}/>
        </div>
    );
};

var MediumStory = (props) => {
    return (
        <div className="medium-story col-sm-4 col-xs-12">
            <img src={props.newsItems.image} alt=""/>

            <h4>{props.newsItems.headline}</h4>

            <p>{props.newsItems.metaDescription}</p>
            <TimeAndLink time={props.newsItems.timePosted} author={props.newsItems.author.username}/>
        </div>
    );
};

var BigStory = (props) => {

        let {headline} = props.newsItems;
        let {newsItems} = props;

        if (headline.indexOf('—') !== -1) {
            headline = headline.split('—')[0]
        }

        console.log('newsItems:', newsItems);
        return (
            <div className="big-story col-xs-12">
                <div className="col-sm-5">
                    <h1><HeadlineLink headline={headline} link={newsItems.link} /></h1>
                    <p>{newsItems.metaDescription}</p>
                    <TimeAndLink time={newsItems.timePosted} author={newsItems.author.username}/>
                </div>
                <div className="col-sm-7">
                    <img src={newsItems.image} alt=""/>
                </div>
            </div>
        );
};

var DatedListWithPics = (props) => {

    let {items} = props;

    let list = items.map((e, i) => {
       return (
           <div>
               <div className="col-md-6" key={i}>
                   <img src={e.image} alt=""/>
               </div>
               <div className="col-md-6">
                    <h4>{e.headline}</h4>

                   <TimeAndLink time={e.timePosted} author={e.author.username}/>
               </div>
           </div>
       )
    });

    return (
        <div className="col-md-6 col-lg-12">
            {list}
        </div>
    );
};

var DatedListNoPics = (props) => {
    console.log('items from DatesListNoPics:', props.items);

    let {items} = props;

    let list = items.map((e, i) => {
        return (
            <li className="col-sm-6" key={i}>
                <h5>{e.headline}</h5>
                <TimeAndLink time={e.timePosted} author={e.author.username} />
            </li>
        )
    });

    return (
        <ul className="dated-list">
            {list}
        </ul>
    );
};

let Main = React.createClass({

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
            console.log('data sample:', data[0]);
            this.setState({newsItems: data})
        })
    },

    render () {
        const loading = this.state.newsItems.length === 0;
        let listNoPics = [];
        let listWithPics = [];

        for(let i = 6; i <= 11; i++) {
            listNoPics.push(this.state.newsItems[i]);
        }

        for(let i = 12; i <= 20; i++) {
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