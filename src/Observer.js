import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Observer extends Component {
    // React Cycle:
    constructor() {
        super();
        this.observer = null;
        this.state = {
            isVisible: false
        }
    }

    componentDidMount() {
        this.observer = new IntersectionObserver(this.handleObserver, {
            threshold: [0.5]
        });

        this.observer.observe(this.obContainer);
    }

    componentWillUnmount() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    render() {
        return (
            <div ref={element => this.obContainer = element}>
                {
                    Array.isArray(this.props.children) ?
                    this.props.children.map(child => child(this.state.isVisible)) :
                    this.props.children(this.state.isVisible)
                }
            </div>
        ) 
    }

    // Methods:
    handleObserver = ([entry]) => {
        // console.log(entry.intersectionRatio);
        this.setState({ isVisible: entry.isIntersecting }, () => {
            if (this.state.isVisible && this.props.once) {
                this.observer.disconnect();
            }
        });
    }
}

Observer.propTypes = {
    once: PropTypes.bool,
    triggerRatio: PropTypes.number
}

export default Observer;