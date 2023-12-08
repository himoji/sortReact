import { useState } from "react";

import "./App.css";

let initialArray = [5, 1, 3, 6, 4, 2];

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function App() {
  const [boxArray, setBoxArray] = useState(initialArray);
  const [size, setSize] = useState(25);
  const [iterator, setIter] = useState(0);
  const [delay, setDelay] = useState(100);
  const [currentLastBox, setCLastB] = useState(0);
  const [currentMinBox, setCMinB] = useState(0);

  //let boxArray = [5, 1, 2, 3, 4];

  async function selectionSort(arr: number[], n: number) {
    var i: number, j: number, min_i: number;

    for (let i = 0; i < n; i++) {
      min_i = i;
      for (j = i + 1; j < n; j++) {
        if (arr[j] < arr[min_i]) {
          min_i = j;
        }
      }
      [arr[min_i], arr[i]] = [arr[i], arr[min_i]];
      setBoxArray(arr);
      setIter((iterator) => i);
      setCLastB(i);
      setCMinB(min_i);

      await sleep(delay);
    }
  }

  function verifySort(arr: number[], n: number) {
    for (let i = 0; i < n; i++) {
      if (arr[i] > arr[i + 1]) {
        return false;
      }
    }
    console.log("vrfied");
    return true;
  }

  function handleClickSort() {
    console.log("Cl");
    if (!verifySort(boxArray, boxArray.length))
      selectionSort(boxArray, boxArray.length);
  }

  function handleClickRandom() {
    console.log("Clrand");
    let randomArray: number[] = [];
    for (let i = 0; i < size; i++) {
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      randomArray.push(randomNumber);
    }
    setBoxArray(randomArray);
  }

  function handleChangeSize(e: any) {
    e.preventDefault();
    let iter = e.target.value;
    setSize(iter);
  }

  function handleChangeDelay(e: any) {
    e.preventDefault();
    let iter = e.target.value;
    setDelay(iter);
  }

  const Box = ({ value, bgColor }: { value: number; bgColor: string }) => {
    let nBoxArray = boxArray.length;
    return (
      <div
        style={{
          backgroundColor: bgColor,
          height: `${value}rem`,
          width: `${56 / nBoxArray}rem`,
        }}
      ></div>
    );
  };

  return (
    <>
      <div
        style={{
          width: "60rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            justifyItems: "center",
            flexFlow: "wrap",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <div
            style={{
              justifyContent: "center",
              display: "flex",
              flexWrap: "wrap-reverse",
              margin: "0 0 0 0",
            }}
          >
            {boxArray.map((value: number, i: any) => {
              switch (i) {
                case currentMinBox:
                  return (
                    <>
                      <Box value={value} bgColor={"#e9c46a"} />
                    </>
                  );
                case currentLastBox:
                  return (
                    <>
                      <Box value={value} bgColor={"#2a9d8f"} />
                    </>
                  );
                default:
                  return (
                    <>
                      <Box value={value} bgColor={"#52796f"} />
                    </>
                  );
              }
            })}
          </div>
          <div>
            <button
              type="button"
              onClick={handleClickSort}
              style={{
                width: "10rem",
                backgroundColor: "#52796f",
                border: "1rem solid #52796f",

                fontSize: "3rem",
                alignSelf: "center",
                marginTop: "1rem",
                marginRight: "1rem",
              }}
            >
              Sort
            </button>
            <button
              type="button"
              onClick={handleClickRandom}
              style={{
                width: "15rem",
                backgroundColor: "#52796f",
                border: "1rem solid #52796f",

                fontSize: "3rem",
                alignSelf: "center",
                marginTop: "1rem",
              }}
            >
              Random
            </button>
          </div>
          <h1>Size:</h1>
          <input
            id="sizeRange"
            type="range"
            onChange={(e) => handleChangeSize(e)}
            style={{
              width: `28rem`,
              backgroundColor: "#52796f",
              border: "1rem solid #52796f",

              fontSize: "3rem",
              alignSelf: "center",
              marginTop: "1rem",
            }}
            min={2}
            max={100}
          />
          <input
            type="input"
            placeholder="Delay in ms (default: 100)"
            onChange={(e) => handleChangeDelay(e)}
            style={{
              width: `28rem`,
              backgroundColor: "#52796f",
              border: "1rem solid #52796f",

              fontSize: "3rem",
              alignSelf: "center",
              marginTop: "1rem",
            }}
          />
          <h1>{`Iteration: ${iterator}`}</h1>
        </div>
      </div>
    </>
  );
}
