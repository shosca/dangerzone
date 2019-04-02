import React from 'react';

export default React.createClass({
    handleClick() {
        if (this.props.selectedLog && this.props.selectedLog === this.props.entry.id) {
            this.props.selectLog(null);
        } else {
            this.props.selectLog(this.props.entry.id);
        }
    },
    render() {
        let clazz = this.props.entry.id === this.props.selectedLog ? " active" : "";

        return <div className={"row log-item"+clazz} onClick={this.handleClick}>
            <div className={"col-md-10 ellipsis"}>
                {this.props.entry.text.replace(/(?:\r\n|\r|\n)/g, ' ')
                    .replace(/(SELECT)(.+?)(?= FROM)/gi, "$1 …")
                    .replace(/(JOIN(.+?)ON)(.+?)(LEFT|OUTER|JOIN|WHERE)/gi, "$1 … $4")
                }
            </div>
            <div className={"col-md-1"}>
                {this.props.entry.duration.toFixed(4)}
            </div>
            <div className={"col-md-1"}>
                {this.props.entry.resultcount}
            </div>
        </div>;
    }
});
