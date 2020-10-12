import React, { Component } from 'react';
import axios from 'axios';
import StackTrace from "stacktrace-js";

const style = {
    container: {
        textAlign: "center", 
        backgroundColor: "rgba(0,0,0,.5)", 
        color: "#fff", 
        padding: "1vw 0"
    },
    title: {
        margin: "0"
    },
    msg : {
        margin: "0"
    }
}

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    reportToDiscord = (errString) => {
        console.log('Report to Discord');
        let {error} = this.state;
        let report_data = {
            "embeds" : [{
                "fields" : [
                    {
                        "name" : "Website Title:",
                        "value" : document.title,
                    },
                    {
                        "name" : "URL:",
                        "value" : window.location.href,
                    },
                    {
                        "name" : "Release:",
                        "value" : window.releases,
                    },
                    {
                        "name" : "User Agent:",
                        "value" : navigator.userAgent,
                    },
                    {
                        "name" : "Error:",
                        "value" : error.toString(),
                        "inline" : true
                    },
                    {
                        "name" : "Details:",
                        "value" : errString,
                    }
                ],
                "footer" : {
                    "text" : "React Error Reporting by Wahyu Henditya",
                }
            }]
        }

        let options = {
            transformRequest: [function (data, headers) {
                headers['post']['Content-Type'] = 'application/json;UTF-8'
                if (process.env.REACT_APP_USE_TOKEN === 'true') {
                    delete headers[process.env.REACT_APP_TOKEN_HEADER_NAME];
                }
                return JSON.stringify(data);
            }]
        }

        axios.post(
            'https://discordapp.com/api/webhooks/542297357279035392/0Ce24nmbG1ftORIhgz53V_3wypcbuTBuZ5YUG0dlr0YzHXfHyg4giZyZ2RP1nLpoz_ty', 
            report_data, 
            options
        )
    }

    componentDidCatch(error, errorInfo) {
        const self = this;
        // Catch errors in any components below and re-render with error message
        this.setState({
            error: error,
            errorInfo: errorInfo
        })

        if (process.env.NODE_ENV === "production") {
            StackTrace.fromError(error).then(err => {
                let errString = "";
                let errLength = err.length > 10 ? 10 : err.length;
                for (let index = 0; index < errLength; index++) {
                    errString += `in ${err[index].fileName}:${err[index].lineNumber} \n`;
                }

                self.reportToDiscord(errString);
            })
        }    

        // You can also log error messages to an error reporting service here
    }

    render() {
        if (this.state.errorInfo) {
            return (
                <div style={style.container}>
                    <h2 style={style.title}>
                        SORRY FOR THE INCONVENIENCE
                    </h2>
                    <h4 style={style.msg}>
                        This error has been reported. Please try to open it in another browser.
                    </h4>
                </div>
            );
        }
        // Normally, just render children
        return this.props.children;
    }
}

export default ErrorBoundary;