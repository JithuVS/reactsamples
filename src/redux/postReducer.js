const posts = [
  { id: "1", title: "Book", message: "Knowledge, Peace of Mind" },
  { id: "2", title: "Travel", message: "Meditation, Peace of Mind" },
];

const postReducer = (state = posts, action) => {
  switch (action.type) {
    case "ADD_POST":
      return [...state, action.data];
    case "DELETE_POST":
      return state.filter((post) => {
        return post.id !== action.id;
      });
    case "UPDATE":
      const index = state.findIndex((data) => data.id === action.data.id),
        newArray = [...state];
      newArray[index] = action.data;
      return newArray;
    default:
      return state;
  }
};
export default postReducer;
