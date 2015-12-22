

var Main = React.createClass({
    render: function () {
        return (
            <div classNameName="container">
                <div className="white-header">
                    <h2>BBC</h2>
                </div>
                <div className="red-header">
                    <h1>NEWS</h1>
                </div>
                <div className="main-content col-sm-12">
                    <div className="left-sided-lg-top-otherwise col-lg-8 col-md-12 col-sm-12 col-xs-12">
                        <div className="big-story col-xs-12">
                            <div className="col-sm-5">
                                <h1>Iraqi forces kill people</h1>
                                <p>In Iraq, a bunch of stuff happens. Or so the media lead us to believe.</p>
                                <p>time | link</p>
                            </div>
                            <div className="col-sm-7">
                                <img src="http://placehold.it/320x220" alt=""/>
                            </div>
                        </div>
                        <div className="medium-story col-sm-4 col-xs-12">
                            <img src="http://placehold.it/200x150" alt=""/>
                            <h3>Million people do a bunch of stuff UK</h3>
                            <p>few  ewejiio hhuhuihh uhn nu uini ny nyuyiuyiut it br5yvrytfytf bufi</p>
                            <p>time | link</p>
                        </div>

                        <div className="medium-story col-sm-4 col-xs-12">
                            <img src="http://placehold.it/200x150" alt=""/>
                            <h3>Cumbria hiut but further floods </h3>
                            <p>wij ijwiojio j oijwioj io iomigew miowemi weiowejgio jioj iojio weoi</p>
                            <p>time | link</p>
                        </div>

                        <div className="col-sm-4 col-xs-12">
                            <div className="small-story">
                                <h3>UK military deployed to Helamnd</h3>
                                <p>time | link</p>
                            </div>
                            <div className="small-story">
                                <h3>UK military deployed to Helamnd</h3>
                                <p>time | link</p>
                            </div>
                            <div className="small-story">
                                <h3>UK military deployed to Helamnd</h3>
                                <p>time | link</p>
                            </div>
                        </div>

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
                    </div>
                    <div className="right-sided-lg-bottom-otherwise col-lg-4 col-md-12 col-sm-12 col-xs-12">
                        <div className="col-md-6 col-lg-12">
                            <div className="col-md-6">
                                <img src="http://placehold.it/100x55" alt=""/>
                            </div>
                            <div className="col-md-6">
                                <h3>Headline</h3>
                                <p>time | link</p>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-12">
                            <div className="col-md-6">
                                <img src="http://placehold.it/100x55" alt=""/>
                            </div>
                            <div className="col-md-6">
                                <h3>Headline</h3>
                                <p>time | link</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

ReactDOM.render(<Main />, document.getElementById('root'));