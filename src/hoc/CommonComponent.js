const CommonComponent = (props) => {
  return (
    <fieldset className="thirty">
      <legend>{props.name}</legend>
      <div>{props.children}</div>
    </fieldset>
  );
};

export default CommonComponent;
