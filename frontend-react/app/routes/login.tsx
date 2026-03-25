import { Component } from "react";
import { toast } from "react-toastify";
import AuthService from "~/service/AuthService";
import withNavigate from "~/shared/withNavigate";

class AdminRoute extends Component<{ navigate: any }> {
  state = {
    user: {
      username: "",
      password: "",
    },
  };

  setValue(cmp) {
    this.setState({ user: Object.assign(this.state.user, cmp) });
  }

  async logar() {
    const { user } = this.state;
    const { navigate } = this.props;
    const service = new AuthService();
    const result = await toast.promise(
      service.login(user.username, user.password),
      {
        pending: "Logando ...",
        error: "Login não autorizado.",
        success: "Logado com sucesso!",
      },
    );
    if (result) {
      const { data } = result;
      localStorage.setItem("access_token", data.access_token);
      navigate("/admin");
    }
  }

  render() {
    return (
      <div className="flex justify-center items-center mt-5">
        <div className="card card-dash bg-base-100 w-96">
          <div className="card-body">
            <h2 className="card-title">Login</h2>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Username</legend>
              <input
                type="text"
                className="input"
                placeholder="e-mail"
                onChange={(e) => this.setValue({ username: e.target.value })}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                placeholder="Password"
                onChange={(e) => this.setValue({ password: e.target.value })}
              />
            </fieldset>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={() => this.logar()}>
                Logar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withNavigate(AdminRoute);
