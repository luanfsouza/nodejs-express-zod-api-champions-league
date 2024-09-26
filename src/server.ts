import createApp from "./app";

const app = createApp();

app.listen(process.env.PORT, () => {
  console.log(`app rodando na porta: ${process.env.PORT}`);
});