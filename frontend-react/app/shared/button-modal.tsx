import { Component, createRef, Fragment, type ReactNode } from "react";

export default class ModalButton extends Component<
  { label: string; children?: ReactNode; block?: boolean },
  {}
> {
  state = {
    ref: createRef<HTMLDialogElement>(),
    block: false,
  };

  componentDidMount(): void {
    const { block } = this.props;
    this.setState({
      block,
    });
  }

  toggle() {
    const { ref } = this.state;
    ref.current.showModal();
  }

  render() {
    const { ref, block } = this.state;
    const { label, children } = this.props;
    return (
      <Fragment>
        <div className="row text-end">
          <button
            className={`btn btn-primary m-2 ${block ? "btn-block" : ""}`}
            onClick={() => this.toggle()}
          >
            {label}
          </button>
        </div>
        <dialog className="modal" ref={ref}>
          <div className="modal-box max-w-fit">{children}</div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </Fragment>
    );
  }
}
