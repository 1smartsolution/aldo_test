import React, {useState, useEffect} from 'react';
import moment from 'moment';
import { useTweets } from '../hooks/useTweets';
import AutoLinkText from 'react-autolink-text2';
import AppHeader from '@template/layouts/components/app-header';

const Tweets = () => {
    const [page, setPage] = useState('dtTweets');

    const {tweets} = useTweets({page});

    const parseTwitterDate = (tdate) => {
        var system_date = new Date(Date.parse(tdate));
        var user_date = new Date();
        if (K.ie) {
            system_date = Date.parse(tdate.replace(/( \+)/, ' UTC$1'))
        }
        var diff = Math.floor((user_date - system_date) / 1000);
        if (diff <= 1) {return "just now";}
        if (diff < 20) {return diff + " seconds ago";}
        if (diff < 40) {return "half a minute ago";}
        if (diff < 60) {return "less than a minute ago";}
        if (diff <= 90) {return "one minute ago";}
        if (diff <= 3540) {return Math.round(diff / 60) + " minutes ago";}
        if (diff <= 5400) {return "1 hour ago";}
        if (diff <= 86400) {return Math.round(diff / 3600) + " hours ago";}
        if (diff <= 129600) {return "1 day ago";}
        if (diff < 604800) {return Math.round(diff / 86400) + " days ago";}
        if (diff <= 777600) {return "1 week ago";}
        return "on " + system_date;
    }
    
    // from http://widgets.twimg.com/j/1/widget.js
    var K = function () {
        var a = navigator.userAgent;
        return {
            ie: a.match(/MSIE\s([^;]*)/)
        }
    }();

    const getTweets = () => {
        return (
            tweets.map(item => (
                <div key={item.id} style={{padding: '10px'}}>
                    <strong>{parseTwitterDate(item.created_at)}:</strong> <AutoLinkText text={item.text} linkProps={{target:'_blank'}} />
                    <hr/>
                </div>
            ))
        )
    }

    return (
        <>
            <AppHeader page={page} onClick={setPage}/>
            <div style={{padding:'50px'}}>
                {getTweets()}
            </div>
        </>
    )
}

export default Tweets;