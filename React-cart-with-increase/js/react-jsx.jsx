
var CartsItem = React.createClass({
  render: function () {
    var klick = this.props.klick,
        cartItem = this.props.cartItem
    return (
      <div>
      {cartItem.map(function (argument, index) {
        var _clas = index % 2 == 0 ? "active" : "n_active";
        return (
          <li className={_clas} key={index+1}>{cartItem[index].name} <span className="price">{cartItem[index].price} P.</span> <div key={index} onClick={klick.bind(null, index)} className="btn_add"></div></li>
          );
      })}
      </div>
      );
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
      <div className="col-sm-10 total">{this.rows()+" P."}</div>
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
      return <li className={clas} key={index}><input type="hidden" value={item.it_name + " X " + item.it_total + " : " + item.it_price*item.it_total + "P"} />{item.it_name} х {item.it_total} <span className="price">{item.it_price*item.it_total} P.</span> <div key={index} onClick={remove.bind(null, index)} className="remove"></div></li>;
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
    return {listI: [], cartItem: []};
  },
  
  componentWillMount: function () {
  $.ajax({
      url: "./products/product.json",
      dataType: 'json',
      cache: false,
      success: function(data) {
        data.preventDefault;
        this.setState({cartItem: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("./products/product.json", status, err.toString());
      }.bind(this)
    });
  },

  handleRemove: function(index) {
     var list = this.state.listI;
    if (list[index].it_total > 1) {
      cou = list[index].it_total--;
        elem = list[index];
       this.setState({elem: cou});
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
      console.log(this.state.listI);
  },

  render: function() {
    return (
      <div className="col-md-6 col-xs-6 col-sm-6">
        <h2>Оформление заказa</h2>
        <div className="col-md-6">
        <h4>Список товаров:</h4>
          <ul className="list">
          <CartsItem cartItem={this.state.cartItem} klick={this.handleClick} />
          </ul>
        </div>
        <div className="col-md-6 col-xs-6 col-sm-6 right-col">
          <form className="form-horizontal">
          <Forma listI={this.state.listI} handleRemove={this.handleRemove}/>
          <TotalP listI={this.state.listI}/>
          <div className="form-group">
            <label className="col-sm-12 control-label labl">Ваше имя</label>
            <div className="col-sm-10">
            <i className="inp_name"></i>
              <input type="text" className="form-control form_inp" id="inputPassword3" placeholder="Введите имя" />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-12 control-label labl">Ваш телефон</label>
            <div className="col-sm-10">
            <i className="inp_tel"></i>
              <input type="text" className="form-control form_inp" id="inputPassword3" placeholder="Введите телефон" />
            </div>
          </div>
          <div className="form-group">
            <div className="bot_inp col-sm-10">
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