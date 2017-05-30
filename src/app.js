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
import ReactDOM from 'react-dom'
import ImageManager from 'imageManager'
import $ from 'jquery'
import _ from 'lodash'
import Measure from 'react-measure'
import Lightbox from 'react-images'
import Sticky from 'react-sticky-el'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      photos: null,
      pageNum: 1,
      totalPages: 1,
      loadedAll: false,
      currentImage: 0,
      searchText: 'peace',
      appKey: 'peace'
    }
    this.handleScroll = this.handleScroll.bind(this)
    this.loadMorePhotos = this.loadMorePhotos.bind(this)
    this.closeLightbox = this.closeLightbox.bind(this)
    this.openLightbox = this.openLightbox.bind(this)
    this.gotoNext = this.gotoNext.bind(this)
    this.gotoPrevious = this.gotoPrevious.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleSearchGo = this.handleSearchGo.bind(this)
  }

  handleSearchChange(e) {
    this.setState({searchText: e.target.value})
  }

  handleSearchGo(e) {
    this.setState({
      photos: null,
      pageNum: 1,
      totalPages: 1,
      loadedAll: false,
      currentImage: 0,
      appKey: this.state.searchText
    })
    this.loadMorePhotos()
    e.preventDefault();
  }

  componentDidMount() {
    this.loadMorePhotos()
    this.loadMorePhotos = _.debounce(this.loadMorePhotos, 200)
    window.addEventListener('scroll', this.handleScroll)
  }

  handleScroll() {
    let scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop
    if ((window.innerHeight + scrollY) >= (document.body.offsetHeight - 50)) {
      this.loadMorePhotos()
    }
  }

  loadMorePhotos(e) {
    if (e) {
      e.preventDefault()
    }
    if (this.state.pageNum > this.state.totalPages) {
      this.setState({loadedAll: true})
      return
    }
    $.ajax({
      url: 'https://api.flickr.com/services/rest/' +
      '?method=flickr.photos.search' +
      '&api_key=bac823562d3b3263501da80ea7572049' +
      '&text=' + this.state.searchText +
      '&format=json' +
      '&per_page=21&page=' + this.state.pageNum + '&extras=url_m,url_c,url_l,url_h,url_o',
      dataType: 'jsonp',
      jsonpCallback: 'jsonFlickrApi',
      cache: false,
      success: function (data) {
        let photos = []
        data.photos.photo.forEach(function (obj, i, array) {
          let aspectRatio = parseFloat(obj.width_o / obj.height_o),
            sizeSpec = 'omclh', srcset

          srcset = sizeSpec.split('').filter((e) => {
            let width_e = 'width_' + e
            return obj[width_e]
          }).map((e) => {
            let url_x = 'url_' + e, width_x = 'width_' + e
            return obj[url_x] + ' ' + obj[width_x] + 'w'
          })

          photos.push({
            src: (aspectRatio >= 3) ? obj.url_c : obj.url_m,
            width: parseInt(obj.width_o),
            height: parseInt(obj.height_o),
            caption: obj.title,
            alt: obj.title,
            srcset: srcset,
            sizes: [
              '(min-width: 480px) 50vw',
              '(min-width: 1024px) 33.3vw',
              '100vw'
            ]
          })
        })
        this.setState({
          photos: this.state.photos ? this.state.photos.concat(photos) : photos,
          pageNum: this.state.pageNum + 1,
          totalPages: data.photos.pages
        })
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(status, err.toString())
      }.bind(this)
    })
  }

  openLightbox(index, event) {
    event.preventDefault()
    this.setState({
      currentImage: index,
      lightboxIsOpen: true
    })
  }

  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    })
  }

  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    })
  }

  gotoNext() {
    if (this.state.photos.length - 2 === this.state.currentImage) {
      this.loadMorePhotos()
    }
    this.setState({
      currentImage: this.state.currentImage + 1,
    })
  }

  renderImageManager() {
    return (
      <Measure whitelist={['width']}>
        {({width}) => {
          var cols = 1
          if (width >= 480) {
            cols = 2
          }
          if (width >= 1024) {
            cols = 3
          }
          return <ImageManager photos={this.state.photos} cols={cols} onClickPhoto={this.openLightbox}/>
        }}
      </Measure>
    )
  }

  render() {
    if (this.state.photos) {
      return (
        <div className="App" key={this.state.appKey}>
          <Sticky>
            <form id="search" onSubmit={this.handleSearchGo}>
              flickr public photos &nbsp;
              <input
                type="text"
                size="40"
                value={this.state.searchText}
                onChange={this.handleSearchChange}
                placeholder="use with care!!! (no filters applied)"/>
              &nbsp;
              <input type="submit" value="Search"/>
            </form>
          </Sticky>
          {this.renderImageManager()}
          <Lightbox
            images={this.state.photos}
            backdropClosesModal={true}
            onClose={this.closeLightbox}
            onClickPrev={this.gotoPrevious}
            onClickNext={this.gotoNext}
            currentImage={this.state.currentImage}
            isOpen={this.state.lightboxIsOpen}
            width={1600}
          />
          {!this.state.loadedAll && <div className="loading-msg" id="msg-loading-more">Loading</div>}
        </div>
      )
    } else {
      return (
        <div className="App" key={this.state.appKey}>
          <div id="msg-app-loading" className="loading-msg">Loading</div>
        </div>
      )
    }
  }
}
ReactDOM.render(<App />, document.getElementById('app'))
