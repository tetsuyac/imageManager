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

},{"react":undefined}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvdGV0c3V5YS9fdG1wL2ltYWdlTWFuYWdlci9zcmMvSW1hZ2VNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQkNTa0IsT0FBTzs7OztJQUVuQixZQUFZO1lBQVosWUFBWTs7QUFDTCxXQURQLFlBQVksR0FDRjswQkFEVixZQUFZOztBQUVkLCtCQUZFLFlBQVksNkNBRVA7QUFDUCxRQUFJLENBQUMsS0FBSyxHQUFHO0FBQ1gsb0JBQWMsRUFBRSxDQUFDO0tBQ2xCLENBQUE7QUFDRCxRQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0dBQ2pEOztlQVBHLFlBQVk7O1dBU0MsNkJBQUc7QUFDbEIsVUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLEVBQUMsQ0FBQyxDQUFBO0FBQzNFLFlBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO0tBQ3JEOzs7V0FFaUIsOEJBQUc7QUFDbkIsVUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRTtBQUNoRSxZQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsRUFBQyxDQUFDLENBQUE7T0FDNUU7S0FDRjs7O1dBRW1CLGdDQUFHO0FBQ3JCLFlBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQTtLQUMvRDs7O1dBRVcsc0JB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Q0FBQTtHQUNuQjtBQUNELFFBQU0sRUFBRSxDQUFDO0NBQ1YsQ0FBQTs7QUFFRCxJQUFNLEtBQUssR0FBRztBQUNaLFNBQU8sRUFBRSxPQUFPO0FBQ2hCLGlCQUFlLEVBQUUsU0FBUztBQUMxQixPQUFLLEVBQUUsTUFBTTtDQUNkLENBQUE7cUJBQ2MsWUFBWSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKlxuICogTWF5LzI5LzIwMTcgVGV0c3V5YSBDaGliYVxuICpcbiAqIHJlZmVyZW5jZXNcbiAqXG4gKiByZWFjdC1waG90by1nYWxsZXJ5XG4gKiBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9yZWFjdC1waG90by1nYWxsZXJ5XG4gKlxuICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmNsYXNzIEltYWdlTWFuYWdlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY29udGFpbmVyV2lkdGg6IDBcbiAgICB9XG4gICAgdGhpcy5oYW5kbGVSZXNpemUgPSB0aGlzLmhhbmRsZVJlc2l6ZS5iaW5kKHRoaXMpXG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtjb250YWluZXJXaWR0aDogTWF0aC5mbG9vcih0aGlzLl9pbWFnZU1hbmFnZXIuY2xpZW50V2lkdGgpfSlcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUpXG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuX2ltYWdlTWFuYWdlci5jbGllbnRXaWR0aCAhPT0gdGhpcy5zdGF0ZS5jb250YWluZXJXaWR0aCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7Y29udGFpbmVyV2lkdGg6IE1hdGguZmxvb3IodGhpcy5faW1hZ2VNYW5hZ2VyLmNsaWVudFdpZHRoKX0pXG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlUmVzaXplLCBmYWxzZSlcbiAgfVxuXG4gIGhhbmRsZVJlc2l6ZShlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7Y29udGFpbmVyV2lkdGg6IE1hdGguZmxvb3IodGhpcy5faW1hZ2VNYW5hZ2VyLmNsaWVudFdpZHRoKX0pXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgbGV0IGNvbHMgPSB0aGlzLnByb3BzLmNvbHMsXG4gICAgICBwaG90b1ByZXZpZXdOb2RlcyA9IFtdLFxuICAgICAgY29udFdpZHRoID0gdGhpcy5zdGF0ZS5jb250YWluZXJXaWR0aCAtIChjb2xzICogKHRoaXMucHJvcHMubWFyZ2luICogMikpXG5cbiAgICBjb250V2lkdGggPSBNYXRoLmZsb29yKGNvbnRXaWR0aCkgLy8gYWRkIHNvbWUgcGFkZGluZyB0byBwcmV2ZW50IGxheW91dCBwcm9iXG4gICAgdmFyIHJlbWFpbmRlciA9IHRoaXMucHJvcHMucGhvdG9zLmxlbmd0aCAlIGNvbHNcbiAgICBpZiAocmVtYWluZGVyKSB7IC8vIHRoZXJlIGFyZSBmZXdlciBwaG90b3MgdGhhbiBjb2xzIG51bSBpbiBsYXN0IHJvd1xuICAgICAgdmFyIGxhc3RSb3dXaWR0aCA9IE1hdGguZmxvb3IoKCh0aGlzLnN0YXRlLmNvbnRhaW5lcldpZHRoIC8gY29scykgKiByZW1haW5kZXIpIC0gKHJlbWFpbmRlciAqICh0aGlzLnByb3BzLm1hcmdpbiAqIDIpKSlcbiAgICAgIHZhciBsYXN0Um93SW5kZXggPSB0aGlzLnByb3BzLnBob3Rvcy5sZW5ndGggLSByZW1haW5kZXJcbiAgICB9XG4gICAgLy8gbG9vcCB0aHJ1IGVhY2ggc2V0IG9mICBjb2xzIG51bVxuICAgIC8vIGVnLiBpZiBjb2xzIGlzIDMgaXQgd2lsbCAgbG9vcCB0aHJ1IDAsMSwyLCB0aGVuIDMsNCw1IHRvIHBlcmZvcm0gY2FsY3VsYXRpb25zIGZvciB0aGUgcGFydGljdWxhciBzZXRcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucHJvcHMucGhvdG9zLmxlbmd0aDsgaSArPSBjb2xzKSB7XG4gICAgICB2YXIgdG90YWxBciA9IDAsXG4gICAgICAgIGNvbW1vbkhlaWdodCA9IDBcblxuICAgICAgLy8gZ2V0IHRoZSB0b3RhbCBhc3BlY3QgcmF0aW8gb2YgdGhlIHJvd1xuICAgICAgZm9yICh2YXIgaiA9IGk7IGogPCBpICsgY29sczsgaisrKSB7XG4gICAgICAgIGlmIChqID09IHRoaXMucHJvcHMucGhvdG9zLmxlbmd0aCkge1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9wcy5waG90b3Nbal0uYXNwZWN0UmF0aW8gPSB0aGlzLnByb3BzLnBob3Rvc1tqXS53aWR0aCAvIHRoaXMucHJvcHMucGhvdG9zW2pdLmhlaWdodFxuICAgICAgICB0b3RhbEFyICs9IHRoaXMucHJvcHMucGhvdG9zW2pdLmFzcGVjdFJhdGlvXG4gICAgICB9XG4gICAgICBpZiAoaSA9PT0gbGFzdFJvd0luZGV4KSB7XG4gICAgICAgIGNvbW1vbkhlaWdodCA9IGxhc3RSb3dXaWR0aCAvIHRvdGFsQXJcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbW1vbkhlaWdodCA9IGNvbnRXaWR0aCAvIHRvdGFsQXJcbiAgICAgIH1cbiAgICAgIC8vIHJ1biB0aHJ1IHRoZSBzYW1lIHNldCBvZiBpdGVtcyBhZ2FpbiB0byBnaXZlIHRoZSB3aWR0aCBhbmQgY29tbW9uIGhlaWdodFxuICAgICAgZm9yIChsZXQgayA9IGk7IGsgPCBpICsgY29sczsgaysrKSB7XG4gICAgICAgIGlmIChrID09IHRoaXMucHJvcHMucGhvdG9zLmxlbmd0aCkge1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc3JjID0gdGhpcy5wcm9wcy5waG90b3Nba10uc3JjLCBzcmNzZXQsIHNpemVzXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnBob3Rvc1trXS5zcmNzZXQpIHtcbiAgICAgICAgICBzcmNzZXQgPSB0aGlzLnByb3BzLnBob3Rvc1trXS5zcmNzZXQuam9pbigpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJvcHMucGhvdG9zW2tdLnNpemVzKSB7XG4gICAgICAgICAgc2l6ZXMgPSB0aGlzLnByb3BzLnBob3Rvc1trXS5zaXplcy5qb2luKClcbiAgICAgICAgfVxuXG4gICAgICAgIHN0eWxlLm1hcmdpbiA9IHRoaXMucHJvcHMubWFyZ2luXG4gICAgICAgIHBob3RvUHJldmlld05vZGVzLnB1c2goXG4gICAgICAgICAgPGRpdiBrZXk9e2t9IHN0eWxlPXtzdHlsZX0+XG4gICAgICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzTmFtZT17a30gb25DbGljaz17KGUpID0+IHRoaXMucHJvcHMub25DbGlja1Bob3RvKGssIGUpfT5cbiAgICAgICAgICAgICAgPGltZyBzcmM9e3NyY30gc3JjU2V0PXtzcmNzZXR9IHNpemVzPXtzaXplc30gc3R5bGU9e3tkaXNwbGF5OiAnYmxvY2snLCBib3JkZXI6IDB9fSBoZWlnaHQ9e2NvbW1vbkhlaWdodH0gd2lkdGg9e2NvbW1vbkhlaWdodCAqIHRoaXMucHJvcHMucGhvdG9zW2tdLmFzcGVjdFJhdGlvfVxuICAgICAgICAgICAgICAgICAgIGFsdD17dGhpcy5wcm9wcy5waG90b3Nba10uYWx0fS8+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMucmVuZGVySW1hZ2VNYW5hZ2VyKHBob3RvUHJldmlld05vZGVzKVxuICAgIClcbiAgfVxuXG4gIHJlbmRlckltYWdlTWFuYWdlcihwaG90b1ByZXZpZXdOb2Rlcykge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPVwiSW1hZ2VNYW5hZ2VyXCIgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIiByZWY9eyhjKSA9PiB0aGlzLl9pbWFnZU1hbmFnZXIgPSBjfT5cbiAgICAgICAge3Bob3RvUHJldmlld05vZGVzfVxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5cbkltYWdlTWFuYWdlci5kaXNwbGF5TmFtZSA9ICdJbWFnZU1hbmFnZXInXG5JbWFnZU1hbmFnZXIucHJvcFR5cGVzID0ge1xuICBwaG90b3M6IGZ1bmN0aW9uIChwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUpIHtcbiAgICByZXR1cm4gUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBzcmM6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgd2lkdGg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgaGVpZ2h0OiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgIGFsdDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgc3Jjc2V0OiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXG4gICAgICAgIHNpemVzOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlcbiAgICAgIH0pXG4gICAgKS5pc1JlcXVpcmVkLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgfSxcbiAgb25DbGlja1Bob3RvOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgY29sczogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgbWFyZ2luOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyXG59XG5JbWFnZU1hbmFnZXIuZGVmYXVsdFByb3BzID0ge1xuICBjb2xzOiAzLFxuICBvbkNsaWNrUGhvdG86IGZ1bmN0aW9uIChrLCBlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gIH0sXG4gIG1hcmdpbjogMlxufVxuLy8gSW1hZ2VNYW5hZ2VyIGltYWdlIHN0eWxlXG5jb25zdCBzdHlsZSA9IHtcbiAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgYmFja2dyb3VuZENvbG9yOiAnI2UzZTNlMycsXG4gIGZsb2F0OiAnbGVmdCdcbn1cbmV4cG9ydCBkZWZhdWx0IEltYWdlTWFuYWdlclxuIl19
