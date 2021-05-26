import { Header } from './Components'
import { Cart, Home } from './pages'
import { Route } from 'react-router-dom'

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Route path="/" component={Home} exact/>
         <Route path="/cart" component={Cart} exact/>
      </div>
    </div>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     items: state.pizzas.items
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setPizzas: (items) => dispatch(setPizzas(items))
//   };
// }

export default App;
