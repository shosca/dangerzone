import React from 'react';

export default React.createClass({
    getSession() {
        return this.props.session;
    },
    handleClick() {
        if (this.props.selectedSession && this.props.selectedSession === this.props.session.id) {
            this.props.selectSession(null)
        } else {
            this.props.selectSession(this.props.session.id)
        }
    },
    render() {
        let s = this.getSession();
        let clazz = s.id === this.props.selectedSession
            ? ' active' : '';

        return <div className={'list-group-item' + clazz} onClick={this.handleClick}>
            <div className={"row-content"}>
                <p className={"list-group-item-heading"}>
                    {s.method && `${s.method}: `}
                    {s.name}
                </p>
                <p className={"list-group-item-text"}>
                    <i>
                        {s.count} queries in {s.duration.toFixed(3)} secs.
                    </i>
                </p>
            </div>
        </div>
    }
});
