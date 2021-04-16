import { App } from "./app";

async function bootstrap() {
  try {
    const app = new App();
    const port = Number(process.env.PORT) || 3000;

    await app.listen(port);

    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("fail to start server");
  }
}

bootstrap();
