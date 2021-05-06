import axios from "axios";
export const addRepos = (repos) => ({
  type: "ADD_REPOS",
  repos,
});

export const clearRepos = () => ({ type: "CLEAR_REPOS" });

export const getRepos = (username) => (dispatch) => {
  const url = `https://api.github.com/users/${username}/repos?sort=updated`;
  axios
    .get(url)
    .then((response) => {
      dispatch(addRepos(response.data));
    })
    .catch((error) => {
      dispatch(clearRepos());
    });
};
