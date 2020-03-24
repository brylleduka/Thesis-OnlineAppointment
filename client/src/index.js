import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import ApolloProvider from "./ApolloProvider";
import "semantic-ui-css/semantic.min.css";
import "toasted-notes/src/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import "pretty-checkbox/dist/pretty-checkbox.css";
import "react-toastify/dist/ReactToastify.css";
import "./css/slick-theme.custom.css";
import "./css/slick.custom.css";

ReactDOM.render(ApolloProvider, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
