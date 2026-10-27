import TempusLogo from "./imports/Group9";

type LoadingScreenProps = {
  isExiting: boolean;
};

export default function LoadingScreen({ isExiting }: LoadingScreenProps) {
  return (
    <main
      className={`loading-screen${isExiting ? " loading-screen--exiting" : ""}`}
      aria-label="Carregando TEMPUS"
    >
      <section className="loading-screen__message" aria-label="Mensagem TEMPUS">
        <p className="loading-screen__phrase">
          <span>O tempo encontra o conforto.</span>
        </p>
      </section>
      <div className="loading-screen__brand" aria-label="TEMPUS">
        <TempusLogo />
      </div>
    </main>
  );
}
