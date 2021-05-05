function SideBar(props) {
  const click = (e) => {
    props.hideShow(e.currentTarget.id);
  };

  return (
    <div className="sidebar">
      <button id="dragdrop" onClick={click} className="buttons">
        Drag Drop
      </button>
      <button id="forms" onClick={click} className="buttons">
        Forms
      </button>
      <button id="redux" onClick={click} className="buttons">
        Redux
      </button>
      <button id="api" onClick={click} className="buttons">
        API
      </button>
      <button id="hoc" onClick={click} className="buttons">
        Hoc
      </button>
      <button id="navigation" onClick={click} className="buttons">
        Navigation
      </button>
      <button id="error" onClick={click} className="buttons">
        ErrorBoundary
      </button>
    </div>
  );
}

export default SideBar;
