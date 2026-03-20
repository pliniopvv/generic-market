import { Component, createRef, Fragment, type ReactNode } from "react";

export default class ModalButton extends Component<
  { label: string; children?: ReactNode },
  {}
> {
  state = {
    ref: createRef<HTMLDialogElement>(),
  };

  toggle() {
    const { ref } = this.state;
    ref.current.showModal();
  }

  render() {
    const { ref } = this.state;
    const { label, children } = this.props;
    return (
      <Fragment>
        <button className="btn btn-success m-2" onClick={() => this.toggle()}>
          {label}
        </button>
        <dialog className="modal" ref={ref}>
          <div className="modal-box">{children}</div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </Fragment>
    );
  }
}
