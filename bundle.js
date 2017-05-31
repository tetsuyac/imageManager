require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"imageManager":[function(require,module,exports){
/*
 * May/29/2017 Tetsuya Chiba
 *
 * references
 *
 * react-photo-gallery
 * https://www.npmjs.com/package/react-photo-gallery
 *
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var ImageManager = (function (_React$Component) {
  _inherits(ImageManager, _React$Component);

  function ImageManager() {
    _classCallCheck(this, ImageManager);

    _get(Object.getPrototypeOf(ImageManager.prototype), 'constructor', this).call(this);
    this.state = {
      containerWidth: 0
    };
    this.handleResize = this.handleResize.bind(this);
  }

  _createClass(ImageManager, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({ containerWidth: Math.floor(this._imageManager.clientWidth) });
      window.addEventListener('resize', this.handleResize);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this._imageManager.clientWidth !== this.state.containerWidth) {
        this.setState({ containerWidth: Math.floor(this._imageManager.clientWidth) });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize, false);
    }
  }, {
    key: 'handleResize',
    value: function handleResize(e) {
      this.setState({ containerWidth: Math.floor(this._imageManager.clientWidth) });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var cols = this.props.cols,
          photoPreviewNodes = [],
          contWidth = this.state.containerWidth - cols * (this.props.margin * 2);

      contWidth = Math.floor(contWidth); // add some padding to prevent layout prob
      var remainder = this.props.photos.length % cols;
      if (remainder) {
        // there are fewer photos than cols num in last row
        var lastRowWidth = Math.floor(this.state.containerWidth / cols * remainder - remainder * (this.props.margin * 2));
        var lastRowIndex = this.props.photos.length - remainder;
      }
      // loop thru each set of  cols num
      // eg. if cols is 3 it will  loop thru 0,1,2, then 3,4,5 to perform calculations for the particular set
      for (var i = 0; i < this.props.photos.length; i += cols) {
        var totalAr = 0,
            commonHeight = 0;

        // get the total aspect ratio of the row
        for (var j = i; j < i + cols; j++) {
          if (j == this.props.photos.length) {
            break;
          }
          this.props.photos[j].aspectRatio = this.props.photos[j].width / this.props.photos[j].height;
          totalAr += this.props.photos[j].aspectRatio;
        }
        if (i === lastRowIndex) {
          commonHeight = lastRowWidth / totalAr;
        } else {
          commonHeight = contWidth / totalAr;
        }
        // run thru the same set of items again to give the width and common height

        var _loop = function (k) {
          if (k == _this.props.photos.length) {
            return 'break';
          }

          var src = _this.props.photos[k].src,
              srcset = undefined,
              sizes = undefined;
          if (_this.props.photos[k].srcset) {
            srcset = _this.props.photos[k].srcset.join();
          }
          if (_this.props.photos[k].sizes) {
            sizes = _this.props.photos[k].sizes.join();
          }

          style.margin = _this.props.margin;
          photoPreviewNodes.push(_react2['default'].createElement(
            'div',
            { key: k, style: style },
            _react2['default'].createElement(
              'a',
              { href: '#', className: k, onClick: function (e) {
                  return _this.props.onClickPhoto(k, e);
                } },
              _react2['default'].createElement('img', { src: src, srcSet: srcset, sizes: sizes, style: { display: 'block', border: 0 }, height: commonHeight, width: commonHeight * _this.props.photos[k].aspectRatio,
                alt: _this.props.photos[k].alt })
            )
          ));
        };

        for (var k = i; k < i + cols; k++) {
          var _ret = _loop(k);

          if (_ret === 'break') break;
        }
      }
      return this.renderImageManager(photoPreviewNodes);
    }
  }, {
    key: 'renderImageManager',
    value: function renderImageManager(photoPreviewNodes) {
      var _this2 = this;

      return _react2['default'].createElement(
        'div',
        { id: 'ImageManager', className: 'clearfix', ref: function (c) {
            return _this2._imageManager = c;
          } },
        photoPreviewNodes
      );
    }
  }]);

  return ImageManager;
})(_react2['default'].Component);

ImageManager.displayName = 'ImageManager';
ImageManager.propTypes = {
  photos: function photos(props, propName, componentName) {
    return _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.shape({
      src: _react2['default'].PropTypes.string.isRequired,
      width: _react2['default'].PropTypes.number.isRequired,
      height: _react2['default'].PropTypes.number.isRequired,
      alt: _react2['default'].PropTypes.string,
      srcset: _react2['default'].PropTypes.array,
      sizes: _react2['default'].PropTypes.array
    })).isRequired.apply(this, arguments);
  },
  onClickPhoto: _react2['default'].PropTypes.func,
  cols: _react2['default'].PropTypes.number,
  margin: _react2['default'].PropTypes.number
};
ImageManager.defaultProps = {
  cols: 3,
  onClickPhoto: function onClickPhoto(k, e) {
    e.preventDefault();
  },
  margin: 2
};
// ImageManager image style
var style = {
  display: 'block',
  backgroundColor: '#e3e3e3',
  float: 'left'
};
exports['default'] = ImageManager;
module.exports = exports['default'];

},{"react":undefined}]},{},[]);
