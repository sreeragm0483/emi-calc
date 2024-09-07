import App from "./app";
import PaymentRoute from "./emi/route/emi.route";

const app = new App([new PaymentRoute()]);

app.listen();

export default app.getApp();
