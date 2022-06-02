import React, {Linking} from "react-native";
import { Component } from "react";

var { Text, StyleSheet, LinkingIOS } = React;

var styles = StyleSheet.create({
  link: {
    color: "#0000ff",
    flexWrap: "wrap",
    fontWeight: "bold",
  },
  text: {},
  container: {
    width: 300,
  },
});

//split hypertext
function splitHypertext(params) {
  var htmlTagRegex =/(<[^>]*>)/g;

  var that = this;

  var split = params.input.split(htmlTagRegex).filter(function(s) {
    return s.length > 0;
  });

  return split.reduce(function(res, _, index, arr) {
    if (arr[index].indexOf('<a') !== -1 && arr[index + 2].indexOf('</a>') !== -1) {
      var href = arr[index].match(/href="([^\'\"]+)/)[1];

      res.push(
        params.onLink.call(that, arr[index + 1], href)
      );
      arr.splice(index, 2);
    } else {
      res.push(
        params.onText.call(that, arr[index])
      );
    }
    return res;
  }, []);
}

//random keygen function
var randomKeyGen = function () {
  return Math.random().toString(36).substring(7);
};

class HyperText extends Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  onPress(href) {
    if (typeof this.props.onLinkClick === "function") {
      this.props.onLinkClick.apply(this, arguments);
    } else if (href) {
      Linking.openURL(href);
    }
  }

  render() {
    var action = this.onPress;
    var children = splitHypertext({
      input: this.props.children,
      onLink: function (text, href) {
        return (
          <Text
            style={styles.link}
            key={randomKeyGen()}
            onPress= {()=>action(href)}
            >
            {text}
          </Text>
        );
      },

      onText: (text) => (
        <Text style={styles.text} key={randomKeyGen()}>
          {text}
        </Text>
      ),
    });
    return <Text>{children}</Text>;
  }
}

module.exports = HyperText;
