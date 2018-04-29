import React, { Component } from 'react';
import PropTypes from 'prop-types'

class ImageBox extends Component {
    render() {
        const containerStyle = {
            width: '200px',
            height: '200px',
            margin: '10px auto'
        }

        const placeholderStyle = {
            width: '100%',
            height: '100%',
            background: '#DCDCDC'
        }

        return (
            <div style={containerStyle}>
                {
                    this.props.isVisible ?
                    <img width="100%" src={this.props.url} /> :
                    <div style={placeholderStyle}></div>
                }
            </div>
        )
    }
}

ImageBox.propTypes = {
    isVisible: PropTypes.bool,
    url: PropTypes.string
}

export default ImageBox;