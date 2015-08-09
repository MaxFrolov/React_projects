/** @jsx React.DOM */

var CartsItem = React.createClass({
  render: function () {
    var klick = this.props.klick,
        cartItem = this.props.cartItem;
    return (
      <div>
      {cartItem.map(function (argument, index) {
        var _clas = index % 2 == 0 ? "active" : "n_active";
        return (
          <li className={_clas} key={index+1}>{cartItem[index].name} <span className="price">{cartItem[index].price} $</span> <div key={index} onClick={klick.bind(null, index)} className="btn_add"></div></li>
          );
      })}
      </div>
      );
  }
});

var CartTotal = React.createClass({
  total_cart: function() {
    var _list = this.props.listI;
    if (_list[0] === undefined) {
      return 0;
     } else {
      var sum = _list.reduce(function (summ, current) {
      return summ + current.it_total;
       },0);
      return sum;
      };
  },
  render: function() {
    return (<div className="cart_total" onClick={this.props.handleTotal}> In your cart: {this.total_cart()} items.</div>);
  }
});

var TotalP = React.createClass({
  rows: function() {
    var _list = this.props.listI;
    if (_list[0] === undefined) {
      return 0;
     } else {
      var sum = _list.reduce(function (summ, current) {
      return summ + current.it_price*current.it_total;
       },0);
      return sum;
      };
  },

  render: function() {
    return (<div className="li_p">
      <p className="total_p">Общая стоимость товаров:</p>
      <div className="col-sm-12 total">{this.rows()+" $"}</div>
      <input type="hidden" value={"Общая стоимость товаров: " + this.rows() +" P."}/>
      </div>);
  }
});

var Forma = React.createClass({
  render: function(){
    var _list = this.props.listI,
        index = 0,
        remove = this.props.handleRemove;
    var betons = _list.map(function (item, index){
    var clas = index % 2 == 0 ? "active" : "n_active";  
      return <li className={clas + " col-sm-12"} key={index}><input type="hidden" value={item.it_name + " X " + item.it_total + " : " + item.it_price*item.it_total + "$"} />{item.it_name} х {item.it_total} <span className="price">{item.it_price*item.it_total} $</span> <div key={index} onClick={remove.bind(null, index)} className="remove"></div></li>;
    });
    return (
      <div>
        <ul className="list_ad">
        {betons}
        </ul>
      </div>
      );
  }
});

var Cart = React.createClass({
  getInitialState: function() {
    return {listI: [], cartItem: [], anim: false};
  },

  componentWillMount: function () {
  $.ajax({
      url: "product.json",
      dataType: 'json',
      cache: false,
      success: function(data) {
        data.preventDefault;
        this.setState({cartItem: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("product.json", status, err.toString());
      }.bind(this)
    });
  },

  handleRemove: function(index) {
    var list = this.state.listI;
    if (list[index].it_total > 1) {
      cou = list[index].it_total--;
        count = list[index];
       this.setState({count: cou});
    } else
     var r_list = this.state.listI.splice(index, 1);
      this.setState({listI: this.state.listI}); 
  },

  handleClick: function(index) {
    var it_name = this.state.cartItem[index].name,
         it_price = this.state.cartItem[index].price,
         it_total = this.state.cartItem[index].total,
         list = this.state.listI,
         r;
    var anim_change = true;
    this.setState({anim: anim_change});

   var mm = list.some(function(item, i) {
      r = i;
    return item.it_name === it_name;
    }); 

    if (mm === false) {
        list = this.state.listI.concat([{it_name, it_price, it_total}]);
        this.setState({listI: list});
      } else {
       var total_ink = list[r].it_total++,
        total = list[r];
       this.setState({total: total_ink});
      };
  },

  handleAnim: function() {
    var anim_change = false;
    this.setState({anim: anim_change});
  },

  handleTotal: function() {
    var anim_change = true;
    this.setState({anim: anim_change});
  },

  render: function() {
    var setclass = this.state.anim ? "right-col1" : "right-col";
    return (
      <div className="col-md-12">
        <h2>Ordering</h2>
        <CartTotal handleTotal={this.handleTotal} listI={this.state.listI} />
        <div className="col-md-8 col-md-offset-2">
        <h4>Our products:</h4>
          <ul className="list">
          <CartsItem cartItem={this.state.cartItem} klick={this.handleClick} />
          </ul>
        </div>
        <div className={setclass + " col-md-2"}>
        <div className="close1" onClick={this.handleAnim}>X</div>
          <form className="form-horizontal">
          <Forma  listI={this.state.listI} handleRemove={this.handleRemove}/>
          <TotalP listI={this.state.listI}/>
          <div className="form-group">
            <label className="col-sm-12 control-label labl">Ваше имя</label>
            <div className="col-sm-12">
            <i className="inp_name"></i>
              <input type="text" className="form-control form_inp" id="inputPassword3" placeholder="Введите имя" />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-12 control-label labl">Ваш телефон</label>
            <div className="col-sm-12">
            <i className="inp_tel"></i>
              <input type="text" className="form-control form_inp" id="inputPassword3" placeholder="Введите телефон" />
            </div>
          </div>
          <div className="form-group">
            <label for="inputEmail3" className="col-sm-12 control-label labl">Ваш email</label>
            <div className="col-sm-12">
              <i className=""></i>
              <input type="email" className="form-control form_inp" id="inputEmail3" placeholder="Введите email" />
            </div>
          </div>
          <div className="form-group">
            <div className="bot_inp col-sm-12">
              <button type="submit" className="btn_form">Заказать</button>
            </div>
          </div>
          </form>
        </div>
        </div>
      );
  }
});
React.render(<Cart />, document.getElementById('example'));
