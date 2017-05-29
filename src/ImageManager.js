/*
 * May/29/2017 Tetsuya Chiba
 *
 * references
 *
 * react-photo-gallery
 * https://www.npmjs.com/package/react-photo-gallery
 *
 */
import React from 'react'

class ImageManager extends React.Component {
  constructor() {
    super()
    this.state = {
      containerWidth: 0
    }
    this.handleResize = this.handleResize.bind(this)
  }

  componentDidMount() {
    this.setState({containerWidth: Math.floor(this._imageManager.clientWidth)})
    window.addEventListener('resize', this.handleResize)
  }

  componentDidUpdate() {
    if (this._imageManager.clientWidth !== this.state.containerWidth) {
      this.setState({containerWidth: Math.floor(this._imageManager.clientWidth)})
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize, false)
  }

  handleResize(e) {
    this.setState({containerWidth: Math.floor(this._imageManager.clientWidth)})
  }

  render() {
    let cols = this.props.cols,
      photoPreviewNodes = [],
      contWidth = this.state.containerWidth - (cols * (this.props.margin * 2))

    contWidth = Math.floor(contWidth) // add some padding to prevent layout prob
    var remainder = this.props.photos.length % cols
    if (remainder) { // there are fewer photos than cols num in last row
      var lastRowWidth = Math.floor(((this.state.containerWidth / cols) * remainder) - (remainder * (this.props.margin * 2)))
      var lastRowIndex = this.props.photos.length - remainder
    }
    // loop thru each set of  cols num
    // eg. if cols is 3 it will  loop thru 0,1,2, then 3,4,5 to perform calculations for the particular set
    for (var i = 0; i < this.props.photos.length; i += cols) {
      var totalAr = 0,
        commonHeight = 0

      // get the total aspect ratio of the row
      for (var j = i; j < i + cols; j++) {
        if (j == this.props.photos.length) {
          break
        }
        this.props.photos[j].aspectRatio = this.props.photos[j].width / this.props.photos[j].height
        totalAr += this.props.photos[j].aspectRatio
      }
      if (i === lastRowIndex) {
        commonHeight = lastRowWidth / totalAr
      } else {
        commonHeight = contWidth / totalAr
      }
      // run thru the same set of items again to give the width and common height
      for (let k = i; k < i + cols; k++) {
        if (k == this.props.photos.length) {
          break
        }

        let src = this.props.photos[k].src, srcset, sizes
        if (this.props.photos[k].srcset) {
          srcset = this.props.photos[k].srcset.join()
        }
        if (this.props.photos[k].sizes) {
          sizes = this.props.photos[k].sizes.join()
        }

        style.margin = this.props.margin
        photoPreviewNodes.push(
          <div key={k} style={style}>
            <a href="#" className={k} onClick={(e) => this.props.onClickPhoto(k, e)}>
              <img src={src} srcSet={srcset} sizes={sizes} style={{display: 'block', border: 0}} height={commonHeight} width={commonHeight * this.props.photos[k].aspectRatio}
                   alt={this.props.photos[k].alt}/>
            </a>
          </div>
        )
      }
    }
    return (
      this.renderImageManager(photoPreviewNodes)
    )
  }

  renderImageManager(photoPreviewNodes) {
    return (
      <div id="ImageManager" className="clearfix" ref={(c) => this._imageManager = c}>
        {photoPreviewNodes}
      </div>
    )
  }
}

ImageManager.displayName = 'ImageManager'
ImageManager.propTypes = {
  photos: function (props, propName, componentName) {
    return React.PropTypes.arrayOf(
      React.PropTypes.shape({
        src: React.PropTypes.string.isRequired,
        width: React.PropTypes.number.isRequired,
        height: React.PropTypes.number.isRequired,
        alt: React.PropTypes.string,
        srcset: React.PropTypes.array,
        sizes: React.PropTypes.array
      })
    ).isRequired.apply(this, arguments)
  },
  onClickPhoto: React.PropTypes.func,
  cols: React.PropTypes.number,
  margin: React.PropTypes.number
}
ImageManager.defaultProps = {
  cols: 3,
  onClickPhoto: function (k, e) {
    e.preventDefault()
  },
  margin: 2
}
// ImageManager image style
const style = {
  display: 'block',
  backgroundColor: '#e3e3e3',
  float: 'left'
}
export default ImageManager
