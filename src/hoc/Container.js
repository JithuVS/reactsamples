import CommonComponent from "./CommonComponent";
import WrapperComponent from "./WrapperComponent";

const Todo = WrapperComponent(
  CommonComponent,
  "https://jsonplaceholder.typicode.com/todos"
);
const Post = WrapperComponent(
  CommonComponent,
  "https://jsonplaceholder.typicode.com/todos"
);
const Albums = WrapperComponent(
  CommonComponent,
  "https://jsonplaceholder.typicode.com/albums"
);

function Container(props) {
  return (
    <>
      <h4>Hoc</h4>
      <div>
        <Todo name="Todo" />
        <Post name="Post" />
        <Albums name="Albums" />
      </div>
    </>
  );
}

export default Container;
