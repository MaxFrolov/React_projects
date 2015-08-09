/** @jsx React.DOM */
var cartItem = [
  {'name': 'B7.5(M100) П1-П5', 'price': 650},
  {'name': 'В12,5(М150)П1-П5', 'price': 452},
  {'name': 'В15(М200)П1-П5', 'price': 121}
  ];
var CartsItem = React.createClass({displayName: "CartsItem",
  render: function () {
    var klick = this.props.klick;
    return (
      React.createElement("div", null, 
      cartItem.map(function (argument, index) {
        var _clas = index % 2 == 0 ? "active" : "n_active";
        return (
          React.createElement("li", {className: _clas, key: index+1}, cartItem[index].name, ": ", React.createElement("span", null, cartItem[index].price, "$"), " ", React.createElement("div", {key: index, onClick: klick.bind(null, index), className: "btn_add btn btn-default"}, "Add"))
          );
      })
      )
      );
  }
});
var TotalP = React.createClass({displayName: "TotalP",
  render: function() {
    var total = 0,
       _list = this.props.listI,
       rows = _list.map(function (item, index) {
        total+=item.it_price;
      });
    return (React.createElement("div", null, 
      React.createElement("p", null, "The total amount of goods: ", total, "$")
      ));
  }
});
var Forma = React.createClass({displayName: "Forma",
  render: function(){
    var count = this.props.count;
        _list = this.props.listI,
        index = 0,
        remove = this.props.handleRemove,
        betons = _list.map(function (item, index){
    var clas = index % 2 == 0 ? "active" : "n_active";  
      return React.createElement("li", {className: clas, key: index}, React.createElement("input", {type: "hidden", value: item.it_name + ": " + item.it_price + "$"}), item.it_name, ": ", React.createElement("span", null, item.it_price, "$"), " ", React.createElement("div", {key: index, onClick: remove.bind(null, index), className: "btn_add btn btn-default"}, "Remove"));
    });
    return (
      React.createElement("div", null, 
        React.createElement("ul", {className: "list"}, 
        betons
        )
      )
      );
  }
});
var Cart = React.createClass({displayName: "Cart",
  getInitialState: function() {
    return {count: [], listI: []};
  },
  handleRemove: function(index) {
    index.preventDefault;
    var r_list = this.state.listI.splice(index, 1);

    this.setState({count: index, listI: this.state.listI}); 
  },
  handleClick: function(index) {
    index.preventDefault;
    
    var it_name = cartItem[index].name,
        it_price = cartItem[index].price,
        list = this.state.listI.concat([{it_name, it_price}]);
    
    this.setState({count: index, listI: list});
  },
  render: function() {
    console.log(this.state.listI);
    return (
      React.createElement("div", {className: "container"}, 
        React.createElement("div", {className: "col-md-6"}, 
        React.createElement("p", null, "List of products:"), 
          React.createElement("ul", {className: "list"}, 
          React.createElement(CartsItem, {klick: this.handleClick})
          )
        ), 
        React.createElement("div", {className: "col-md-6"}, 
         React.createElement("p", null, "Selected Items:"), 
          
          React.createElement("form", {className: "form-horizontal"}, 
          React.createElement(Forma, {count: this.state.count, listI: this.state.listI, handleRemove: this.handleRemove}), 
          React.createElement(TotalP, {listI: this.state.listI}), 
          React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {for: "inputEmail3", className: "col-sm-2 control-label"}, "Email"), 
            React.createElement("div", {className: "col-sm-10"}, 
              React.createElement("input", {type: "email", className: "form-control", id: "inputEmail3", placeholder: "Enter your email"})
            )
          ), 
          React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {className: "col-sm-2 control-label"}, "Name"), 
            React.createElement("div", {className: "col-sm-10"}, 
              React.createElement("input", {type: "text", className: "form-control", id: "inputPassword3", placeholder: "Enter your name"})
            )
          ), 

          React.createElement("div", {className: "form-group"}, 
            React.createElement("div", {className: "col-sm-offset-2 col-sm-10"}, 
              React.createElement("button", {type: "submit", className: "btn btn-default"}, "Order")
            )
          )
          )
        )
      )
      );
  }
});
React.render(React.createElement(Cart, null), document.getElementById('example'));
