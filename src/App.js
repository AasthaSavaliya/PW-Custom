import {useEffect, useState} from 'react'
import logo from "./assets/Black-Font.png";
import copy from "./assets/clippy.svg";
import "./App.css";


function App() {
  let initialFormData = {
    goldPrice: 65,
    goldWeight: "",
    roundWeight: "",
    roundPrice: 250,
    baguetteWeight: "",
    roundTotal: 0,
    baguettePrice: 400,
    goldTotal: 0,
    baguetteTotal: 0,
    miscTotal: 0,
    miscPrice: 0,
    miscWeight: "",
    totalWithoutRound: 0,
  };

  const [formData, setFormData] = useState(initialFormData);

  function handleChange(fieldName, e) {
    setFormData((prevState) => {
      let updatedValues = {
        ...prevState,
        [fieldName]:
          e.target.value[0] === "0"
            ? e.target.value.substring(1)
            : e.target.value,
      };

      updatedValues["goldTotal"] = isNaN(
        parseFloat(updatedValues["goldWeight"])
      )
        ? updatedValues["goldPrice"] * 0
        : updatedValues["goldPrice"] * parseFloat(updatedValues["goldWeight"]);

      updatedValues["baguetteTotal"] = isNaN(
        parseFloat(updatedValues["baguetteWeight"])
      )
        ? updatedValues["baguettePrice"] * 0
        : updatedValues["baguettePrice"] *
          parseFloat(updatedValues["baguetteWeight"]);

      updatedValues["miscTotal"] = isNaN(
        parseFloat(updatedValues["miscWeight"])
      )
        ? updatedValues["miscPrice"] * 0
        : updatedValues["miscPrice"] * parseFloat(updatedValues["miscWeight"]);

      updatedValues["roundTotal"] = isNaN(
        parseFloat(updatedValues["roundWeight"])
      )
        ? updatedValues["roundPrice"] * 0
        : updatedValues["roundPrice"] *
          parseFloat(updatedValues["roundWeight"]);

      updatedValues["totalWithoutRound"] =
        updatedValues["goldTotal"] +
        updatedValues["baguetteTotal"] +
        updatedValues["miscTotal"];

      if (e.target.value.length === 0) {
        updatedValues[fieldName] = 0;
      }
      return updatedValues;
    });
  }

  function clipBoadHandler(e) {
    e.preventDefault();
    let textToCopy = "";
    [250, 275, 325, 400, 450].map((value) => {
      textToCopy += `\n$${value} / Ct = ${parseFloat(
        Math.ceil(
            ((formData["totalWithoutRound"] + formData["roundWeight"] * value) *
            1.28)/10
        )*10
      )}`;
    });

    navigator.clipboard.writeText(textToCopy);
  }

  // function clipBoadHandler2(e) {
  //   e.preventDefault();
  //   let textToCopy = "";
  //   [{name:'TTLB',value:250}, {name:'SI',value:275}, {name:'SI/ VS', value:325}, {name:'VS',value:400}, {name:'VS/ VVS', value:450}].map((value) => {
  //     textToCopy += `\n${value.name} = $${parseFloat(
  //       Math.ceil(
  //           ((formData["totalWithoutRound"] + formData["roundWeight"] * `${value.value}`) *
  //           1.28)/10
  //       )*10
  //     )}`;
  //   });
  //
  //   navigator.clipboard.writeText(textToCopy);
  // }

  function clipBoadHandler(e) {
  e.preventDefault();
  let textToCopy = "";
  [250, 275, 325, 400, 450].map((value) => {
    textToCopy += `\n$${value} / Ct = ${parseFloat(
      Math.ceil(
        ((formData["totalWithoutRound"] + formData["roundWeight"] * value) * 1.28) / 10
      ) * 10
    )}`;
  });

  textToCopy += "\n\nIncluding 15% Tariff.";

  navigator.clipboard.writeText(textToCopy);
}

  function resetForm() {
    const resetData = {
      goldWeight: "",
      roundWeight: "",
      baguetteWeight: "",
      miscWeight: "",
      goldTotal: 0,
      baguetteTotal: 0,
      miscTotal: 0,
      miscPrice: 0,
      roundTotal: 0,
      roundPrice: 250,
      totalWithoutRound: 0,
    };

    setFormData((prevState) => {
      return { ...prevState, ...resetData };
    });
  }

  useEffect(() => {
   document.title = "PW Custom"
}, []);

  return (
    <>
      <div className="py-4 branding">
        <img
          src={logo}
          alt="Prime Wholesale logo"
          width="170px"
          className="img-responsive center-block d-block mx-auto"
        />
      </div>

      <section className="h-100 p-md-5 p-3">
        <form id={"main-form"}>
          {/* Heading */}
          <h3 className="text-center py-2" style={{ fontFamily: "serif" }}>
            Custom Jewelry Pricing
          </h3>

          {/* GOLD CONTAINER */}
          <div className="gold-containers">
            <div className="d-flex align-items-center mb-3">
              <h4 className="me-2 m-0">Gold</h4>
              <input
                name="gold"
                onChange={handleChange.bind(this, "goldWeight")}
                type="number"
                className="form-control text-center"
                style={{ borderBottom: "1px solid black", borderRadius: 0 }}
                aria-label="Grams"
                value={formData["goldWeight"]}
              />
              <span>Gr.</span>
            </div>

            <div className="input-group mb-3 pe-5">
              <label>$&nbsp;</label>
              {/*<input*/}
              {/*  name="goldPrice"*/}
              {/*  onChange={handleChange.bind(this, "goldPrice")}*/}
              {/*  type="number"*/}
              {/*  className="form-control text-center"*/}
              {/*  aria-label="Rate"*/}
              {/*  value={formData["goldPrice"]}*/}
              {/*/>*/}

              <select
                  onChange={handleChange.bind(this, "goldPrice")}
                  name="goldPrices"
                >
                  <option value={65}>10K : 65</option>
                  <option value={87}>14K : 87</option>
                  <option value={108}>18K : 108</option>
                  <option value={8}>925 : 8</option>
                </select>
              <label className={"mx-3"}>=</label>
              <label>{formData["goldTotal"].toFixed(2)}</label>
            </div>
          </div>
          {/* GOLD CONTAINER END*/}

          <hr />

          {/* ROUND DIAMOND CONTAINER */}
          <div className="round-diam-container">
            <div className="d-flex align-items-center mb-3">
              <h4 className="me-2 m-0">Round Diamonds</h4>
              <input
                type="number"
                onChange={handleChange.bind(this, "roundWeight")}
                className="form-control text-center"
                aria-label="Grams"
                value={formData["roundWeight"]}
                style={{ borderBottom: "1px solid black", borderRadius: 0 }}
              />
              <span>Ctw.</span>
            </div>
            <div className="input-group mb-3 pe-5">
              <form>
                <select
                  onChange={handleChange.bind(this, "roundPrice")}
                  name="roundPrices"
                >
                  <option value={250}>250</option>
                  <option value={275}>275</option>
                  <option value={325}>325</option>
                  <option value={400}>400</option>
                  <option value={450}>450</option>
                </select>
              </form>
              <label className={"mx-3"}>=</label>

              <label>{formData["roundTotal"].toFixed(2)}</label>
            </div>
          </div>
          {/* ROUND DIAMOND CONTAINER END */}

          <hr />

          {/* BAGUETTE DIAMOND CONTAINER*/}

          <div className="baguette-diam-container">
            <div className="d-flex align-items-center mb-3">
              <h4 className="me-2 m-0">Baguette Diamonds</h4>
              <input
                type="number"
                onChange={handleChange.bind(this, "baguetteWeight")}
                className="form-control text-center"
                value={formData["baguetteWeight"]}
                aria-label="Carat weight"
                style={{ borderBottom: "1px solid black", borderRadius: 0 }}
              />
              <span>Ctw.</span>
            </div>
            <div className="input-group mb-3 pe-5">
              <label>$</label>
              <input
                type="number"
                value={formData["baguettePrice"]}
                className="form-control text-center"
                aria-label="Rate"
                onChange={handleChange.bind(this, "baguettePrice")}
              />

              <label className={"me-3"}>=</label>
              <label>{formData["baguetteTotal"].toFixed(2)}</label>
            </div>
          </div>
          {/*BAGUETTE DIAMOND CONTAINER END*/}

          <hr />

          {/*MISCELLANEOUS DIAMOND CONTAINER*/}
          <div className="misc-diam-container">
            <div className="d-flex align-items-center mb-3">
              <h4 className="me-2 m-0">Misc. Diamonds</h4>
              <input
                type="number"
                onChange={handleChange.bind(this, "miscWeight")}
                className="form-control text-center"
                value={formData["miscWeight"]}
                aria-label="Grams"
                style={{ borderBottom: "1px solid black", borderRadius: 0 }}
              />
              <span>Ctw.</span>
            </div>

            <div className="input-group mb-3 pe-5">
              <label>$</label>
              <input
                type="number"
                onChange={handleChange.bind(this, "miscPrice")}
                className="form-control text-center"
                aria-label="Rate"
                value={formData["miscPrice"]}
                style={{ borderBottom: "1px solid grey", borderRadius: 0 }}
              />

              <label className={"me-3"}>=</label>
              <label>{formData["miscTotal"].toFixed(2)}</label>
            </div>
          </div>
          {/*MISCELLANEOUS DIAMOND CONTAINER END*/}

          <hr />

          {/*TOTAL CONTAINER*/}
          <div className="total-container">
            <form className="row">
              <div className="col-12">
                <div className="d-flex justify-content-between">
                  <h3 className="text-primary">Grand Total</h3>
                  {/*<button onClick={clipBoadHandler} className="btn copy">*/}
                  {/*<img src={copy} alt="Copy to clipboard"/>*/}
                  <h3 onClick={resetForm}>Clear</h3>
                  {/*</button>*/}
                </div>
                <div className="p-2 row position-relative" style={{ border: "1px solid grey" }}>
                  <div className="col">
                    {[250, 275, 325, 400, 450].map((value) => {
                      return (
                        <div className="input-group" key={value}>
                          <span className="fs-5">${value} / ct = </span>
                          <span className={"fs-5 ms-2"}>
                            {isNaN(parseFloat(formData["roundWeight"]))
                              ? Math.ceil(
                                  ((formData["totalWithoutRound"] + 0 * value) *
                                    1.28) /
                                    10
                                ) * 10
                              : Math.ceil(
                                  ((formData["totalWithoutRound"] +
                                    value * formData["roundWeight"]) *
                                    1.28) /
                                    10
                                ) * 10}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="col-12 mt-2">
                    <p className="text-muted" style={{ fontSize: '16px', width: '100%' }}>
                      Including 15% Tariff.
                    </p>
                  </div>

                  <div className="position-absolute end-0 ps-0 w-auto">
                    <button onClick={clipBoadHandler} className="btn copy">
                      <img src={copy} alt="Copy to clipboard" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          {/*TOTAL CONTAINER END*/}


          {/*/!*TOTAL CONTAINER 2*!/*/}
          {/*<div className="total-container mt-4">*/}
          {/*  <form className="row">*/}
          {/*    <div className="col-12">*/}

          {/*      <div className="p-2 row" style={{ border: "1px solid grey" }}>*/}
          {/*        <div className="col">*/}
          {/*          {[{name:'TTLB',value:250}, {name:'SI',value:275}, {name:'SI/ VS', value:325}, {name:'VS',value:400}, {name:'VS/ VVS', value:450}].map((value) => {*/}
          {/*            return (*/}
          {/*              <div className="input-group" key={value.name}>*/}
          {/*                <span className="fs-5">{value.name} = </span>*/}
          {/*                /!*<span className="fs-5">Si/ Vs = </span>*!/*/}
          {/*                /!*<span className="fs-5">Vs = </span>*!/*/}
          {/*                /!*<span className="fs-5">Vs/ Vvs = </span>*!/*/}
          {/*                <span className={"fs-5 ms-2"}>$*/}
          {/*                  {isNaN(parseFloat(formData["roundWeight"]))*/}
          {/*                    ? Math.ceil(*/}
          {/*                        ((formData["totalWithoutRound"] + 0 * value.value) **/}
          {/*                          1.28) /*/}
          {/*                          10*/}
          {/*                      ) * 10*/}
          {/*                    : Math.ceil(*/}
          {/*                        ((formData["totalWithoutRound"] +*/}
          {/*                          value.value * formData["roundWeight"]) **/}
          {/*                          1.28) /*/}
          {/*                          10*/}
          {/*                      ) * 10}*/}
          {/*                </span>*/}
          {/*              </div>*/}
          {/*            );*/}
          {/*          })}*/}
          {/*        </div>*/}

          {/*        <div className="col-1 d-flex justify-content-end align-items-start">*/}
          {/*          <button onClick={clipBoadHandler2} className="btn copy">*/}
          {/*            <img src={copy} alt="Copy to clipboard" />*/}
          {/*          </button>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </form>*/}
          {/*</div>*/}
          {/*/!*TOTAL CONTAINER 2 END*!/*/}

        </form>
      </section>
    </>
  );
}

export default App;