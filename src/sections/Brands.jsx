const Brands = () => {
  const brands = [
    "NIKE",
    "ADIDAS",
    "FILA",
    "PUMA",
    "MIZUNO",
    "UNDER ARMOUR",
    "OLYMPIKUS",
    "TOPPER",
  ];

  return (
    <div className="brands">
      <div className="brands-inner">
        <div className="brands-label">Parceiros</div>
        <div className="brands-track">
          {[...brands, ...brands].map((b, i) => (
            <span className="brand-name" key={i}>
              {b}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;
