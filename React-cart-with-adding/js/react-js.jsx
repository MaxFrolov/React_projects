/** @jsx React.DOM */
var cartItem = [
  {'name': 'B7.5(M100) П1-П5', 'price': 650},
  {'name': 'В12,5(М150)П1-П5', 'price': 452},
  {'name': 'В15(М200)П1-П5', 'price': 121}
  ];
var CartsItem = React.createClass({
  render: function () {
    var klick = this.props.klick;
    return (
      <div>
      {cartItem.map(function (argument, index) {
        var _clas = index % 2 == 0 ? "active" : "n_active";
        return (
          <li className={_clas} key={index+1}>{cartItem[index].name}: <span>{cartItem[index].price}$</span> <div key={index} onClick={klick.bind(null, index)} className="btn_add btn btn-default">Add</div></li>
          );
      })}
      </div>
      );
  }
});
var TotalP = React.createClass({
  render: function() {
    var total = 0,
       _list = this.props.listI,
       rows = _list.map(function (item, index) {
        total+=item.it_price;
      });
    return (<div>
      <p>The total amount of goods: {total}$</p>
      </div>);
  }
});
var Forma = React.createClass({
  render: function(){
    var count = this.props.count;
        _list = this.props.listI,
        index = 0,
        remove = this.props.handleRemove,
        betons = _list.map(function (item, index){
    var clas = index % 2 == 0 ? "active" : "n_active";  
      return <li className={clas} key={index}><input type="hidden" value={item.it_name + ": " + item.it_price + "$"} />{item.it_name}: <span>{item.it_price}$</span> <div key={index} onClick={remove.bind(null, index)} className="btn_add btn btn-default">Remove</div></li>;
    });
    return (
      <div>
        <ul className="list">
        {betons}
        </ul>
      </div>
      );
  }
});
var Cart = React.createClass({
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
      <div className="container">
        <div className="col-md-6">
        <p>List of products:</p>
          <ul className="list">
          <CartsItem klick={this.handleClick} />
          </ul>
        </div>
        <div className="col-md-6">
         <p>Selected Items:</p>
          
          <form className="form-horizontal">
          <Forma count={this.state.count} listI={this.state.listI} handleRemove={this.handleRemove}/>
          <TotalP listI={this.state.listI}/>
          <div className="form-group">
            <label for="inputEmail3" className="col-sm-2 control-label">Email</label>
            <div className="col-sm-10">
              <input type="email" className="form-control" id="inputEmail3" placeholder="Enter your email" />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">Name</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputPassword3" placeholder="Enter your name" />
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-default">Order</button>
            </div>
          </div>
          </form>
        </div>
      </div>
      );
  }
});
React.render(<Cart />, document.getElementById('example'));
 