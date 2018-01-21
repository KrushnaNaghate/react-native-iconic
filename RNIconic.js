import React, { Component } from "react";
import { StyleSheet, ViewPropTypes, Platform } from "react-native";
import PropTypes from "prop-types";

import { requireNativeComponent } from "react-native";

class RNIconic extends Component {
  _onChange = event => {
    let value = false;
    if (event.nativeEvent.value === "YES") value = true;

    this.props.onChange && this.props.onChange(value);

    this._iconicButton.setNativeProps({ on: event.nativeEvent.value });
  };

  render() {
    if (Platform.OS === "ios") {
      return <IconicButton ref={ref => {
            this._iconicButton = ref;
          }} style={{ width: this.props.size, height: this.props.size }} props={{ size: this.props.size, on: this.props.value, shape: this.props.shape, color: this.props.color, fillColor: this.props.fillColor }} onChange={this._onChange} />;
    } else if (Platform.OS === "android") {
      return <IconicButton {...this.props} ref={ref => {
            this._iconicButton = ref;
          }} style={{ width: this.props.size, height: this.props.size }} size={this.props.size} on={this.props.value} disable={this.props.disabled} shape={this.props.shape} color={this.props.color} fillColor={this.props.fillColor} onChange={this._onChange} />;
    }
  }
}

RNIconic.propTypes = {
  ...ViewPropTypes,

  /**
   * is the checkbox checked. Default false
   */
  value: PropTypes.bool,
  disabled: PropTypes.bool,
  shape: PropTypes.string,
  on: PropTypes.bool,
  color: PropTypes.string,
  fillColor: PropTypes.string,
  size: PropTypes.number,
  props: PropTypes.object,
  onChange: PropTypes.func
};

RNIconic.defaultProps = {
  value: false,
  disabled: false,
  size: 100
};

const IconicButton = requireNativeComponent("RNIconic", RNIconic, {
  nativeOnly: { onChange: true, on: true }
});

export default RNIconic;
