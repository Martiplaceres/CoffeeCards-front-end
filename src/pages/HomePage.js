export default function HomePage() {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: 200,
      }}
    >
      <h1>
        <span className="welcome"> Welcome to</span>{" "}
        <span className="coffeeCard"> CoffeeCard! </span>
      </h1>
      <h3>Replace stamp cards by a simple step: scanning a QR code!</h3>
    </div>
  );
}
