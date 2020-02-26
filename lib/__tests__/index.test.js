"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _actioncable = _interopRequireDefault(require("actioncable"));

var _index = require("../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe(_index.ActionCableProvider, function () {
  describe('with children', function () {
    it('renders children', function () {
      var node = (0, _enzyme.shallow)(_react["default"].createElement(_index.ActionCableProvider, null, _react["default"].createElement("span", null, "Child")));
      expect(node.children()).toHaveLength(1);
    });
  });
  describe('with no children', function () {
    it('renders null', function () {
      var node = (0, _enzyme.shallow)(_react["default"].createElement(_index.ActionCableProvider, null));
      expect(node.children()).toHaveLength(0);
    });
  });
});
describe('ActionCableConsumer', function () {
  describe('wrapped with ForwardRef', function () {
    it('renders the ForwardRef', function () {
      var node = (0, _enzyme.shallow)(_react["default"].createElement(_index.ActionCableProvider, null, _react["default"].createElement(_index.ActionCableConsumer, null)));
      expect(node.find('ForwardRef')).toHaveLength(1);
    });
    it('renders the consumer', function () {
      var node = (0, _enzyme.mount)(_react["default"].createElement(_index.ActionCableProvider, null, _react["default"].createElement(_index.ActionCableConsumer, null)));
      var consumer = node.find('ActionCableConsumer');
      expect(consumer).toHaveLength(1);
    });
    it('renders the controller', function () {
      var node = (0, _enzyme.mount)(_react["default"].createElement(_index.ActionCableProvider, null, _react["default"].createElement(_index.ActionCableConsumer, null)));
      var controller = node.find('ActionCableController');
      expect(controller).toHaveLength(1);
    });
  });
});
describe('ActionCableController', function () {
  describe('with cable passed to provider', function () {
    it('passes cable to the controller as a prop', function () {
      var cable = _actioncable["default"].createConsumer('ws://test.example.com/cable');

      var node = (0, _enzyme.mount)(_react["default"].createElement(_index.ActionCableProvider, {
        cable: cable
      }, _react["default"].createElement(_index.ActionCableConsumer, null)));
      var controller = node.find('ActionCableController');
      expect(controller.prop('cable')).toStrictEqual(cable);
    });
    describe('with children', function () {
      it('renders children', function () {
        var cable = _actioncable["default"].createConsumer('ws://test.example.com/cable');

        var node = (0, _enzyme.mount)(_react["default"].createElement(_index.ActionCableProvider, {
          cable: cable
        }, _react["default"].createElement(_index.ActionCableConsumer, null, _react["default"].createElement("span", null, "Child"))));
        var controller = node.find('ActionCableController');
        expect(controller.children()).toHaveLength(1);
      });
    });
    describe('without children', function () {
      it('renders null', function () {
        var cable = _actioncable["default"].createConsumer('ws://test.example.com/cable');

        var node = (0, _enzyme.mount)(_react["default"].createElement(_index.ActionCableProvider, {
          cable: cable
        }, _react["default"].createElement(_index.ActionCableConsumer, null), ">"));
        var controller = node.find('ActionCableController');
        expect(controller.children()).toHaveLength(0);
      });
    });
  });
});